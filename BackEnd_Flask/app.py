from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import json
from validate_email import validate_email
from helpers import zipTableAttrs, getMidpointsAndunWantedCats, getItemsOfShipments, matchPicsOfItems
from utilities import cursor, db
from datetime import datetime, timedelta
import jwt
import logging
import collections
import os

# logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)  # flask app
CORS(app)  # allow cors
app.config['SECRET_KEY'] = 'j@48#56882djjjewija8293ncwoiedmi4wa0'


""" Authentication: Login/SignUp"""


@app.route('/validateUser', methods=['POST', 'GET'])
def validateUser():
    """
        Validating the existance of a user in the database.
    """
    data = json.loads(request.data)
    usernameOrEmail = data['usernameOrEmail'].strip()
    password = data['password']
    if validate_email(usernameOrEmail):
        condition = 'Email'
    else:
        condition = 'Username'
    cursor.execute(f"select * from User where {condition}='{usernameOrEmail}'")
    fetched_data = cursor.fetchall()
    if not len(fetched_data) == 0:
        fetched_zipped_data = zipTableAttrs('user', fetched_data)[0]
        if usernameOrEmail == fetched_zipped_data[condition] and password == fetched_zipped_data['Password']:
            token = jwt.encode({'user': usernameOrEmail, 'exp': datetime.utcnow(
            ) + timedelta(minutes=30)}, app.config['SECRET_KEY'])
            return jsonify({'exists': True,  'token': token.decode('utf-8'), 'username': fetched_zipped_data['Username']})
    return jsonify({'exists': False, 'username': ''})


@app.route('/registerUser', methods=['POST'])
def registerUser():
    """
        Registering a user, inserting it the User table if it is not in use and valid.
    """
    data = json.loads(request.data)
    name = data['name'].strip()
    username = data['username'].strip()
    email = data['email'].strip()
    password = data['password']
    country = data['country']['label']
    phoneNum = data['phone']
    birthday = data['birthday'].split('T')[0]

    # check if the email is available
    emailAvailable = False
    emailValid = False
    cursor.execute(f'select * from User where Email="{email}"')
    if len(cursor.fetchall()) == 0:
        emailAvailable = True
    if validate_email(email):
        emailValid = True
    # check if username is available
    usernameAvailable = False
    cursor.execute(f'select * from User where Username="{username}"')
    if len(cursor.fetchall()) == 0:
        usernameAvailable = True

    # assign a deafult picture

    if emailAvailable and usernameAvailable and emailValid:
        cursor.execute(
            f"insert User(Name, Username, Email, Password, Country, PhoneNumber, Birthday) values('{name}', '{username}', '{email}', '{password}','{country}', '{phoneNum}', '{birthday}')")
        return jsonify({'registered': True, 'emailValid': True, 'emailAvailable': True, 'usernameAvailable': True})

    else:
        return jsonify({'registered': False, 'emailValid': emailValid,  'emailAvailable': emailAvailable, 'usernameAvailable': usernameAvailable})


@app.route('/validateToken', methods=['POST'])
def validateToken():
    """
        Validating a user's token 
    """
    data = json.loads(request.data)
    token = data['token']
    if not token:
        return jsonify({'valid': False})
    try:
        jwt.decode(token, app.config['SECRET_KEY'])
        return jsonify({'valid': True})
    except:
        return jsonify({'valid': False})


