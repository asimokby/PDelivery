Create table if not exists User(
	Username VARCHAR(50),
	Name VARCHAR(50),
	Password VARCHAR(255) NOT NULL,
	Email VARCHAR(100) UNIQUE NOT NULL, #NEW BECAME unique
	Country VARCHAR(50),
	PhoneNumber VARCHAR(20),
	Birthday DATE,
	PRIMARY KEY (Username)
);

Create table if not exists Shipment(
	ID INTEGER AUTO_INCREMENT,
	Username VARCHAR(50),
	FromLocation VARCHAR(20) NOT NULL,
	ToLocation VARCHAR(20) NOT NULL,
	RequestedDeliveryDate Date NOT NULL,
	Title VARCHAR(100) NOT NULL,
	Description_ VARCHAR(250) NOT NULL,
	OfferedReward DECIMAL(10, 2) NOT NULL,   
	PRIMARY KEY (ID),
	FOREIGN KEY (Username) REFERENCES User(Username) ON DELETE CASCADE
);


Create table if not exists Item(
	ID INTEGER AUTO_INCREMENT,
	shipmentID INTEGER,
	Category VARCHAR(15) NOT NULL,
	ItemLink VARCHAR(300),
    Weight INTEGER NOT NULL,
    Name VARCHAR (50) NOT NULL,
    Quantity INTEGER NOT NULL,
	PRIMARY KEY (ID, shipmentID),
	FOREIGN KEY (shipmentID) REFERENCES Shipment(ID) ON DELETE CASCADE
    
);

Create table if not exists Trip(
	Id INTEGER AUTO_INCREMENT,
	Username VARCHAR(50),
	FromLocation VARCHAR(20) NOT NULL,
	ToLocation VARCHAR(20) NOT NULL,
	Date DATE NOT NULL,
    Time Time NOT NULL, 
    AvailableWeight INTEGER NOT NULL,
	Description VARCHAR(250) NOT NULL,
	PRIMARY KEY(Id),
	FOREIGN KEY (Username) REFERENCES User(Username) ON DELETE CASCADE
);

Create table if not exists UnWantedCategory(
	tripID INTEGER,
    Category VARCHAR(20),
    PRIMARY KEY (tripID, Category),
    FOREIGN KEY (tripID) REFERENCES TRIP(ID) ON DELETE CASCADE
);

Create table if not exists Midpoint(
	District CHAR(20)  NOT NULL,
	TripID INTEGER AUTO_INCREMENT,
	PRIMARY KEY (District, TripID),
	FOREIGN KEY (TripID) REFERENCES Trip(ID) ON DELETE CASCADE
);



Create table if not exists Review(
	ID INTEGER AUTO_INCREMENT,
    TripID INTEGER,
	ShipmentID INTEGER,
	reviewerUsername VARCHAR(50), ##NEW
    revieweeUsername VARCHAR(50), ## NEW
	NumOfStars INTEGER NOT NULL,
	Text VARCHAR(500) NOT NULL,
    PRIMARY KEY (ID, TripID, ShipmentID),
	FOREIGN KEY (ShipmentID) REFERENCES Shipment(ID), 
    FOREIGN KEY (TripID) REFERENCES TRIP(Id),
	FOREIGN KEY (reviewerUsername) REFERENCES USER(Username) ON DELETE SET NULL,
    FOREIGN KEY (revieweeUsername) REFERENCES USER(Username) ON DELETE SET NULL
);


Create table if not exists Request(
	# add id to this
    ID INTEGER AUTO_INCREMENT,
	TripID INTEGER,
	ShipmentID INTEGER,
	senderRev INTEGER,
    receiverRev INTEGER,
    senderUsername  VARCHAR(50),
	receiverUsername  VARCHAR(50),
    status INTEGER,

	PRIMARY KEY (ID),
    FOREIGN KEY (TripID) REFERENCES TRIP(Id),
    FOREIGN KEY (ShipmentID) REFERENCES Shipment(ID),
    FOREIGN KEY (senderUsername) REFERENCES USER(Username) ON DELETE SET NULL,
    FOREIGN KEY (receiverUsername) REFERENCES USER(Username) ON DELETE SET NULL,
    FOREIGN KEY (senderRev) REFERENCES Review(ID) ON DELETE SET NULL,
    FOREIGN KEY (receiverRev) REFERENCES Review(ID) ON DELETE SET NULL
);