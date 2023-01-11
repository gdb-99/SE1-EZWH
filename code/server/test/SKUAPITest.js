'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const SkuAPICalls = require('./APICalls/SkuAPICalls');
const DBManager = require('../modules/database/databaseManager');
const PositionAPICalls = require('./APICalls/PositionAPICalls');

const baseURL = "http://localhost:3001";

const dbmanager = new DBManager()
const utilityCalls = new UtilityCalls();
const skuAPICalls = new SkuAPICalls();
const positionAPICalls = new PositionAPICalls();


//(async () => await utilityCalls.dbreset())()

describe('sku test suite', async () => {

    beforeEach(async () => {
        await dbmanager.deleteAllData();
    })
    after(async () => {
        await dbmanager.deleteAllData();
    })

    describe('verify there are no skus at start', async () => {
        it('get skus', async () => { //it indicates a TEST CASE
            const response = await skuAPICalls.getSKUsTest();

            response.status.should.equal(200);
            assert.equal(response.data.length, 0, "response.data" + response.data);
        });
    })


    describe('successfully created a sku', async () => {

        it('add sku', async () => {
            const response1 = await skuAPICalls.addSKUTest("descriptionTest", 10, 20, "noteTest", 10.99, 5);
            response1.status.should.equal(201);

            const response2 = await skuAPICalls.getSKUTest(1);

            assert.equal(response2.data.id, 1)
            assert.equal(response2.data.description, "descriptionTest")
            assert.equal(response2.data.weight, 10)
            assert.equal(response2.data.volume, 20)
            assert.equal(response2.data.notes, "noteTest")
            assert.equal(response2.data.price, 10.99)
            assert.equal(response2.data.availableQuantity, 5)
        });

        const response3 = await skuAPICalls.deleteSKUTest(1);

        response3.status.should.equal(204);

        const response4 = await skuAPICalls.getSKUTest(1);

        assert(response4.status, 404, response4.status);

    });

    describe('successfully deleted a sku', async () => {
        it('add and delete a sku', async () => {
            let response
            response = await skuAPICalls.addSKUTest("descriptionTest", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);

            response = await skuAPICalls.getSKUTest(1);
            assert.equal(response.data.id, 1)

            response = await skuAPICalls.deleteSKUTest(1);
            response.status.should.equal(204);

            response = await skuAPICalls.getSKUTest(1);
            response.status.should.equal(404)
        })
    })

    describe('successfully got a list of skus', async () => {
        it('add some skus and get all', async() => {
            let response
            response = await skuAPICalls.addSKUTest("description1", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);
            response = await skuAPICalls.addSKUTest("description2", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);
            response = await skuAPICalls.addSKUTest("description3", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);

            response = await skuAPICalls.getSKUsTest();
            assert.equal(response.data[0].description, "description1")
            assert.equal(response.data[1].description, "description2")
            assert.equal(response.data[2].description, "description3")

        })
    })

    describe('position test', async () => {

        it('successfully set a position to a sku', async () => {

            const weight = 10;
            const volume = 20;
            const quantity = 5;

            const response1 = await positionAPICalls.addPosition("800234543412", "8002", "3454", "3412", 1000, 1000)
            response1.status.should.equal(201);

            const response2 = await skuAPICalls.addSKUTest("descriptionTest", weight, volume, "noteTest", 10.99, quantity);
            response2.status.should.equal(201);

            const response3 = await skuAPICalls.modifySKUPosition(1, "800234543412");
            response3.status.should.equal(200);

            const response4 = await skuAPICalls.getSKUTest(1);
            assert.equal(response4.data.position, "800234543412")

            const response5 = await positionAPICalls.getPositions();
            response5.status.should.equal(200);
            assert(response5.data[0].occupiedWeight, weight * quantity, response5.data[0].occupiedWeight);
            assert(response5.data[0].occupiedVolume, volume * quantity, response5.data[0].occupiedVolume);


            const response6 = await positionAPICalls.addPosition("800234543413", "8002", "3454", "3413", 1000, 1000)
            response6.status.should.equal(201);
            const response7 = await skuAPICalls.modifySKUPosition(1, "800234543413");
            response7.status.should.equal(200);

            const response8 = await skuAPICalls.getSKUTest(1);
            assert.equal(response8.data.position, "800234543413")

            const response9 = await positionAPICalls.getPositions();
            response5.status.should.equal(200);

            const occupiedWeight1 = response9.data[0].occupiedWeight;
            const occupiedVolume1 = response9.data[0].occupiedVolume;

            const occupiedWeight2 = response9.data[1].occupiedWeight;
            const occupiedVolume2 = response9.data[1].occupiedVolume;

            assert.equal(occupiedWeight1, 0, response9.data[0].occupiedWeight);
            assert.equal(occupiedVolume1, 0, response9.data[0].occupiedVolume);
            assert.equal(occupiedWeight2, weight * quantity, response9.data[1].occupiedWeight);
            assert.equal(occupiedVolume2, volume * quantity, response9.data[1].occupiedVolume);

        })
    })



    describe('some errors', async () => {

        it('search for a not existant sku', async () => {
            const response = await skuAPICalls.getSKUTest(1);
            assert.equal(response.status, 404, response.status);
        })

        it('negative weight in creation', async () => {
            const response = await skuAPICalls.addSKUTest("descriptionTest", -1, 100, "notes", 100, 5);
            assert.equal(response.status, 422, response.status);
        })

        it('negative volume in creation', async () => {
            const response = await skuAPICalls.addSKUTest("descriptionTest", 100, -1, "notes", 100, 5);
            assert.equal(response.status, 422, response.status);
        })

        it('negative price in creation', async () => {
            const response = await skuAPICalls.addSKUTest("descriptionTest", 100, 100, "notes", -1, 5);
            assert.equal(response.status, 422, response.status);
        })

        it('negative quantity in creation', async () => {
            const response = await skuAPICalls.addSKUTest("descriptionTest", 100, 100, "notes", 100, -5);
            assert.equal(response.status, 422, response.status);
        })

        it('an undefined parameter in creation', async () => {
            const response = await skuAPICalls.addSKUTest("descriptionTest", 100, -1, undefined, 100, 5);
            assert.equal(response.status, 422, response.status);
        })

        it('modify a non existant sku', async () => {
            const response = await skuAPICalls.modifySKUTest(1, "descriptionTest", 100, 100, undefined, 100, 5)
            assert.equal(response.status, 404, response.status)

        })

        it('negative parameters in modifySku', async () => {
            const response1 = await skuAPICalls.addSKUTest("descriptionTest", 100, 100, "notes", 100, 5);
            assert.equal(response1.status, 201, response1.status);

            const response2 = await skuAPICalls.modifySKUTest(1, "descriptionTest", -5, 100, undefined, 100, 5)
            assert.equal(response2.status, 422, response1.status);

        })

        it('NaN parameters in modifySku', async () => {
            const response1 = await skuAPICalls.addSKUTest("descriptionTest", 100, 100, "notes", 100, 5);
            assert.equal(response1.status, 201, response1.status);
            const response2 = await skuAPICalls.modifySKUTest(1, "descriptionTest", "NaN", 100, undefined, 100, 5)
            assert.equal(response2.status, 422, response2.status);

        })

        it('too much volume for position', async () => {

            const response1 = await positionAPICalls.addPosition("800234543412", "8002", "3454", "3412", 1000, 1000)
            response1.status.should.equal(201);

            const response2 = await skuAPICalls.addSKUTest("descriptionTest", 10, 20, "noteTest", 10.99, 1000);
            response2.status.should.equal(201);

            const response3 = await skuAPICalls.modifySKUPosition(1, "800234543412");
            response3.status.should.equal(422)

        })

        it('already occupied position', async () => {
            const response1 = await positionAPICalls.addPosition("800234543412", "8002", "3454", "3412", 1000, 1000)
            response1.status.should.equal(201);

            const response2 = await skuAPICalls.addSKUTest("descriptionTest", 10, 20, "noteTest", 10.99, 5);
            response2.status.should.equal(201);
            const response3 = await skuAPICalls.addSKUTest("descriptionTest", 10, 20, "noteTest", 10.99, 5);
            response3.status.should.equal(201);


            const response4 = await skuAPICalls.modifySKUPosition(1, "800234543412");
            response4.status.should.equal(200)
            const response5 = await skuAPICalls.modifySKUPosition(2, "800234543412");
            response5.status.should.equal(422)
        })



    })

});