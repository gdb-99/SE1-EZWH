'use strict';




const { expect, assert } = require('chai');
const Controller = require('../modules/logic/controller');
const TestDescriptorController = require('../modules/logic/testDescriptorController');

const controller = new Controller();
const itemController = controller.getItemController();
const dbManager = controller.getDBManager();


beforeEach(async () => {
    await dbManager.deleteAllData()
});

afterEach(async () => {
    await dbManager.deleteAllData()
});

describe.only('itemController Tests', () => {

    describe('getAllItems method test', () => {
        test('successful use of getAllItems', async () => {
            const result = await itemController.getAllItems();
            assert.equal(result.length, 0);
        })
    })

    describe('getItem method test', () => {
        let errorValue;
        test('successful use of getItem', async () => {
            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch(() => { throw error });
            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch(() => { throw error });

            await itemController.createItem(
                {
                    id: 1,
                    description: "description",
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 5,
                }
            )
            await itemController.createItem(
                {
                    id: 2,
                    description: "description",
                    price: 10.99,
                    SKUId: 2,
                    supplierId: 5,
                }
            )

            const result = await itemController.getItem(2, 5);
            assert.equal(result.id, 2)
        })

        test('attempt of getItem with undefined id', async () => {
            await itemController.getItem(undefined, 5).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422)
        })

        test('attempt of getItem with invalid id', async () => {
            await itemController.getItem("hello", 5).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422)
        })

        test('attempt of getItem with non-existant item', async () => {
            await itemController.getItem(1, 5).catch(err => errorValue = err);
            assert.equal(errorValue.code, 404)
        })



    })

    describe('createItem method test', () => {
        let errorValue;
        test('successful use of createItem', async () => {

            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch(() => { throw error });

            await itemController.createItem(
                {
                    id: 1,
                    description: "description",
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 5,
                }
            )

            const result = await itemController.getItem(1, 5);
            assert.equal(result.id, 1)
        })

        test('attempt of createItem with an undefined parameter', async () => {
            await itemController.createItem(
                {
                    id: 1,
                    description: undefined,
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 5,
                }
            ).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422)
        })

        test('attempt of createItem with an invalid id', async () => {
            await itemController.createItem(
                {
                    id: "hello",
                    description: "description",
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 5,
                }
            ).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422)
        })

        test('attempt of createItem with a negative parameter', async () => {
            await itemController.createItem(
                {
                    id: 1,
                    description: "description",
                    price: -10.99,
                    SKUId: 1,
                    supplierId: 5,
                }
            ).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422)
        })

        test('attempt of createItem with a non-existant sku', async () => {
            await itemController.createItem(
                {
                    id: 1,
                    description: "description",
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 5,
                }
            ).catch(err => errorValue = err);
            assert.equal(errorValue.code, 404)
        })

        test('attempt of createItem with an already existant item', async () => {

            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
        VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch(() => { throw error });


            await itemController.createItem(
                {
                    id: 1,
                    description: "description",
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 5,
                }
            )
            await itemController.createItem(
                {
                    id: 1,
                    description: "description",
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 5,
                }
            ).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422)
        })

    })

    describe('editItem method test', () => {
        let errorValue;
        test('successful use of editItem', async () => {

            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch((error) => { console.log("e", error); throw error });

            await itemController.createItem(
                {
                    id: 1,
                    description: "description",
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 5,
                }
            )

            await itemController.editItem(1, 5, {
                newDescription: "newDescription",
                newPrice: 15,
            })

            const result = await itemController.getItem(1, 5);
            assert.equal(result.description, "newDescription")

        })

        test('attempt of editItem with an undefined parameter', async () => {
            await itemController.editItem(1, 5, {
                newDescription: undefined,
                newPrice: 15,
            }).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422)
        })

        test('attempt of editItem with a invalid parameter', async () => {
            await itemController.editItem(1, 5, {
                newDescription: "newDescription",
                newPrice: "hello",
            }).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422)
        })

        test('attempt of editItem with a negative parameter', async () => {
            await itemController.editItem(1, 5, {
                newDescription: "newDescription",
                newPrice: -15,
            }).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422)
        })

        test('attempt of editItem with a non-existant item', async () => {
            await itemController.editItem(1, 5, {
                newDescription: "newDescription",
                newPrice: 15,
            }).catch(err => errorValue = err);
            assert.equal(errorValue.code, 404)
        })
    })

    describe('deleteItem method test', () => {
        let errorValue;
        test('successful use of deleteItem', async () => {

            const sqlInstruction = `INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( ?, ?, ?, ?, ?, ?);`;

            await dbManager.genericSqlRun(sqlInstruction, 100, 50, 10.99, "notes", "first sku", 50)
                .catch(() => { throw error });

            await itemController.createItem(
                {
                    id: 1,
                    description: "description",
                    price: 10.99,
                    SKUId: 1,
                    supplierId: 5,
                }
            )

            const result = await itemController.getItem(1, 5);
            assert.equal(result.id, 1)
            await itemController.deleteItem(1, 5)
            await itemController.getItem(1, 5).catch(err => errorValue = err)
            assert.equal(errorValue.code, 404)
        })

        test('attempt of deleteItem with undefined id', async () => {
            await itemController.deleteItem(undefined, 5).catch(err => errorValue = err)
            assert.equal(errorValue.code, 422)
        })

        test('attempt of deleteItem with invalid id', async () => {
            await itemController.deleteItem("hello", 5).catch(err => errorValue = err)
            assert.equal(errorValue.code, 422)
        })



    })
})