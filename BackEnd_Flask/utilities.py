import mysql.connector
# database conncetion
db = mysql.connector.connect(
    # Enter your database info 
    host="localhost",
    user="root",
    passwd= 'password', 
    database="name" 
)
db.autocommit = True
cursor = db.cursor(buffered=True)

