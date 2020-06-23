import mysql.connector
# database conncetion
db = mysql.connector.connect(
    host="localhost",
    user="root",
    # khaled's pass
    # passwd="MTSyld45",
    # Asem's pass
    passwd= 'sql123',
    database="pdelivery"
)
db.autocommit = True
cursor = db.cursor(buffered=True)

