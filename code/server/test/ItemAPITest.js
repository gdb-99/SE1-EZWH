'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const ItemAPICalls = require('./APICalls/ItemAPICalls');
const SkuAPICalls = require('./APICalls/SkuAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const skuAPICalls = new SkuAPICalls()
const itemAPICalls = new ItemAPICalls();
const dbmanager = new DBManager();

describe('Items test suite', async () => {

    before(async () => {
        await dbmanager.deleteAllData();
    });
    after(async () => {
        await dbmanager.deleteAllData();
    });

    describe('POST Request test to Items', async () => {
        describe('Add a new Item tests', async () => {
            let response;
            it('Successfully add a new Item', async () => {


                response = await skuAPICalls.getSKUsTest();
                console.log(response.data, "######")


                response = await skuAPICalls.addSKUTest("descriptionTest", 10, 20, "noteTest", 10.99, 5);
                console.log("***********1", response.data)
                response.status.should.equal(201);
                
                response = await skuAPICalls.getSKUsTest();
                console.log(response.data, "*******")


                response = await itemAPICalls.addItemTest(1, "first_item", 9.99, 1, 5);
                console.log("***********2",response.data)

                response.status.should.equal(201);

                response = await itemAPICalls.getItemByIdTest(1, 5);
                console.log("***********3",response.data)
                response.data.id.should.equal(1);
            });

            it('Negative SKUId', async () => {
                response = await itemAPICalls.addItemTest(1, "first_item", 9.99, -1, 5);
                response.status.should.equal(422);
            });

            it('Improper price', async () => {
                response = await itemAPICalls.addItemTest(1, "first_item", "price", 1, 5);
                response.status.should.equal(422);
            });
        });
    });

    describe('Standard Item getters', async () => {
        it('get all items', async () => {
            let response = await itemAPICalls.getItemsTest();
            response.status.should.equal(200);
        });

        it('get item by id', async () => {
            let response = await itemAPICalls.getItemByIdTest(1, 5);


            response.status.should.equal(200);
        });
    });

    describe('PUT Request test to Items', async () => {
        describe('Edit an existing Item tests', async () => {
            it('Successfully edit an Item', async () => {
                let response;
                response = await itemAPICalls.editItemTest(1,5, "newDesc", 10.5);
                response.status.should.equal(200);

                response = await itemAPICalls.getItemByIdTest(1,5);
                assert.equal(response.data.description, "newDesc");
                assert.equal(response.data.price,10.5);
            });

            it('Edit non-existing Item', async () => {
                let response;
                response = await itemAPICalls.editItemTest(24,5, "some_text", 50.00);
                response.status.should.equal(404);
            });

            it('Edit Item with improper price', async () => {
                let response;
                response = await itemAPICalls.editItemTest(1,5, "some_text", "price");
                response.status.should.equal(422);
            });
        });
    });

    describe('DELETE Request test to Items', async () => {
        describe('Delete an Item tests', async () => {
            let response;
            it('Successfully delete an Item', async () => {
                response = await itemAPICalls.deleteItemTest(1,5);
                response.status.should.equal(204);
            });

            it('Wrong Item id', async () => {
                response = await itemAPICalls.deleteItemTest('id',5);
                response.status.should.equal(422);
            });
        });
    });

});