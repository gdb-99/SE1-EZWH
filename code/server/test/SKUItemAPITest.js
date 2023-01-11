'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const SKUItemAPICalls = require('./APICalls/SKUItemAPICalls');
const DBManager = require('../modules/database/databaseManager');
const SkuAPICalls = require('./APICalls/SkuAPICalls');

const baseURL = "http://localhost:3001";

const utilityCalls = new UtilityCalls();
const skuitemAPICalls = new SKUItemAPICalls();
const skuAPICalls = new SkuAPICalls();
const dbmanager = new DBManager();


describe('skuitem test suite', async () => {

    beforeEach(async () => {
        await dbmanager.deleteAllData();
    })
    after(async () => {
        await dbmanager.deleteAllData();
    })

    let response;
    describe('successfully added a skuitem', async () => {
        it('add skuitem', async () => { //it indicates a TEST CASE

            response = await skuAPICalls.addSKUTest("description1", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);

            response = await skuAPICalls.addSKUTest("description2", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);

            response = await skuAPICalls.addSKUTest("description3", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789015", 1, "2021/11/20 12:30");
            response.status.should.equal(201);

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789016", 1, "2021/11/21 12:30");
            response.status.should.equal(201);

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789017", 2, "2021/11/22 12:30");
            response.status.should.equal(201);

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789018", 3, "2021/11/23 12:30");
            response.status.should.equal(201);


            response = await skuitemAPICalls.getSKUItems()

            response.status.should.equal(200);
            assert.equal(response.data.length, 4, "response.data" + response.data);
        });

        it('get skuitems by skuid', async () => { //it indicates a TEST CASE

            response = await skuAPICalls.addSKUTest("description1", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789015", 1, "2021/11/20 12:30");
            response.status.should.equal(201);
            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789016", 1, "2021/11/20 12:30");
            response.status.should.equal(201);

            response = await skuitemAPICalls.getSKUItemsBySKUId(1)//skuid da aggiungere
            response.status.should.equal(200);

            console.log(response.data)
            assert.equal(response.data.length, 0, "response.data" + response.data);
        });

        it('get skuitem by rfid', async () => { //it indicates a TEST CASE
            response = await skuAPICalls.addSKUTest("description1", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789015", 1, "2021/11/20 12:30");
            response.status.should.equal(201);

            response = await skuitemAPICalls.getSKUItemByRFID("12345678901234567890123456789015")//rfid da aggiungere
            response.status.should.equal(200);
            assert.equal(response.data.RFID, "12345678901234567890123456789015", "response.data" + response.data);
        });

    })

    describe('successfully edited a skuitem', async () => {

        it('modify skuitem', async () => { //it indicates a TEST CASE
            response = await skuAPICalls.addSKUTest("description1", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789015", 1, "2021/11/20 12:30");
            response.status.should.equal(201);

            response = await skuitemAPICalls.modifySKUItemRFID("12345678901234567890123456789015",
                "12345678901234567890123456789019", 1, "2021/11/30 12:30")

            response.status.should.equal(200);

            response = await skuitemAPICalls.getSKUItemByRFID("12345678901234567890123456789019")//rfid da aggiungere

            response.status.should.equal(200);
            assert.equal(response.data.RFID, "12345678901234567890123456789019", "response.data" + response.data);
        });

    })

    describe('successfully deleted an skuitem', async () => {

        it('delete skuitem', async () => { //it indicates a TEST CASE
            response = await skuAPICalls.addSKUTest("description1", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201);

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789015", 1, "2021/11/20 12:30");
            response.status.should.equal(201);

            response = await skuitemAPICalls.deleteSKUItem("12345678901234567890123456789015")
            response.status.should.equal(204);


            response = await skuitemAPICalls.getSKUItems()
            response.status.should.equal(200);
            assert.equal(response.data.length, 0, "response.data" + response.data);
        });

    })

    describe('some errors', async () => {
        let response;
        it('get non existant skuitem', async () => {
            response = await skuitemAPICalls.getSKUItemByRFID("12345678901234567890123456789018")
            response.status.should.equal(404)
        })
        it('invalid rfid in get', async () => {
            response = await skuitemAPICalls.getSKUItemByRFID("123456789012345678901234567890")
            response.status.should.equal(422)
        })
        it('undefined rfid in get', async () => {
            response = await skuitemAPICalls.getSKUItemByRFID()
            response.status.should.equal(422)
        })
        it('get skuitems of non existing skuitem', async () => {
            response = await skuitemAPICalls.getSKUItemsBySKUId(1)
            response.status.should.equal(404)
        })

        it('create skuitem with wrong rfid', async () => {

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789", 1, "2020/01/01")
            response.status.should.equal(422)
        })

        it('create skuitem with wrong date', async () => {

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789019", 1, "20/01/2001")
            response.status.should.equal(422)
        })

        it('create skuitem with a non existant skuId (this is the last check before creation)', async () => {

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789019", 1, "2020/01/01")
            response.status.should.equal(404)
        })

        it('edit non existant skuitem', async () => {
            response = await skuitemAPICalls.modifySKUItemRFID("12345678901234567890123456789019",
                "12345678901234567890123456789018", 1, "2020/01/01")
            response.status.should.equal(404)
        })

        it('edit skuitem with wrong rfid', async () => {
            response = await skuAPICalls.addSKUTest("description1", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201)

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789015", 1, "2021/11/20 12:30");
            response.status.should.equal(201)

            response = await skuitemAPICalls.modifySKUItemRFID("12345678901234567890123456789015",
                "1234567890123456789012345", 1, "2020/01/01")
            response.status.should.equal(422)
        })

        it('edit skuitem with wrong date', async () => {
            response = await skuAPICalls.addSKUTest("description1", 10, 20, "noteTest", 10.99, 5);
            response.status.should.equal(201)

            response = await skuitemAPICalls.addSKUItem("12345678901234567890123456789015", 1, "2021/11/20 12:30");
            response.status.should.equal(201)

            response = await skuitemAPICalls.modifySKUItemRFID("12345678901234567890123456789015",
                "12345678901234567890123456789016", 1, "20/01/2001")
            response.status.should.equal(422)
        })



    })



})