""" Profile """
@app.route('/getUserInfo/<username>', methods=['GET'])
def getUserInfo(username):
    """
        - A dynamic url containing id of a user that is passed to the function.
        - A query will get the user info with that Id. 
        - Reviews are queryed with the profile's id
    """
    cursor.execute(f"select * from User where Username='{username}'")
    res = cursor.fetchall()
    if len(res) == 0:
        return jsonify('NOT FOUND')
    info = zipTableAttrs('user', res)[0]

    # trips
    cursor.execute(f"select * from Trip where Username='{username}'")
    trips = cursor.fetchall()
    midpoints, unWantedCategories = getMidpointsAndunWantedCats(trips, cursor)

    # shipments
    cursor.execute(f"select * from Shipment where Username='{username}'")
    shipments = cursor.fetchall()
    items_final = getItemsOfShipments(shipments, cursor)
    pics = matchPicsOfItems(shipments)

    # reviews
    cursor.execute(f"select * from Review where revieweeUsername='{username}'")
    reviews = zipTableAttrs('review', cursor.fetchall())
    # user's rating
    ratings = map(lambda rev: rev['NumOfStars'], reviews)
    freq = collections.Counter(ratings)
    summation = sum(int(k)*v for k, v in freq.items())
    allrates = sum([i[1] for i in freq.items() if int(i[0]) != 0])
    if allrates > 0:
        userRating = int(round(summation / allrates))
    else:
        userRating = 0

    # requests
    cursor.execute(
        f"select * from Request where senderUsername='{info['Username']}' or receiverUsername='{info['Username']}'")
    requests = zipTableAttrs('request', cursor.fetchall())

    # req_trip_ship  => {req: {ship:'', trip:''}}
    req_shipTrip = {}
    items = []  # of a shipment
    for req in requests:
        tripId = req['TripID']
        shipmentId = req['ShipmentID']
        cursor.execute(f"select * from Shipment where ID='{shipmentId}'")
        # shipment related to the request
        shipment = zipTableAttrs('shipment', cursor.fetchall())
        cursor.execute(f"select * from Trip where Id='{tripId}'")
        # trip related to the request
        trip = zipTableAttrs('trip', cursor.fetchall())
        # midpoints
        cursor.execute(
            f"select (District) from trip as t, Midpoint as m where t.Id = m.TripID and t.Id='{tripId}'")
        midpoint_districts = [i[0] for i in cursor.fetchall()]
        # unwanted categories
        cursor.execute(
            f"select (Category) from trip as t, UnwantedCategory as u where t.Id = u.tripID and t.Id ='{tripId}'")
        unwanted_categories = [i[0] for i in cursor.fetchall()]
        # Items
        cursor.execute(
            f"select * from Item  where shipmentID = '{shipmentId}'")
        items = zipTableAttrs('item', cursor.fetchall())
        req_shipTrip[req['Id']] = {'shipment': shipment[0], 'trip': trip[0],
                                   'unwantedCategories': unwanted_categories,
                                   'midpoints': midpoint_districts, 'items': items}

    info['userRating'] = userRating
    info_reviews = {'info': info, 'reviews': reviews, 'trips': zipTableAttrs('trip', trips),
                    'shipments': zipTableAttrs('shipment', shipments), 'midpoints': midpoints,
                    'unWantedCategories': unWantedCategories, 'items': items,
                    'requests': requests, 'reqShipTrip': req_shipTrip, 'items': items_final, 'itemsPics': pics}

    return jsonify(info_reviews)


@app.route('/getProfilePic/<username>', methods=['GET'])
def getProfilePic(username):
    filePath = os.path.join(
        os.getcwd(), f'static/Img/profilePics/{username}.png')
    if os.path.isfile(filePath):
        return send_file(filePath, mimetype='image/gif')
    else:
        defaultPath = os.path.join(
            os.getcwd(), 'static/Img/profilePics/defaultProfilePic.png')
        return send_file(defaultPath, mimetype='image/gif')


@app.route('/uploadProfilePic/<username>', methods=['POST'])
def uploadProfilePic(username):
    image = request.files['image']
    saveTo = os.path.join(
        os.getcwd(), 'static/Img/profilePics', f'{username}.png')
    image.save(saveTo)
    return "SUCCESS"


@app.route('/acceptRequest', methods=['POST'])
def acceptRequest():
    data = json.loads(request.data)
    reqId = data['reqId']
    status = data['status']
    cursor.execute(
        f"UPDATE Request SET status = '{status}' WHERE ID = '{reqId}';")
    return 'SUCCESS'


@app.route('/declineRequest', methods=['POST'])
def declineRequest():
    data = json.loads(request.data)
    reqId = data['reqId']
    status = data['status']
    cursor.execute(
        f"UPDATE Request SET status = status + '{status}' WHERE ID = '{reqId}';")
    return 'SUCCESS'


@app.route('/cancelRequest', methods=['POST'])
def cancelRequest():
    data = json.loads(request.data)
    reqId = data['reqId']
    cursor.execute(f"Delete From Request WHERE ID = '{reqId}';")
    return 'SUCCESS'


@app.route('/cancelRequestAccept', methods=['POST'])
def cancelRequestAccept():
    data = json.loads(request.data)
    reqId = data['reqId']
    cursor.execute(f"UPDATE Request SET status = '{0}' WHERE ID = '{reqId}';")
    return 'SUCCESS'


@app.route('/otherPersonsInfo', methods=['POST'])
def otherPersonsInfo():
    data = json.loads(request.data)
    username = data['username']
    cursor.execute(f"select * from User where Username='{username}'")
    info = zipTableAttrs('user', cursor.fetchall())[0]
    return jsonify({'Email': info['Email'], 'PhoneNumber': info['PhoneNumber']})


