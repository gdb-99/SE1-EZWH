'use strict';




const { expect } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const returnOrderController = controller.getReturnOrderController();
const dbManager = controller.getDBManager();


beforeEach(async () => {
    //console.log("executed before return")
    await dbManager.deleteAllData().then(async () => {
        await dbManager.insertRestockAndReturnOrderTestData();
    })
  });

afterEach(async () => {
    //console.log("executed after return")
    await dbManager.deleteAllData();
});

describe('ReturnOrderController Tests', () => {
    describe('createReturnOrder method testing', () => {
        test('Successfully create a new Return Order', async () => {
            let result, oldCount, newCount;
            const products = [{
                               "SKUId":2, "itemId":2, "description_return":"return description", 
                               "price":30, "RFID":"78901234567890161234567890123456"
                             }];
            const body = {
                returnDate : "2022/04/14",
                products : products,
                restockOrderId : 3
            }

            oldCount = (await returnOrderController.getAllReturnOrders()).length;

            await returnOrderController.createReturnOrder(body).catch(() => {
                console.log("error");
            });

            result = await returnOrderController.getAllReturnOrders();
            newCount = result.length;

            expect(oldCount).to.be.equal(newCount-1);
            expect(result[1].products.length).to.be.above(0);

            //  currId = ((await returnOrderController.getAllReturnOrders()).length) + 1;
            //  await returnOrderController.createReturnOrder(body).catch(() => {});
            //  result = await returnOrderController.getReturnOrder(currId).catch(() => {});
    
        
            //  expect(result).not.to.be.undefined;

        });

        test('Creation of a Return Order with an invalid Restock Order id', async () => {
            let result, oldCount, newCount;
            const products = [{
                               "SKUId":2, "itemId":2, "description_return":"return description", 
                               "price":30, "RFID":"78901234567890161234567890123456"
                             }];
            const body = {
                returnDate : "2022/04/04",
                products : products,
                restockOrderId : 100
            }

            oldCount = (await returnOrderController.getAllReturnOrders()).length;

            await returnOrderController.createReturnOrder(body).catch(() => {});

            result = await returnOrderController.getAllReturnOrders();
            newCount = result.length;
            //console.log(result.products);

            expect(oldCount).to.be.equal(newCount);
        });

        test('Creation of a Return Order with an invalid date', async () => {
            let result, oldCount, newCount;
            const products = [{
                               "SKUId":2, "itemId":2, "description_return":"return description", 
                               "price":30, "RFID":"78901234567890161234567890123456"
                             }];
            const body = {
                returnDate : "123/456/78",
                products : products,
                restockOrderId : 1
            }

            oldCount = (await returnOrderController.getAllReturnOrders()).length;

            await returnOrderController.createReturnOrder(body).catch(() => {});

            result = await returnOrderController.getAllReturnOrders();
            newCount = result.length;

            expect(oldCount).to.be.equal(newCount);
        });


        

        /*test('Creation of a Return Order with one or more non-existing products', async () => {
            let result, oldCount, newCount;
            const products = [{
                               "SKUId":10, "404 not_existing_desc":"not_existing_notes", 
                               "price":130, "RFID":"90161234567890123456789012345678"
                             }];
            const body = {
                returnDate : "2022/04/04",
                products : products,
                restockOrderId : 3
            }

            oldCount = (await returnOrderController.getAllReturnOrders()).length;

            await returnOrderController.createReturnOrder(body).then(() => {}).catch(() => {});

            result = await returnOrderController.getAllReturnOrders();
            newCount = result.length;

            expect(oldCount).to.be.equal(newCount);
            console.log(oldCount, newCount);
        });*/
    });



    describe('deleteReturnOrder method testing', () => {
        test('Successfully delete a Return Order', async () => {
            let result;

            await returnOrderController.deleteReturnOrder(1);

            result = await returnOrderController.getReturnOrder(1).catch(() => {});
            expect(result).to.be.undefined;
        });

        test('Delete a non-existing Return Order', async () => {
            let oldCount, newCount;

            oldCount = (await returnOrderController.getAllReturnOrders()).length;

            await returnOrderController.deleteReturnOrder(-1).catch(() => {});

            newCount = (await returnOrderController.getAllReturnOrders()).length;

            expect(oldCount).to.be.equal(newCount);
        });
    });
});