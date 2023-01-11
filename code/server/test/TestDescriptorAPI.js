'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const TestDescriptorAPICalls = require('./APICalls/TestDescriptorAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

const dbmanager = new DBManager()
const utilityCalls = new UtilityCalls();
const testDescriptorAPICalls = new TestDescriptorAPICalls();


describe('Test Descriptor test suite', async () => {
    beforeEach(async () => {
        await dbmanager.deleteAllData().then(async () => {
            await dbmanager.insertTestDescriptorTestData();
        });
    })
    afterEach(async () => {
        await dbmanager.deleteAllData();
    })
    describe('Standard Test Descriptor getters', async () => {
        it('get all test descriptors', async () => { //it indicates a TEST CASE
            const response = await testDescriptorAPICalls.getTestDescriptors();
            response.status.should.equal(200);

        });


        it('get test descriptor by id', async () => { //it indicates a TEST CASE
            const response = await testDescriptorAPICalls.getTestDescriptorById(1);
            response.status.should.equal(200);
            response.data.name.should.equal("test descriptor 1");
            response.data.procedureDescription.should.equal("description");
            response.data.idSKU.should.equal(1);   
        });
    });


    describe('POST Requests tests to Test Descriptor', async () => {
        describe('Add a new Test Descriptor tests', async() => {
            it('Succesfully add a new Test Descriptor', async () => {
                let response = await testDescriptorAPICalls.addTestDescriptor("test1", "descrizione test", 1);
                response.status.should.equal(201);
                response = await testDescriptorAPICalls.getTestDescriptorById(2);
                response.data.id.should.equal(2);
                response.data.name.should.equal("test1");
                response.data.procedureDescription.should.equal("descrizione test");
                response.data.idSKU.should.equal(1);    

            });
            
            it('Test Descriptor not added, no sku associated idSKU ', async () => {
                let response = await testDescriptorAPICalls.addTestDescriptor("test1", "descrizione test", 1234);
                response.status.should.equal(404);
            });
            
            it('Test Descriptor not added, validation of request body failed ', async () => {
                let response = await testDescriptorAPICalls.addTestDescriptor("test1", "descrizione test", "ciao");
                response.status.should.equal(422);
            });
        });
    });

    describe('PUT Requests tests to Test Descriptor', async () => {
        describe('Edit a Test Descriptor tests', async() => {
            it('Succesfully edit Test Descriptor', async () => {
                let response = await testDescriptorAPICalls.editTestDescriptor(1, "test1", "descrizione test2", 2);
                response.status.should.equal(200);
                response = await testDescriptorAPICalls.getTestDescriptorById(1);
                response.data.id.should.equal(1);
                response.data.name.should.equal("test1");
                response.data.procedureDescription.should.equal("descrizione test2");
                response.data.idSKU.should.equal(2);         
            });
            
            it('Test Descriptor not edited, no test descriptor associated to id ', async () => {
                const response = await testDescriptorAPICalls.editTestDescriptor(10, "test1", "descrizione test2", 2);
                response.status.should.equal(404);
            });
            
            it('Test Descriptor not edited, validation of request body failed because of string id', async () => {
                const response = await testDescriptorAPICalls.editTestDescriptor(1, "test1", "descrizione test2", "ciao");
                response.status.should.equal(422);  
            });
        });
    });

    describe('DELETE Requests tests to Test Descriptor', async () => {
        describe('Delete a Test Descriptor tests', async() => {
            it('Succesfully delete a Test Descriptor', async () => {
                const response = await testDescriptorAPICalls.deleteTestDescriptor(1);
                response.status.should.equal(204);
            });
            
            it('Test Descriptor not deleted, validation of id failed ', async () => {
                const response = await testDescriptorAPICalls.deleteTestDescriptor("gatto");
                response.status.should.equal(422);
            }); 

        });
    });


});