@app.route('/completedDeals', methods=['POST'])
def completedDeals():
    data = json.loads(request.data)
    periodIsOver = data['periodIsOver']
    if periodIsOver:
        reqId = data['reqId']
        status = data['status']
        cursor.execute(
            f"UPDATE Request SET status = '{status}' WHERE ID = '{reqId}'")
    return 'SUCCESS'


@app.route('/addReview', methods=['POST'])
def addReview():
    data = json.loads(request.data)
    reqId = data['reqId']
    who = data['who']
    cursor.execute(
        f"insert into Review(tripID, ShipmentID, reviewerUsername, revieweeUsername, NumOfStars, Text) values('{data['TripID']}', '{data['ShipmentID']}', '{data['reviewerUsername']}', '{data['revieweeUsername']}', '{data['NumOfStars']}', '{data['Text']}')")

    cursor.execute(
        f"UPDATE Request SET {who} = '{cursor.lastrowid}' WHERE ID = '{reqId}'")
    return 'SUCCESS'


""" Search """


@app.route('/suggestedResults/<username>', methods=['GET'])
def suggestedResults(username):
    ### Trips ####
    cursor.execute(f"""
                    select FromLocation 
                    from trip as t, User as u 
                    where t.Username='{username}' and u.Username='{username}' 
                    UNION 
                    select ToLocation 
                    from trip as t, User as u 
                    where t.Username='{username}' and u.Username='{username}' 
                    UNION 
                    select FromLocation 
                    from trip as t, User as u 
                    where u.Username='{username}' and FromLocation=u.Country 
                    UNION 
                    select ToLocation 
                    from trip as t, User as u 
                    where u.Username='{username}' and ToLocation=u.Country
                    """)
    # countries the user is interested in
    countries = [x[0] for x in cursor.fetchall()]
    trips = []
    for country in countries:
        cursor.execute(f""" 
                        select * 
                        from trip 
                        where Username != '{username}' and (ToLocation = '{country}' or FromLocation = '{country}')
                        """)
        trips.extend(cursor.fetchall())

    trips = [t for t in {k[0]: k for k in trips}.values()]  # unique trips

    midpoints, unWantedCategories = getMidpointsAndunWantedCats(trips, cursor)

    ### Shipments ####
    cursor.execute(f"""
                    select FromLocation 
                    from shipment as t, User as u 
                    where t.Username='{username}' and u.Username='{username}' 
                    UNION 
                    select ToLocation 
                    from shipment as t, User as u 
                    where t.Username='{username}' and u.Username='{username}' 
                    UNION 
                    select FromLocation 
                    from shipment as t, User as u 
                    where u.Username='{username}' and FromLocation=u.Country 
                    UNION 
                    select ToLocation 
                    from shipment as t, User as u 
                    where u.Username='{username}' and ToLocation=u.Country
                    """)
    # countries the user is interested in
    countries = [x[0] for x in cursor.fetchall()]
    shipments = []
    for country in countries:
        cursor.execute(f""" 
                        select * 
                        from shipment 
                        where Username != '{username}' and (ToLocation = '{country}' or FromLocation = '{country}')
                        """)
        shipments.extend(cursor.fetchall())
    # unique shipments
    shipments = [t for t in {k[0]: k for k in shipments}.values()]
    # items
    items = getItemsOfShipments(shipments, cursor)
    # Pics
    pics = matchPicsOfItems(shipments)

    return jsonify({'trips': zipTableAttrs('trip', trips), 'midpoints': midpoints,
                    'unWantedCategories': unWantedCategories, 'shipments': zipTableAttrs('shipment', shipments),
                    'items': items, "itemPics": pics})


@app.route('/handleSearch', methods=['POST'])
def handleSearch():
    searchFilters = json.loads(request.data)
    username = searchFilters['username']
    cursor.execute(f"select * from Shipment where Username != '{username}' and \
    FromLocation = '{searchFilters['from']['label']}' \
    and ToLocation = '{searchFilters['to']['label']}'\
    and RequestedDeliveryDate <= '{searchFilters['date'].split('T')[0]}'")
    shipments = cursor.fetchall()
    # items
    items = getItemsOfShipments(shipments, cursor)
    pics = matchPicsOfItems(shipments)
    # trips
    cursor.execute(f"select * from Trip where  Username != '{username}' and  FromLocation = '{searchFilters['from']['label']}' \
    and ToLocation = '{searchFilters['to']['label']}' \
    and Date <= '{searchFilters['date'].split('T')[0]}' ")
    trips = cursor.fetchall()
    midpoints, unWantedCategories = getMidpointsAndunWantedCats(trips, cursor)

    return jsonify({'trips': zipTableAttrs('trip', trips), 'shipments': zipTableAttrs('shipment', shipments),
                    'midpoints': midpoints, 'unWantedCategories': unWantedCategories, 'items': items, "itemPics": pics})


