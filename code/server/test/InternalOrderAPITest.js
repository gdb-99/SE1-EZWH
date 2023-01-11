'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const InternalOrdersAPICalls = require('./APICalls/InternalOrdersAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

//const utilityCalls = new UtilityCalls();
//const databaseManager = new DBManager();
const dbmanager = new DBManager();
const internalOrdersAPICalls = new InternalOrdersAPICalls();

describe('Internal Orders test suite', async () => {



    before(async () => {
        await dbmanager.deleteAllData().then(async () => {
            await dbmanager.insertInternalOrderTestData();
        });
    });
    after(async () => {
        await dbmanager.deleteAllData();
    });

    describe('POST Request test to Internal Orders', async () => {
        describe('Add a new Internal Order tests', async () => {
            let response;
            it('Successfully add a new Internal Order', async () => {
                response = await internalOrdersAPICalls.addInternalOrderTest("2022/02/02 10:10", [], 2);
                response.status.should.equal(201);

                response = await internalOrdersAPICalls.getInternalOrderByIdTest(2);
                response.data.id.should.equal(2);
            });

            it('Negative customerId', async () => {
                response = await internalOrdersAPICalls.addInternalOrderTest("02/02/2022 10:10", [], -5);
                response.status.should.equal(422);
            });

            it('Malformed date', async () => {
                response = await internalOrdersAPICalls.addInternalOrderTest("02/02/2022 10:10", [], -5);
                response.status.should.equal(422);
            });
        });
    });

    describe('GET Request tests to Internal Orders', async () => {
        it('get all internal orders', async () => {
            let response = await internalOrdersAPICalls.getInternalOrdersTest();

            response.status.should.equal(200);
        });

        it('get issued internal orders', async () => {
            let response = await internalOrdersAPICalls.getIssuedInternalOrdersTest();

            response.status.should.equal(200);
        });

        it('get accepted internal orders', async () => {
            let response = await internalOrdersAPICalls.getAcceptedInternalOrdersTest();

            response.status.should.equal(200);
        });

        it('get internal order by id', async () => {
            let response = await internalOrdersAPICalls.getInternalOrderByIdTest(1);

            response.status.should.equal(200);
        });
    });

    describe('PUT Request test to Internal Orders', async () => {
        describe('Edit an existing Internal Order tests', async () => {
            it('Successfully edit an Internal Order', async () => {
                let response;
                response = await internalOrdersAPICalls.editInternalOrderTest(1, "COMPLETED", []);
                response.status.should.equal(200);


                response = await internalOrdersAPICalls.getInternalOrderByIdTest(1);
                response.data.state.should.equal("COMPLETED");
            });

            it('Edit non-existing Internal Order', async () => {
                let response;
                response = await internalOrdersAPICalls.editInternalOrderTest(100, "ACCEPTED", []);
                response.status.should.equal(404);
            });

            it('Edit Internal Order with improper state', async () => {
                let response;
                response = await internalOrdersAPICalls.editInternalOrderTest(1, 20, []);
                response.status.should.equal(422);
            });
        });
    });

    describe('DELETE Request test to Internal Orders', async () => {
        describe('Delete an Internal Order tests', async () => {
            let response;
            it('Successfully delete an Internal Order', async () => {
                response = await internalOrdersAPICalls.deleteInternalOrderTest(1);
                response.status.should.equal(204);
            });

            it('Wrong Internal Order id', async () => {
                response = await internalOrdersAPICalls.deleteInternalOrderTest('id');
                response.status.should.equal(422);
            });
        });
    })

});