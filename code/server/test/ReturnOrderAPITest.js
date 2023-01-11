'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const UtilityCalls = require('./APICalls/UtilityCalls');
const ReturnOrdersAPICalls = require('./APICalls/ReturnOrdersAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

//const utilityCalls = new UtilityCalls();
const databaseManager = new DBManager();
const returnOrdersAPICalls = new ReturnOrdersAPICalls();

describe('Return Orders Tests', async () => {
    beforeEach(async () => {
        await databaseManager.deleteAllData().then(async () => {
            await databaseManager.insertRestockAndReturnOrderTestData();
        });
      });

    after(async () => {
        await databaseManager.deleteAllData();
    })

    describe('Create Return Orders Tests', async () => {
        it('Succesfullly create a Return Order', async () => {
            const products = [{"SKUId":1, "itemId":1, "description":"return description", 
                               "price":20, "RFID":"12345678901234567890123456789016"
                             }];
            
            let response = await returnOrdersAPICalls.createReturnOrder("2022/02/02", products, 1);
            response.status.should.equal(201);
        });

        it('New Return Order with non-existing restockOrderId', async () => {
            const products = [{"SKUId":1, "itemId":1, "description":"return description", 
                               "price":20, "RFID":"12345678901234567890123456789016"
                             }];
            
            let response = await returnOrdersAPICalls.createReturnOrder("2022/02/02", products, 100);
            response.status.should.equal(404);
        });

        it('New Return Order with malformed date', async () => {
            const products = [{"SKUId":1, "itemId":1, "description":"return description", 
                               "price":20, "RFID":"12345678901234567890123456789016"
                             }];
            
            let response = await returnOrdersAPICalls.createReturnOrder("123/456/7", products, 100);
            response.status.should.equal(422);
        });
    });

    describe('Get Return Orders Tests', async () => {
        describe('All Return Orders', async () => {
            it('Get all Return Orders test', async () => {
                let response = await returnOrdersAPICalls.getReturnOrders();
                response.status.should.equal(200);
            });
        });

        describe('Return Orders by Id', async () => {
            it('Successfully get a Return Order by Id', async () => {
                let response = await returnOrdersAPICalls.getReturnOrderById(1);
                response.status.should.equal(200);
                response.data.id.should.equal(1);
            });

            it('Get a non-existing Return Order', async () => {
                let response = await returnOrdersAPICalls.getReturnOrderById(100);
                response.status.should.equal(404);
            });

            it('Non-numeric id test', async () => {
                let response = await returnOrdersAPICalls.getReturnOrderById("test-malformed-id");
                response.status.should.equal(422);
            });
        });
    });

    

    describe('Delete Return Orders Tests', async () => {
        it('Successfully delete a Return Order', async () => {
            let response = await returnOrdersAPICalls.deleteReturnOrderById(1);
            response.status.should.equal(204);
        });

        it('Delete non-existing Return Order', async () => {
            let response = await returnOrdersAPICalls.deleteReturnOrderById(100);
            response.status.should.equal(204);
        });
    });
})