""" Registering Requests """
@app.route('/registerRequest', methods=['POST'])
def registerRequest():
    data = json.loads(request.data)
    trip = data['trip']
    shipment = data['shipment']
    if data['sender'] == 'shipment':
        cursor.execute(
            f"insert into Request(TripID, ShipmentID, senderUsername, receiverUsername, status) values ('{trip['Id']}', '{shipment['Id']}', '{shipment['username']}', '{trip['Username']}', '{0}')")
    else:
        cursor.execute(
            f"insert into Request(TripID, ShipmentID, senderUsername, receiverUsername, status) values ('{trip['Id']}', '{shipment['Id']}', '{trip['username']}', '{shipment['Username']}', '{0}')")

    return jsonify({'registered': True})


""" UPDATE USER INFO IN ABOUT ME"""
@app.route("/updateUserInfo", methods=["POST", "GET"])  # for now just leave both
def updateUserInfo():
    updatedInfo = json.loads(request.data)
    cursor.execute(f"UPDATE User set Name='{updatedInfo['name']}', Email='{updatedInfo['email']}', Country='{updatedInfo['location']}' where Username='{updatedInfo['username']}'")
    return {"UpdateStatus": True}


""" ADDING SHIPMENT AND TRIP """
@app.route('/addTrip', methods=["POST", "GET"])
def addTrip():
    trip = json.loads(request.data)
    cursor.execute(
        f"insert Trip(Username, FromLocation, ToLocation, Date, Time, AvailableWeight, Description) values('{trip['username']}', '{trip['from']['label']}', '{trip['to']['label']}','{trip['date'].split('T')[0]}', '{trip['time'].split('T')[1][:-5]}', '{trip['AvWeight']}', '{trip['description']}')")
    id = cursor.lastrowid
    for unwantedcat in trip["cats"]:
        cursor.execute(
            f"insert unwantedcategory(tripID, Category) values('{id}','{unwantedcat}')")
    for point in trip["midPoints"]:
        cursor.execute(
            f"insert midpoint(District, TripID) values('{point['label']}','{id}')")

    return jsonify({'created': True, 'Id': cursor.lastrowid})


@app.route('/addShipment', methods=["POST", "GET"])
def addShipment():
    shipment = json.loads(request.data)
    cursor.execute(
        f"insert shipment(Username, FromLocation, ToLocation, RequestedDeliveryDate, Title, Description_, OfferedReward) values('{shipment['username']}', '{shipment['from']['label']}', '{shipment['to']['label']}','{shipment['date'].split('T')[0]}', '{shipment['title']}', '{shipment['description']}', '{shipment['OfferedReward']}')")
    id = cursor.lastrowid
    items = shipment['itemArray']
    for item in items:
        ItemCat = item['ItemCategory']
        cursor.execute(
            f"insert item (shipmentID, Category, Weight, Name, Quantity, ItemLink) values ('{id}', '{shipment['lookupTable'][ItemCat]}', '{item['ItemWeight']}', '{item['ItemTitle']}', '{item['ItemQuantity']}', '{item['ItemLink']}')"
        )
    # this works better I think. Double check with asem because this will cause problems.
    cursor.execute("SELECT max(id) FROM shipment")
    testID = cursor.fetchone()[0]
    return jsonify({'created': True, 'Id': testID})


@app.route('/addPics/<username>/<Id>', methods=["POST", "GET"])
def addPics(username, Id):
    counter = 1
    images = request.files
    for singleImg in images:
        img = images[singleImg]
        saveTo = os.path.join(os.getcwd(), 'static/Img/ItemPics',
                              f"{username}_{Id}_img{counter}.png")
        img.save(saveTo)
        counter += 1

    return "SUCESS"


@app.route("/loadShipmentsPics/<imageName>", methods=["POST", "GET"])
def loadPic(imageName):

    filePath = os.path.join(
        os.getcwd(), f'static/Img/itemPics/{imageName}')
    if os.path.isfile(filePath):
        return send_file(filePath, mimetype='image/gif')
    else:
        defaultPath = os.path.join(
            os.getcwd(), 'static/Img/itemPics/defaultItemPic.png')
        return send_file(defaultPath, mimetype='image/gif')
    return "sucess"


if __name__ == "__main__":
    app.run(debug=True)
