'use strict';

const { expect, assert } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const skuItemController = controller.getSkuItemController();
const skuController = controller.getSkuController();
const dbManager = controller.getDBManager();


beforeEach(async () => {
    //console.log("executed before rest")
    await dbManager.deleteAllData();
});

afterEach(async () => {
    //console.log("executed after rest");
    await dbManager.deleteAllData();
});

describe('SKUItemController Tests', () => {


    describe('getAllSkuItems method testing', () => {
        test('successfull use of getAllSkuItems', async () => {
            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "a new sku", 50)
                .catch(() => { throw error });

            const rfid1 = '12345678901234567890123456789019'
            const rfid2 = '12345678901234567890123456789010'

            await skuItemController.createSkuItem(
                {
                    RFID: rfid1,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))

            await skuItemController.createSkuItem(
                {
                    RFID: rfid2,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))

            const items = await skuItemController.getAllSkuItems().catch(error => { throw error });

            assert.equal(items.length, 2);
        })
    })

    describe('getSkuItems method testing', () => {
        test('successful use of getSkuItems', async () => {

            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch(() => { throw error });
            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "second sku", 50)
                .catch(() => { throw error });

            const rfid1 = '12345678901234567890123456789019'
            const rfid2 = '12345678901234567890123456789010'

            await skuItemController.createSkuItem(
                {
                    RFID: rfid1,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))

            await skuItemController.createSkuItem(
                {
                    RFID: rfid2,
                    SKUId: 2,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))

            await skuItemController.editSkuItem(rfid1,
                {
                    newRFID: rfid1,
                    newAvailable: 1,
                    newDateOfStock: "2022/01/01",
                }
            )

            const items = await skuItemController.getSkuItems(1).catch(error => { throw error })
            assert.equal(items.length, 1)
            assert.equal(items[0].RFID, rfid1)
        })

        test('attempt to use getSkuItems with a non-existant skuid', async () => {
            let errorValue;
            const items = await skuItemController.getSkuItems(1).catch(error => { errorValue = error })
            assert.equal(errorValue.code, 404)
        })

        test('attempt to use getSkuItems with an invalid skuid', async () => {
            let errorValue;
            const items = await skuItemController.getSkuItems("hello").catch(error => { errorValue = error })
            assert.equal(errorValue.code, 422)
        })
    })

    describe('getSkuItem method testing', () => {
        test('successfull use of getSkuItem', async () => {
            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch(() => { throw error });
            const rfid = '12345678901234567890123456789019';
            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))
            const item = await skuItemController.getSkuItem(rfid);
            assert.equal(item.RFID, rfid);
        })

        test('attempt to use getSkuItem with a non-existant rfid', async () => {
            let errorValue;
            const item = await skuItemController.getSkuItem('12345678901234567890123456789019')
                .catch(error => errorValue = error)
            assert.equal(errorValue.code, 404)
        })

        test('attempt to use getSkuItem with an invalid rfid', async () => {
            let errorValue;
            const item = await skuItemController.getSkuItem('hello')
                .catch(error => errorValue = error)
            assert.equal(errorValue.code, 422)
        })
    })

    describe('createSkuItem method testing', () => {
        test('successful use of createSKUitem', async () => {

            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "a new sku", 50)
                .catch(() => { throw error });

            const rfid = '12345678901234567890123456789019';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))

            const value = await skuItemController.getSkuItem(rfid)
                .catch(error => (console.log(error)))
            assert.equal(value.RFID, rfid)

        })

        test('attempt to create SkuItem with non-existent SKUId', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (errorValue = error));

            assert.equal(errorValue.code, 404);

        })

        test('attempt to create SkuItem with invalid rfid', async () => {
            let errorValue;
            const rfid = 'hello';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (errorValue = error));

            assert.equal(errorValue.code, 422);

        })

        test('attempt to create SkuItem with an already used rfid', async () => {
            let errorValue;
            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "a new sku", 50)
                .catch(() => { throw error });
            
            const rfid = '12345678901234567890123456789019';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            );

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (errorValue = error));

            assert.equal(errorValue.code, 500);

        })

        test('attempt to create SkuItem with invalid SKUId', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: "hello",
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (errorValue = error));

            assert.equal(errorValue.code, 422);

        })

        test('attempt to create SkuItem with invalid date', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';

            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/1001/01",
                }
            ).catch(error => (errorValue = error));

            assert.equal(errorValue.code, 422);

        })


    })

    describe('editSkuItem method testing', () => {
        test('successful use of editSkuItem', async () => {

            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "a new sku", 50)
                .catch(() => { throw error });

            const rfid = '12345678901234567890123456789019';
            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))

            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "12345678901234567890123456789018",
                    newAvailable: 1,
                    newDateOfStock: "2020/01/01",
                }
            ).catch(error => (console.log(error)))

            const value = await skuItemController.getSkuItem("12345678901234567890123456789018")
                .catch(error => (console.log("get:", error)))
            assert.equal(value.RFID, "12345678901234567890123456789018")
        })


        test('attempt to edit a non-existant SkuItem', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';
            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "12345678901234567890123456789018",
                    newAvailable: 1,
                    newDateOfStock: "2020/01/01",
                }
            ).catch(error => errorValue = error);

            assert.equal(errorValue.code, 404);

        })

        test('attempt to edit a SkuItem with an invalid rfid', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';
            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "hello",
                    newAvailable: 1,
                    newDateOfStock: "2020/01/01",
                }
            ).catch(error => errorValue = error);

            assert.equal(errorValue.code, 422);

        })


        test('attempt to edit a SkuItem with an invalid available value', async () => {
            let errorValue;
            const rfid = '12345678901234567890123456789019';
            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "12345678901234567890123456789018",
                    newAvailable: "hello",
                    newDateOfStock: "2020/01/01",
                }
            ).catch(error => errorValue = error);

            assert.equal(errorValue.code, 422);

        })

        test('attempt to edit a SkuItem with an invalid date', async () => {
            const rfid = '12345678901234567890123456789019';
            let errorValue;
            await skuItemController.editSkuItem(rfid,
                {
                    newRFID: "12345678901234567890123456789018",
                    newAvailable: 1,
                    newDateOfStock: "2020/2001/01",
                }
            ).catch(error => errorValue = error);

            assert.equal(errorValue.code, 422);
        })

    })

    describe('deleteSkuItem method testing', () => {
        test('successful use of createSkuItem and deleteSkuItem', async () => {

            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "a new sku", 50)
                .catch(() => { throw error });

            const rfid = '12345678901234567890123456789019';
            await skuItemController.createSkuItem(
                {
                    RFID: rfid,
                    SKUId: 1,
                    DateOfStock: "2022/01/01",
                }
            ).catch(error => (console.log(error)))


            await skuItemController.deleteSkuItem(rfid);

            const value = await skuItemController.getAllSkuItems()
                .catch(error => (console.log("get:", error)))
            assert.equal(value.length, 0)
        });

        test('attempt to delete a SkuItem with an invalid rfid', async () => {
            const rfid = 'hello';
            let errorValue;
            await skuItemController.deleteSkuItem(rfid)
                .catch(error => errorValue = error);

            assert.equal(422, errorValue.code);
        })
    })
});





