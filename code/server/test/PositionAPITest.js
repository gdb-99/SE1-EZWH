'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const PositionAPICalls = require('./APICalls/PositionAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

const dbmanager = new DBManager()
const utilityCalls = new UtilityCalls();
const positionAPICalls = new PositionAPICalls();

describe('position test suite', async () => {

    beforeEach(async () => {
        await dbmanager.deleteAllData();
    })
    after(async () => {
        await dbmanager.deleteAllData();
    })

    describe('verify if there are no positions', async () => {
        it('get positions', async () => { //it indicates a TEST CASE
            const response = await positionAPICalls.getPositions()

            response.status.should.equal(200);
            assert.equal(response.data.length, 0, "response.data" + response.data);
        });
    })

    describe('successfullty created a position', async () => {
        it('create ande get position ', async () => { //it indicates a TEST CASE
            const response1 = await positionAPICalls.addPosition("800234543412", "8002",
                "3454", "3412", 1000, 1000)
            response1.status.should.equal(201);

            const response2 = await positionAPICalls.getPositions()
            response2.status.should.equal(200);
            assert.equal(response2.data.length, 1, "response.data" + response2.data);
        });
    })

    describe('successfullty got a list of positions', async () => {
        it('create and get position ', async () => { //it indicates a TEST CASE
            let response;
            response = await positionAPICalls.addPosition("800234543412", "8002",
                "3454", "3412", 1000, 1000)
            response.status.should.equal(201);

            response = await positionAPICalls.addPosition("800234543413", "8002",
                "3454", "3413", 1000, 1000)
            response.status.should.equal(201);

            response = await positionAPICalls.addPosition("800234543414", "8002",
                "3454", "3414", 1000, 1000)
            response.status.should.equal(201);

            response = await positionAPICalls.getPositions()
            response.status.should.equal(200);
            
            assert.equal(response.data[0].positionID, "800234543412")
            assert.equal(response.data[1].positionID, "800234543413")
            assert.equal(response.data[2].positionID, "800234543414")




        });
    })


    describe('succeffully edited a position', async () => {
        it('create', async () => { //it indicates a TEST CASE
            const response1 = await positionAPICalls.addPosition("800234543412", "8002", "3454", "3412", 1000, 1000)
            response1.status.should.equal(201);

            const response2 = await positionAPICalls.modifyPosition("800234543412", "8002", "3454", "3412", 2000, 2000, 100, 100)
            response2.status.should.equal(200);

            const response3 = await positionAPICalls.changePositionID("800234543412", "800234543413")
            response3.status.should.equal(200);

            const response4 = await positionAPICalls.getPositions()
            response4.status.should.equal(200);
            assert.equal(response4.data.length, 1, "response.data" + response4.data);
        });
    });

    describe('successfully deleted a position', async () => {
        it('create, delete, verify ', async () => { //it indicates a TEST CASE
            const response1 = await positionAPICalls.addPosition("800234543412", "8002", "3454", "3412", 1000, 1000)
            response1.status.should.equal(201);

            const response2 = await positionAPICalls.deletePosition("800234543412")
            response2.status.should.equal(204);

            const response3 = await positionAPICalls.getPositions()
            response3.status.should.equal(200);
            assert.equal(response3.data.length, 0, "response.data" + response3.data);
        });
    });

    describe('some errors', async () => {
        it('there is no correspondence between the position parameters ', async () => {
            const response = await positionAPICalls.addPosition("123456789012", "1234", "5678", "9013", 1000, 1000)
            response.status.should.equal(422);
        })

        it('negative maxWeight', async () => {
            const response = await positionAPICalls.addPosition("123456789012", "1234", "5678", "9012", -50, 1000)
            response.status.should.equal(422);
        })

        it('negative maxVolume', async () => {
            const response = await positionAPICalls.addPosition("123456789012", "1234", "5678", "9012", 1000, -50)
            response.status.should.equal(422);
        })



    })


})