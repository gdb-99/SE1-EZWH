'use strict';




const { expect } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const restockOrderController = controller.getRestockOrderController();
const dbManager = controller.getDBManager();



beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        await dbManager.insertRestockAndReturnOrderTestData();
    })
  });

afterEach(async () => {
    //console.log("executed after rest");
    await dbManager.deleteAllData();
});

describe('RestockOrderController Tests', () => {
    describe('createRestockOrder method testing', () => {
        test("Successfully add new Restock Order to Database", async () => {
            let result, currId;
            const body = {
                 issueDate : "2023/01/15",
                 products: [],
                 supplierId : 5
             }

            currId = ((await restockOrderController.getAllRestockOrders()).length) + 1;
            await restockOrderController.createRestockOrder(body);
            result = await restockOrderController.getRestockOrder(currId).catch(() => {});

            expect(result).not.to.be.undefined;
        });
    
        test("Insertion of a RestockOrder with malformed date", async () => {
            let result;
            let currId
            const body = {
                 issueDate : "123/456/7",
                 products: [],
                 supplierId : 5
             }
        
             currId = ((await restockOrderController.getAllRestockOrders()).length) + 1;
             await restockOrderController.createRestockOrder(body).catch(() => {});
             result = await restockOrderController.getRestockOrder(currId).catch(() => {});
    
        
             expect(result).to.be.undefined;
        });

    
    
        test("Insertion of a RestockOrder with invalid supplierId", async () => {
            let result;
            let currId;
            const body = {
                 issueDate : "123/456/7",
                 products: [],
                 supplierId : -1
             }
        
             currId = ((await restockOrderController.getAllRestockOrders()).length) + 1;
             await restockOrderController.createRestockOrder(body).catch(() => {});
             result = await restockOrderController.getRestockOrder(currId).catch(() => {});
    
        
             expect(result).to.be.undefined;
        });
    });
    
    describe('editRestockOrder method testing', () => {
        test('Successfully edit a Restock Order', async () => {
            let result;
            const body = {newState : "DELIVERED"};
            let newState;

            await restockOrderController.editRestockOrder(1, body);

            result = await restockOrderController.getRestockOrder(1);
            newState = result['state'];

            expect(newState).to.be.equal("DELIVERED");
        });

        test('Edit a Restock Order with an invalid state', async () => {
            let result;
            const body = {newState : "INVALID_STATE"};
            let oldState, newState;

            result = await restockOrderController.getRestockOrder(1);
            oldState = result['state'];

            await restockOrderController.editRestockOrder(1, body).catch(() => {});

            result = await restockOrderController.getRestockOrder(1);
            newState = result['state'];

            expect(newState).to.be.equal(oldState);
        });

        test('Edit a non-existing Restock Order', async () => {
            let result;
            const body = {newState : "DELIVERED"};


            result = await restockOrderController.editRestockOrder(-1, body).catch(() => {});
            expect(result).to.be.undefined;
        });


        test("Add SKU Items to Restock Order", async () => {
            let result;

            const list = [{"SKUId":1, "itemId":1, "rfid":"12345678901234567890123456789016"}];
                
            await restockOrderController.editRestockOrder(1, {newState:"DELIVERED"});
            await restockOrderController.addSkuItemsToRestockOrder(1, {skuItems:list});

            result = await restockOrderController.getRestockOrder(1);

            

           expect(result.products.length).to.be.equal(1);
           expect(result.products.length).to.be.equal(1);
        });

        test("Failed to add SKU Items due to invalid SKU", async () => {
            let result;

            const list = [{"SKUId":100, "itemId":1, "rfid":"01234567812345678990123456789016"}];
                
            await restockOrderController.editRestockOrder(1, {newState:"DELIVERED"});
            await restockOrderController.addSkuItemsToRestockOrder(1, {skuItems:list}).catch(() => {});
       
            result = await restockOrderController.getRestockOrder(1);

            expect(result.products.length).to.be.equal(0);
            expect(result.products.length).to.be.equal(0);
        });

        test("Get restock order to be returned", async () => {
            let result;
            
            result = await restockOrderController.getRestockOrderToBeReturned(2);

            expect(result.length).to.be.equal(0);

        });

        test("Get restock order to be returned with wrong params", async () => {
            let result1, result2, result3;
            
            result1 = await restockOrderController.getRestockOrderToBeReturned(100).catch(() => {});
            result2 = await restockOrderController.getRestockOrderToBeReturned("test").catch(() => {});
            
            await restockOrderController.editRestockOrder(1, {newState:"DELIVERED"});
            result3 = await restockOrderController.getRestockOrderToBeReturned(1).catch(() => {});

            expect(result1).to.be.undefined;
            expect(result2).to.be.undefined;
            expect(result3).to.be.undefined;
        })
    });

    describe('deleteRestockOrder method testing', () => {
        test('Successfully delete a Restock Order', async () => {
            let result;

            await restockOrderController.deleteRestockOrder(1);

            result = await restockOrderController.getRestockOrder(1).catch(() => {});
            expect(result).to.be.undefined;

        });

        test('Delete a non-existing Restock Order', async () => {
            let result, oldCount, newCount;

            oldCount = (await restockOrderController.getAllRestockOrders()).length;

            await restockOrderController.deleteRestockOrder(-1).catch(() => {});

            newCount = (await restockOrderController.getAllRestockOrders()).length;

            expect(oldCount).to.be.equal(newCount);
        });
    });


    describe('getMethodsTesting',  () => {
        let result;


        test('Add and Get a Transport Note in a Restock Order Test', async () => {
            await restockOrderController.editRestockOrder(1, {newState:"DELIVERY"});


            const transportNote =  {transportNote:{"deliveryDate":"2022/03/03"}};

            await restockOrderController.addTransportNote(1, transportNote)
            result = await restockOrderController.getTransportNote(1);

            expect(result).not.to.be.undefined;
         });

         test('Failed to add transportNote due to state', async () => {
            await restockOrderController.editRestockOrder(1, {newState:"COMPLETED"});

            const transportNote =  {"deliveryDate":"2022/03/03"};

            await restockOrderController.addTransportNote(1, {transportNote:transportNote}).catch(() => {})
            result = await restockOrderController.getTransportNote(1);

            expect(result["transportNote"]).to.be.equal('');
         });

         test('Failed to add transportNote due to invalid date', async () => {

            const transportNote = {"deliveryDate":"12345"};

            await restockOrderController.addTransportNote(1, {transportNote:transportNote}).catch(() => {})
            result = await restockOrderController.getTransportNote(1);

            expect(result["transportNote"]).to.be.equal('');
         });

         test('Failed to add transportNote due to old delivery date', async () => {

            const transportNote =  {"deliveryDate":"2020/01/01"};

            await restockOrderController.addTransportNote(1, {transportNote:transportNote}).catch(() => {})
            result = await restockOrderController.getTransportNote(1);

            expect(result["transportNote"]).to.be.equal('');
         });
    });
});









