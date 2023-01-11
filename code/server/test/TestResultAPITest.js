'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const TestResultAPICalls = require('./APICalls/TestResultAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

const dbmanager = new DBManager()
const utilityCalls = new UtilityCalls();
const testResultAPICalls = new TestResultAPICalls();


describe('Test Result test suite', async () => {
    beforeEach(async () => {
        await dbmanager.deleteAllData().then(async () => {
            await dbmanager.insertTestResultTestData();
        });
    })
    afterEach(async () => {
        await dbmanager.deleteAllData();
    })
    describe('Standard Test Result getters', async () => {
        it('Succesfully get all test results', async () => { //it indicates a TEST CASE
            const response = await testResultAPICalls.getTestResults("12345678901234567890123456789016");
            response.status.should.equal(200);

        });

        it('Unsuccesfully get all test results, no sku item associated rfid ', async () => {
            const response = await testResultAPICalls.getTestResults("12345678901234567890123456789015");
                response.status.should.equal(404);
            
            });

        it('Unsuccesfully get all test results, validation of rfid failed', async () => {
            const response = await testResultAPICalls.getTestResults(7);
                response.status.should.equal(422);
            });
        
        it('Succesfully get a test result ', async () => { //it indicates a TEST CASE
            const response = await testResultAPICalls.getTestResultById("12345678901234567890123456789016",1);
            response.status.should.equal(200);    
            response.data.id.should.equal(1);
            response.data.idTestDescriptor.should.equal(1);
            response.data.RFID.should.equal("12345678901234567890123456789016");
            response.data.Date.should.equal("2022/01/02 10:10");  
            response.data.Result.should.equal(1);
        });

        it('Unsuccesfully get a test results, no sku item associated rfid ', async () => {
            const response = await testResultAPICalls.getTestResultById("12345678901234567890123456789017",1);
            response.status.should.equal(404);  
            });

        it('Unsuccesfully get a test results, validation of rfid failed', async () => {
                let response = await testResultAPICalls.getTestResultById(1,1);
                response.status.should.equal(422);
            });
        
    });


    describe('POST Requests tests to Test Result', async () => {
        describe('Add a new Test result tests', async() => {
            it('Succesfully add a new Test result', async () => {
                let response = await testResultAPICalls.addTestResult("12345678901234567890123456789016", 2, "2021/11/28 11:10", true);
                response.status.should.equal(201);
                response = await testResultAPICalls.getTestResultById("12345678901234567890123456789016",2);
                response.status.should.equal(200);    
                response.data.id.should.equal(2);
                response.data.idTestDescriptor.should.equal(2);
                response.data.RFID.should.equal("12345678901234567890123456789016");
                response.data.Date.should.equal("2021/11/28 11:10");  
                response.data.Result.should.equal(1);
            });
            
            it('Test Result not added, no sku item associated to rfid ', async () => {
                let response = await testResultAPICalls.addTestResult("12345678901234567890123456789015", 1, "2021/11/28 11:10", true);
                response.status.should.equal(404);
            });

            it('Test Result not added, validation of request body failed ', async () => {
                let response = await testResultAPICalls.addTestResult(1, 1, "2021/11/28 11:10", true);
                response.status.should.equal(422);
            });
            

        });
    });

    describe('PUT Requests tests to Test Result', async () => {
        describe('Edit a Test Result tests', async() => {
            it('Succesfully edit Test Resut', async () => {
                let response = await testResultAPICalls.editTestResult("12345678901234567890123456789016", 1, 1, "2019/11/28 11:11", false);
                response.status.should.equal(200);
                response = await testResultAPICalls.getTestResultById("12345678901234567890123456789016",1);
                response.status.should.equal(200);    
                response.data.id.should.equal(1);
                response.data.idTestDescriptor.should.equal(1);
                response.data.RFID.should.equal("12345678901234567890123456789016");
                response.data.Date.should.equal("2019/11/28 11:11");  
                response.data.Result.should.equal(0);
            });
            
            it('Test Result not edited, no sku item associated to rfid ', async () => {
                let response = await  testResultAPICalls.editTestResult("12345678901234567890123456789015", 1, "nuova desc", "2021/11/28", false);
                response.status.should.equal(404);
            });

            it('Test Result not edited, validation of request body failed because of wrong rfid', async () => {
                let response = await  testResultAPICalls.editTestResult("gatto", 1, "nuova desc", "2021/11/28", false);
                response.status.should.equal(422);
            });
            
        });
    });

    describe('DELETE Requests tests to Test Result', async () => {
        describe('Delete a Test Result tests', async() => {
            it('Succesfully delete a Test Descriptor', async () => {
                const response = await testResultAPICalls.deleteTestResult("12345678901234567890123456789016", 1);
                response.status.should.equal(204);
            });
            
            it('Test Result not deleted, validation of id failed ', async () => {
                let response = await testResultAPICalls.deleteTestResult("gatto", 1);
                response.status.should.equal(422);
            }); 

        });
    });


});