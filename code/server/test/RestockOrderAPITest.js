'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const RestockOrdersAPICalls = require('./APICalls/RestockOrdersAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

//const utilityCalls = new UtilityCalls();
const databaseManager = new DBManager();
const restockOrdersAPICalls = new RestockOrdersAPICalls();


describe('Restock Orders Testing', async () => {
    beforeEach(async () => {
        await databaseManager.deleteAllData().then(async () => {
            await databaseManager.insertRestockAndReturnOrderTestData();
        });
      });

     after(async () => {
        await databaseManager.deleteAllData();
    }) 

      describe('Add and get a new Restock', async () => {
        describe('Add a new Restock Order tests', async() => {
            let response
            it('Succesfully add and get a new Restock Order', async () => {
                response = await restockOrdersAPICalls.addRestockOrder("2022/01/01 10:10", [], 5);
                response.status.should.equal(201);


                response = await restockOrdersAPICalls.getRestockOrderById(3);
                response.data.id.should.equal(3);

            });

            it('Negative supplierId', async () => {
                response = await restockOrdersAPICalls.addRestockOrder("01/01/2022 10:10", [], -10);
                response.status.should.equal(422);
            });

            it('Malformed date', async () => {
                response = await restockOrdersAPICalls.addRestockOrder("01/01/2022 10:10", [], -10);
                response.status.should.equal(422);
            });
        });
    });


    describe('Get restock orders', async () => {
        it('get all restock orders', async () => { //it indicates a TEST CASE
            const response = await restockOrdersAPICalls.getRestockOrders();
            response.status.should.equal(200);
        });


        it('get issued restock orders', async () => { //it indicates a TEST CASE
            const response = await restockOrdersAPICalls.getIssuedRestockOrders();

            response.status.should.equal(200);
        });

        it('get restock orders by id', async () => { //it indicates a TEST CASE
            const response = await restockOrdersAPICalls.getRestockOrderById(1);
            response.status.should.equal(200);
        });
    });

    
    describe('Items to be returned in restock order test suite', async () => {
        it('Restock Order in COMPLETEDRETURN state', async () => { 
            const response = await restockOrdersAPICalls.getReturnItemsByRestockOrder(2);

            response.status.should.equal(200);

        });

        it('Restock Order in a state different from COMPLETEDRETURN', async () => { 
                const response = await restockOrdersAPICalls.getReturnItemsByRestockOrder(1);
                
                response.status.should.equal(422);
        });
    });

    //Above tests do work with given inserts
    

    describe('PUT Requests tests to Restock Orders', async () => {
        describe('Modify State of a Restock Order by id', async () => {
            it('Edit restock order state with proper id', async () => {
                let response;
                response = await restockOrdersAPICalls.editRestockOrderState(1, "DELIVERED");
                response.status.should.equal(200);

                response = await restockOrdersAPICalls.getRestockOrderById(1);
                response.data.state.should.equal("DELIVERED");

            });

            it('Edit non-existing Restock Order', async () => {
                let response;
                response = await restockOrdersAPICalls.editRestockOrderState(-1, "DELIVERED");
                response.status.should.equal(404);
            });

            it('Edit Restock Order with improper state', async () => {
                let response;
                response = await restockOrdersAPICalls.editRestockOrderState(-1, 20);
                response.status.should.equal(422);
            });
        });

        describe('Add a list of SKUItems to a Restock Order by id', async () => {
            it('Successfully add a list of SKUItems', async () => {
                const list = [{"SKUId":1, "itemId":1, "rfid":"12345678901234567890123456789016"}];
                
                await restockOrdersAPICalls.editRestockOrderState(1, "DELIVERED");

                await restockOrdersAPICalls.addSKUItemsToRestockOrder(1, list);

                
                let result = await restockOrdersAPICalls.getRestockOrderById(1);

                 result.status.should.equal(200);
            });

            it('State of Restock Order different from DELIVERED', async () => {
                const list = [{"SKUId":1, "itemId":1, "rfid":"12345678901234567890123456789016"}];
                
                await restockOrdersAPICalls.editRestockOrderState(1, "ISSUED");
                let response = await restockOrdersAPICalls.addSKUItemsToRestockOrder(1, list);

                
                response.status.should.equal(422);
            });

            it('Invalid SKUId', async () => {
                const list = [{"SKUId":1, "itemId":1, "rfid":"12345678901234567890123456789016"}];
                
                let response = await restockOrdersAPICalls.addSKUItemsToRestockOrder(100, list);

                
                response.status.should.equal(404);
            });
        });

        describe('Add a transportNote to a Restock Order by id', async () => {
            it('Successfully add a transportNote to a Restock Order', async () => {
                await restockOrdersAPICalls.editRestockOrderState(1, "DELIVERY");

                //const transportNote = {"transportNote" : {"deliveryDate":"2022/03/03"}};
                const transportNote = {"deliveryDate":"2022/03/03"};
                let response = await restockOrdersAPICalls.addTransportNote(1, transportNote);

                response.status.should.equal(200);
            });

            it('Add transportNote to Restock Order with state different from DELIVERY', async () => {
                await restockOrdersAPICalls.editRestockOrderState(1, "ISSUED");
                
                const transportNote = {"deliveryDate":"2022/03/03"};
                let response = await restockOrdersAPICalls.addTransportNote(1, transportNote);

                response.status.should.equal(422);
            });

            it('Add transportNote to Restock Order with issueDate newer than delivery date', async () => {
                await restockOrdersAPICalls.editRestockOrderState(1, "DELIVERY");
                
                const transportNote = {"deliveryDate":"2012/03/03"};
                let response = await restockOrdersAPICalls.addTransportNote(1, transportNote);

                response.status.should.equal(422);
            });
        });
    });

    describe('DELETE Requests tests to Restock Orders', async () => {
        describe('Delete a Restock Order by id', async () => {
            it('Succesfully delete a Restock Order', async () => {
                let response = await restockOrdersAPICalls.deleteRestockOrder(1);
                response.status.should.equal(204);
            })
        });
    });

})

