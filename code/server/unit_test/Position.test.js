'use strict';

const { expect, assert } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const positionController = controller.getPositionController();
const dbManager = controller.getDBManager();


beforeEach(async () => {
    //console.log("executed before rest")
    await dbManager.deleteAllData();
});

afterEach(async () => {
    //console.log("executed after rest");
    await dbManager.deleteAllData();
});

describe('PositionController Tests', () => {
    describe('getAllPositions method test suite', () => {

        test('successfully use of getAllPositions', async () => {
            const results = await positionController.getAllPositions();
            assert.equal(results.length, 0);
        })

    })

    describe('createPosition method test suite', () => {

        test('successfully use of createPosition', async () => {
            await positionController.createPosition({
                positionID: "123456789012",
                aisleID: "1234",
                row: "5678",
                col: "9012",
                maxWeight: 100,
                maxVolume: 100,
            })
            const results = await positionController.getAllPositions();
            assert.equal(results.length, 1);

        })

        test('attempt of createPosition with invalid PositionID', async () => {
            let errorValue
            await positionController.createPosition({
                positionID: "hello",
                aisleID: "1234",
                row: "5678",
                col: "9012",
                maxWeight: 100,
                maxVolume: 100,
            }).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422);

        })

        test('attempt of createPosition with incompatible position codes', async () => {
            let errorValue
            await positionController.createPosition({
                positionID: "123456789012",
                aisleID: "0000",
                row: "0000",
                col: "0000",
                maxWeight: 100,
                maxVolume: 100,
            }).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422);

        })

        test('attempt of createPosition with an undefined parameter', async () => {
            let errorValue
            await positionController.createPosition({
                positionID: "123456789012",
                aisleID: "1234",
                row: "5678",
                col: "9012",
                maxWeight: undefined,
                maxVolume: 100,
            }).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422);

        })

        test('attempt of createPosition with negative weight', async () => {
            let errorValue
            await positionController.createPosition({
                positionID: "123456789012",
                aisleID: "1234",
                row: "5678",
                col: "9012",
                maxWeight: -100,
                maxVolume: 100,
            }).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422);

        })

        test('attempt of createPosition with negative volume', async () => {
            let errorValue
            await positionController.createPosition({
                positionID: "123456789012",
                aisleID: "1234",
                row: "5678",
                col: "9012",
                maxWeight: 100,
                maxVolume: -100,
            }).catch(err => errorValue = err);
            assert.equal(errorValue.code, 422);

        })

    })

    describe('editPositionVer1 method test suite', () => {

        test('successful use of editPositionVer1', async () => {
            await positionController.createPosition({
                positionID: "123456789012",
                aisleID: "1234",
                row: "5678",
                col: "9012",
                maxWeight: 100,
                maxVolume: 100,
            })

            await positionController.editPositionVer1("123456789012",
                {
                    newAisleID: "9999",
                    newRow: "5678",
                    newCol: "9012",
                    newMaxWeight: 100,
                    newMaxVolume: 100,
                    newOccupiedWeight: 100,
                    newOccupiedVolume: 100,
                })
            const results = await positionController.getAllPositions();
            assert.equal(results.length, 1);
            assert.equal(results[0].positionID, "999956789012")
        })

        test('attempt of editPositionVer1 with an invalid positionID', async () => {
            let errorValue;
            await positionController.editPositionVer1("hello",
                {
                    newAisleID: "9999",
                    newRow: "5678",
                    newCol: "9012",
                    newMaxWeight: 100,
                    newMaxVolume: 100,
                    newOccupiedWeight: 100,
                    newOccupiedVolume: 100,
                }).catch(err => errorValue = err)
            assert.equal(errorValue.code, 422);
        })

        test('attempt of editPositionVer1 with non-existant position', async () => {

            let errorValue;
            await positionController.editPositionVer1("123456789012",
                {
                    newAisleID: "9999",
                    newRow: "5678",
                    newCol: "9012",
                    newMaxWeight: 100,
                    newMaxVolume: 100,
                    newOccupiedWeight: 100,
                    newOccupiedVolume: 100,
                }).catch(err => errorValue = err)
            assert.equal(errorValue.code, 404);
        })

        test('attempt of editPositionVer1 with invalid position codes', async () => {
            let errorValue;
            await positionController.editPositionVer1("123456789012",
                {
                    newAisleID: "hello",
                    newRow: "5678",
                    newCol: "9012",
                    newMaxWeight: 100,
                    newMaxVolume: 100,
                    newOccupiedWeight: 100,
                    newOccupiedVolume: 100,
                }).catch(err => errorValue = err)
            assert.equal(errorValue.code, 422);
        })

        test('attempt of editPositionVer1 with negative weight', async () => {
            let errorValue;
            await positionController.editPositionVer1("123456789012",
                {
                    newAisleID: "hello",
                    newRow: "5678",
                    newCol: "9012",
                    newMaxWeight: -100,
                    newMaxVolume: 100,
                    newOccupiedWeight: 100,
                    newOccupiedVolume: 100,
                }).catch(err => errorValue = err)
            assert.equal(errorValue.code, 422);
        })

        test('attempt of editPositionVer1 with negative volume', async () => {
            let errorValue;
            await positionController.editPositionVer1("123456789012",
                {
                    newAisleID: "hello",
                    newRow: "5678",
                    newCol: "9012",
                    newMaxWeight: 100,
                    newMaxVolume: -100,
                    newOccupiedWeight: 100,
                    newOccupiedVolume: 100,
                }).catch(err => errorValue = err)
            assert.equal(errorValue.code, 422);
        })

        test('attempt of editPositionVer1 with negative occupiedWeight', async () => {
            let errorValue;
            await positionController.editPositionVer1("123456789012",
                {
                    newAisleID: "hello",
                    newRow: "5678",
                    newCol: "9012",
                    newMaxWeight: 100,
                    newMaxVolume: -100,
                    newOccupiedWeight: -100,
                    newOccupiedVolume: 100,
                }).catch(err => errorValue = err)
            assert.equal(errorValue.code, 422);
        })
        
        test('attempt of editPositionVer1 with negative occupiedVolume', async () => {
            let errorValue;
            await positionController.editPositionVer1("123456789012",
                {
                    newAisleID: "hello",
                    newRow: "5678",
                    newCol: "9012",
                    newMaxWeight: 100,
                    newMaxVolume: 100,
                    newOccupiedWeight: 100,
                    newOccupiedVolume: -100,
                }).catch(err => errorValue = err)
            assert.equal(errorValue.code, 422);
        })
    })

    describe('editPositionVer2 method test suite', () => {

        test('successful use of editPositionVer2', async () => {
            await positionController.createPosition({
                positionID: "123456789012",
                aisleID: "1234",
                row: "5678",
                col: "9012",
                maxWeight: 100,
                maxVolume: 100,
            })
            await positionController.editPositionVer2("123456789012",
                { newPositionID: "123456789013" })
            const results = await positionController.getAllPositions();
            assert.equal(results.length, 1);
            assert.equal(results[0].positionID, "123456789013")
        })

        test('attempt of editPositionVer2 with a non-existant position', async () => {
            let errorValue;
            await positionController.editPositionVer2("123456789012",
                { newPositionID: "123456789013" })
                .catch(err => errorValue = err)
            assert.equal(errorValue.code, 404)
        })

        test('attempt of editPositionVer2 with an invalid oldPositionID', async () => {
            let errorValue;
            await positionController.editPositionVer2("hello",
                { newPositionID: "123456789013" })
                .catch(err => errorValue = err)
            assert.equal(errorValue.code, 422)
        })

        test('attempt of editPositionVer2 with an invalid newPositionID', async () => {
            let errorValue;
            await positionController.editPositionVer2("123456789012",
                { newPositionID: "hello" })
                .catch(err => errorValue = err)
            assert.equal(errorValue.code, 422)
        })

    })

    describe('deletePosition method test suite', () => {

        test('successful use of deletePosition', async () => {
            let results;
            await positionController.createPosition({
                positionID: "123456789012",
                aisleID: "1234",
                row: "5678",
                col: "9012",
                maxWeight: 100,
                maxVolume: 100,
            })
            results = await positionController.getAllPositions();
            assert.equal(results.length, 1);
            await positionController.deletePosition("123456789012")
            results = await positionController.getAllPositions();
            assert.equal(results.length, 0);

        })

        test('attempt of deletePosition with invalid positionId', async () => {
            let errorValue;
            await positionController.deletePosition("hello")
                .catch(err => errorValue = err);
            assert.equal(errorValue.code, 422);

        })

    })

    describe('checkPositionID method test suite', () => {

        test('successful use of checkPositionID', async () => {
            const result = positionController.checkPositionID("123456789012",
                "1234", "5678", "9012")

            assert.equal(result, true);

        })

        test('attempt of checkPositionID with invalid PositionID', async () => {
            const result = positionController.checkPositionID("hello",
                "1234", "5678", "9012")

            assert.equal(result, false);
        })

        test('attempt of checkPositionID with invalid aisleID', async () => {
            const result = positionController.checkPositionID("123456789012",
                "hello", "5678", "9012")

            assert.equal(result, false);
        })

        test('attempt of checkPositionID with invalid row', async () => {
            const result = positionController.checkPositionID("123456789012",
                "1234", "hello", "9012")

            assert.equal(result, false);
        })

        test('attempt of checkPositionID with invalid col', async () => {
            const result = positionController.checkPositionID("123456789012",
                "1234", "5678", "hello")

            assert.equal(result, false);
        })

        test('attempt of checkPositionID with incompatible codes', async () => {
            const result = positionController.checkPositionID("123456789012",
                "0000", "0000", "0000")

            assert.equal(result, false);
        })

    })
});





