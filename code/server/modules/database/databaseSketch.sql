DROP TABLE InternalOrder;
DROP TABLE Item;
DROP TABLE Position;
DROP TABLE RestockOrder;
DROP TABLE ReturnOrder;
DROP TABLE SKU;
DROP TABLE SKUItem;
DROP TABLE SKUItemsPerInternalOrder;
DROP TABLE SKUItemsPerReturnOrder;
DROP TABLE SKUItemsPerRestockOrder;
DROP TABLE SKUPerInternalOrder;
DROP TABLE SKUPerRestockOrder;
DROP TABLE SKU_in_Position;
DROP TABLE TestDescriptor;
DROP TABLE TestResult;
DROP TABLE Users;
CREATE TABLE SKU(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    weight FLOAT,
    volume FLOAT,
    price FLOAT,
    notes VARCHAR(250),
    description VARCHAR(250),
    availableQuantity INT
);
CREATE TABLE SKUItem(
    RFID VARCHAR(50),
    SKUId INT,
    available INT,
    DateOfStock VARCHAR(50),
    PRIMARY KEY (RFID),
    FOREIGN KEY (SKUId) REFERENCES SKU(id)
);
CREATE TABLE Position(
    positionID TEXT PRIMARY KEY,
    aisleID TEXT,
    row TEXT,
    col TEXT,
    maxWeight INT,
    maxVolume INT,
    occupiedWeight INT,
    occupiedVolume INT
);
CREATE TABLE SKU_in_Position(
    SKUId INT,
    positionID INT,
    PRIMARY KEY(SKUId, positionID),
    FOREIGN KEY (SKUId) REFERENCES SKU(id),
    FOREIGN KEY (positionID) REFERENCES Position(positionID)
);
CREATE TABLE TestDescriptor(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100),
    procedureDescription VARCHAR(250),
    idSKU INT,
    FOREIGN KEY (idSKU) REFERENCES SKU(id)
);
CREATE TABLE TestResult(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    idTestDescriptor INT,
    RFID VARCHAR(50),
    Date VARCHAR(50),
    Result BOOLEAN,
    FOREIGN KEY(idTestDescriptor) REFERENCES TestDescriptor(id),
    FOREIGN KEY (RFID) REFERENCES SKUItem(RFID)
);
CREATE TABLE Users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(250),
    name VARCHAR(100),
    surname VARCHAR(100),
    type VARCHAR(100),
    password VARCHAR(250)
);
CREATE TABLE RestockOrder(
    id INTEGER PRIMARY KEY,
    issueDate VARCHAR(50),
    state VARCHAR(250),
    transportNote VARCHAR(50),
    supplierId INT,
    FOREIGN KEY(supplierId) REFERENCES Users(id)
);
CREATE TABLE SKUPerRestockOrder(
    id INT,
    SKUid INT,
    itemId INT,
    description VARCHAR(250),
    price FLOAT,
    qty INT,
    PRIMARY KEY(id, SKUid),
    FOREIGN KEY(SKUid) REFERENCES SKU(id),
    FOREIGN KEY(id) REFERENCES RestockOrder(id),
    FOREIGN KEY(itemId) REFERENCES ITEM(id)
);
CREATE TABLE SKUItemsPerRestockOrder(
    id INT,
    SKUID INT,
    itemId INT,
    RFID VARCHAR(50),
    PRIMARY KEY(id, RFID),
    FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
    FOREIGN KEY(id) REFERENCES RestockOrder(id),
    FOREIGN KEY(itemId) REFERENCES ITEM(id)
);
CREATE TABLE ReturnOrder(
    id INTEGER PRIMARY KEY,
    returnDate VARCHAR(50),
    restockOrderId INT,
    FOREIGN KEY(id) REFERENCES RestockOrder(id)
);
CREATE TABLE SKUItemsPerReturnOrder(
    id INT,
    SKUId INT,
    itemId INT,
    description VARCHAR(50),
    price FLOAT,
    RFID VARCHAR(50),
    PRIMARY KEY(id, RFID),
    FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
    FOREIGN KEY(id) REFERENCES ReturnOrder(id),
    FOREIGN KEY(itemId) REFERENCES ITEM(id)
);
CREATE TABLE InternalOrder(
    id INTEGER PRIMARY KEY,
    issueDate VARCHAR(50),
    state VARCHAR(250),
    customerId INT,
    FOREIGN KEY(customerId) REFERENCES Users(id)
);
CREATE TABLE SKUPerInternalOrder(
    id INT,
    SKUId INT,
    description VARCHAR(50),
    price FLOAT,
    qty INT,
    PRIMARY KEY(id, SKUId),
    FOREIGN KEY(SKUId) REFERENCES SKU(Id),
    FOREIGN KEY(id) REFERENCES InternalOrder(id)
);
CREATE TABLE SKUItemsPerInternalOrder(
    id INT,
    SKUId INT,
    RFID VARCHAR(50),
    PRIMARY KEY(id, SKUId, RFID),
    FOREIGN KEY(RFID) REFERENCES SKUItem(RFID),
    FOREIGN KEY(SKUId) REFERENCES SKU(id),
    FOREIGN KEY(id) REFERENCES InternalOrder(id)
);
CREATE TABLE Item(
    id INT,
    description VARCHAR(250),
    price FLOAT,
    SKUId INT,
    supplierId INT,
    PRIMARY KEY (id, supplierId),
    FOREIGN KEY (SKUid) REFERENCES SKU(id),
    FOREIGN KEY (supplierId) REFERENCES Users(id),
    CONSTRAINT SS_Item UNIQUE(SKUid, supplierId)
);
INSERT INTO Users (email, name, surname, password, type)
VALUES (
        "user1@ezwh.com",
        "name1",
        "surname1",
        "e16b2ab8d12314bf4efbd6203906ea6c",
        "customer"
    );
INSERT INTO Users (email, name, surname, password, type)
VALUES (
        "qualityEmployee1@ezwh.com",
        "name2",
        "surname2",
        "e16b2ab8d12314bf4efbd6203906ea6c",
        "qualityEmployee"
    );
INSERT INTO Users (email, name, surname, password, type)
VALUES (
        "clerk1@ezwh.com",
        "name3",
        "surname3",
        "e16b2ab8d12314bf4efbd6203906ea6c",
        "clerk"
    );
INSERT INTO Users (email, name, surname, password, type)
VALUES (
        "deliveryEmployee1@ezwh.com",
        "name4",
        "surname4",
        "e16b2ab8d12314bf4efbd6203906ea6c",
        "deliveryEmployee"
    );
INSERT INTO Users (email, name, surname, password, type)
VALUES (
        "supplier1@ezwh.com",
        "name5",
        "surname5",
        "e16b2ab8d12314bf4efbd6203906ea6c",
        "supplier"
    );
INSERT INTO Users (email, name, surname, password, type)
VALUES (
        "manager1@ezwh.com",
        "name6",
        "surname6",
        "e16b2ab8d12314bf4efbd6203906ea6c",
        "manager"
    );