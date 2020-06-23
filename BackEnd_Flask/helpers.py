import datetime
from schema import schemas
import os


def zipTableAttrs(tableSchema, fetched_data):
    """ This function takes a tuple from User table and returns a dict where
        the keys are the attrs' names
    """
    return [dict(zip(schemas[tableSchema], [str(j) for j in i])) for i in fetched_data]


def getMidpointsAndunWantedCats(trips, cursor):
    """ this gets the midpoints and the unwanted categories of some trips"""
    midpoints = {}
    unWantedCategories = {}
    for t in trips:
        id = t[0]
        cursor.execute(f"select District from Midpoint where TripID = '{id}'")
        # midpoints.extend(cursor.fetchall())
        midpoints[id] = cursor.fetchall()

        cursor.execute(
            f"select Category from UnWantedCategory where tripID = '{id}'")
        # unWantedCategories.extend(cursor.fetchall())
        unWantedCategories[id] = cursor.fetchall()
    return midpoints, unWantedCategories


def getItemsOfShipments(shipments, cursor):
    """this gets items of some shipments """
    items = {}
    itemsPics = {}
    for shipment in shipments:
        id = shipment[0]
        username = shipment[1]
        cursor.execute(f"select * from Item  where shipmentID = '{id}'")
        items[id] = zipTableAttrs('item', cursor.fetchall())

    return items


def matchPicsOfItems(shipments):
    picsDirPath = os.path.join(os.getcwd(), f'static/Img/ItemPics/')
    itemsPics = dict((shipment[0], []) for shipment in shipments)
    for shipment in shipments:
        shipment_ID = shipment[0]
        shipment_creator = shipment[1]
        for image in os.listdir(picsDirPath):
            if f"{shipment_creator}_{shipment_ID}" in image:
                itemsPics[shipment_ID].append(image)
            else:
                continue
    return itemsPics
