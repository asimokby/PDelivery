
userTableSchema = ['Username', 'Name', 'Password', 'Email', 'Country', 'PhoneNumber', 'Birthday', 'isActive']
tripTableSchema = ['Id', 'Username', 'FromLocation', 'ToLocation', 'Date', 'Time', 'AvailableWeight', 'Description', 'CategoriesNotWanted']
shipmentTableSchema = ['Id', 'Username', 'FromLocation', 'ToLocation','RequestedDeliveryDate', 'Title', 'Description_', 'OfferedReward' ]
itemTableSchema = ['ID', 'shipmentID', 'Category', 'ItemLink', 'Weight', 'Name', 'Quantity']
reviewTableSchema = ['Id', 'TripID', 'ShipmentID', 'reviewerUsername', 'revieweeUserId', 'NumOfStars', 'Text']
requestTableSchema = ['Id', 'TripID', 'ShipmentID', 'senderRev', 'receiverRev', 'senderUsername', 'receiverUsername', 'status']


schemas = {
    'user':userTableSchema,
    'trip': tripTableSchema,
    'shipment': shipmentTableSchema,
    'review': reviewTableSchema,
    'request': requestTableSchema,
    'item':itemTableSchema,
}

