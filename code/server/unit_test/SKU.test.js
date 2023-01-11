'use strict';




const { expect, assert } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const skuController = controller.getSkuController();
const dbManager = controller.getDBManager();


beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        await dbManager.insertSkuTestData();
    })
});
afterEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        //await dbManager.insertSkuTestData();
    })
});

describe('skuController Tests', () => {

    describe('getAllSku method testing', () => {
        test('successful use of getAllSku', async () => {

            const result = await skuController.getAllSku();
            //console.log(result);
            assert.equal(result.length, 1);
        })
    })

    describe('getSku method testing', () => {
        test('successful use of getSku', async () => {

            const result = await skuController.getSku(1);
            //console.log(result);
            assert.equal(result.id, 1);
        })

        test('use of getSku with invalid id', async () => {
            let errorValue;
            const result = await skuController.getSku("hello").catch(error => errorValue = error)
            assert.equal(errorValue.code, 422);
        })

        test('use of getSku with non-existant sku', async () => {
            let errorValue;
            await skuController.getSku(2).catch(error => errorValue = error)
            assert.equal(errorValue.code, 404);
        })
    })


    describe('createSku method testing', () => {
        test("Successfully add new Sku to Database", async () => {
            let result;
            let oldCount;
            let newCount;
            const body = {
                "description": "a new sku",
                "weight": 100,
                "volume": 50,
                "notes": "second SKU",
                "price": 10.99,
                "availableQuantity": 50
            }

            result = await skuController.getAllSku();
            oldCount = result.length;

            await skuController.createSku(body);

            result = await skuController.getAllSku();
            newCount = result.length;


            expect(newCount).to.be.equal(oldCount + 1);
        });

        test("Insertion of a sku with a missing value", async () => {
            let result;
            let oldCount;
            let newCount;
            const body = {
                "description": "a new sku",
                "weight": 100,
                "volume": 50,
                "notes": "second SKU",
                "price": 10.99
            }

            result = await skuController.getAllSku();
            oldCount = result.length;

            await skuController.createSku(body).catch(() => { });

            result = await skuController.getAllSku();
            newCount = result.length;


            expect(newCount).to.be.equal(oldCount);
        });


        test("Insertion of a Sku with negative volume", async () => {
            let result;
            let oldCount;
            let newCount;
            const body = {
                "description": "a new sku",
                "weight": 100,
                "volume": -50,
                "notes": "second SKU",
                "price": 10.99,
                "availableQuantity": 50
            }

            result = await skuController.getAllSku();
            oldCount = result.length;

            await skuController.createSku(body).catch(() => { });

            result = await skuController.getAllSku();
            newCount = result.length;


            expect(newCount).to.be.equal(oldCount);
        });
    });

    describe('editSku method testing', () => {
        test('Successfully edit a sku', async () => {
            let result;
            const body = {
                "newDescription": "a new sku",
                "newWeight": 10,
                "newVolume": 10,
                "newNotes": "first SKU",
                "newPrice": 10.99,
                "newAvailableQuantity": 3
            }


            await skuController.editSku(1, body).catch(() => { });;

            result = await skuController.getSku(1);

            expect(result['description']).to.be.equal("a new sku");
            expect(result['weight']).to.be.equal(10);
            expect(result['volume']).to.be.equal(10);
            expect(result['notes']).to.be.equal("first SKU");
            expect(result['price']).to.be.equal(10.99);
            expect(result['availableQuantity']).to.be.equal(3);
        });

        test('Edit a sku with an invalid new volume', async () => {
            let result;
            const body = {
                "newDescription": "a new sku",
                "newWeight": 10,
                "newVolume": -10,
                "newNotes": "first SKU",
                "newPrice": 10.99,
                "newAvailableQuantity": 3
            }
            let oldResult, newResult;

            oldResult = await skuController.getSku(1);

            await skuController.editSku(1, body).catch(() => { });

            newResult = await skuController.getSku(1);

            expect(oldResult['description']).to.be.equal(newResult['description']);
            expect(oldResult['weight']).to.be.equal(newResult['weight']);
            expect(oldResult['volume']).to.be.equal(newResult['volume']);
            expect(oldResult['notes']).to.be.equal(newResult['notes']);
            expect(oldResult['price']).to.be.equal(newResult['price']);
            expect(oldResult['availableQuantity']).to.be.equal(newResult['availableQuantity']);
        });

        test('Edit a sku in such a way that newWeight*newAvailableQuantity>maxWeight of the position in which is stored', async () => {
            let result;
            const body = {
                "newDescription": "a new sku",
                "newWeight": 30,
                "newVolume": 30,
                "newNotes": "first SKU",
                "newPrice": 10.99,
                "newAvailableQuantity": 10
            }
            let oldResult, newResult;

            oldResult = await skuController.getSku(1);

            await skuController.editSku(1, body).catch(() => { });

            newResult = await skuController.getSku(1);

            expect(oldResult['description']).to.be.equal(newResult['description']);
            expect(oldResult['weight']).to.be.equal(newResult['weight']);
            expect(oldResult['volume']).to.be.equal(newResult['volume']);
            expect(oldResult['notes']).to.be.equal(newResult['notes']);
            expect(oldResult['price']).to.be.equal(newResult['price']);
            expect(oldResult['availableQuantity']).to.be.equal(newResult['availableQuantity']);
        });

        test('Edit a non-existing Sku', async () => {
            let result;
            const body = {
                "newDescription": "a new sku",
                "newWeight": 10,
                "newVolume": 10,
                "newNotes": "first SKU",
                "newPrice": 10.99,
                "newAvailableQuantity": 3
            }


            result = await skuController.editSku(2, body).catch(() => { });
            expect(result).to.be.undefined;
        });

        test('Edit a sku with an undefined value', async () => {
            let errorValue;
            const body = {
                "newDescription": "a new sku",
                "newWeight": undefined,
                "newVolume": 10,
                "newNotes": "first SKU",
                "newPrice": 10.99,
                "newAvailableQuantity": 3
            }

            await skuController.editSku(1, body).catch(error => errorValue = error);
            assert.equal(errorValue.code, 422)


        })

    });

    describe('setPosition method testing', () => {
        test('Successfully edit a position of a sku', async () => {
            let result;
            const body = {
                "position": "000000000002"
            }



            await skuController.setPosition(1, body);

            result = await skuController.getPositionForSKU(1);

            expect(result).to.be.equal(String(Number("000000000002")));
        });


        test('Edit a Sku with a position that is not capable to satisfy volume and weight constraints for available quantity of sku ', async () => {
            let result;
            const body = {
                "position": "000000000003"
            }

            let oldPosition, newPosition;
            oldPosition = await skuController.getPositionForSKU(1);

            result = await skuController.setPosition(1, body).catch(() => { });

            newPosition = await skuController.getPositionForSKU(1);

            expect(oldPosition).to.be.equal(newPosition);
        });

        test('Edit a non-existing Sku', async () => {
            let result;
            const body = {
                "position": "000000000002"
            }


            result = await skuController.setPosition(2, body).catch(() => { });
            expect(result).to.be.undefined;
        });

        test('Edit a Sku with a non-existing position ', async () => {
            let result;
            const body = {
                "position": "000000000005"
            }

            let oldPosition, newPosition;
            oldPosition = await skuController.getPositionForSKU(1);

            result = await skuController.setPosition(1, body).catch(() => { });

            newPosition = await skuController.getPositionForSKU(1);

            expect(oldPosition).to.be.equal(newPosition);
        });
    });

    describe('deleteSku method testing', () => {
        test('Successfully delete a Sku', async () => {
            let result;

            await skuController.deleteSku(1);

            result = await skuController.getSku(1).catch(() => { });
            expect(result).to.be.undefined;

        });

        test('aatempt to delete a Sku with an invalid skuid', async () => {
            let errorValue;

            await skuController.deleteSku("hello").catch(error => errorValue = error);
            assert.equal(errorValue.code, 422);

        });

        test('Delete a non-existing Sku', async () => {
            let result, oldCount, newCount;

            oldCount = (await skuController.getAllSku()).length;

            await skuController.deleteSku(9).catch(() => { });

            newCount = (await skuController.getAllSku()).length;

            expect(oldCount).to.be.equal(newCount);
        });
    });

})

