'use strict';

const { expect, assert } = require('chai');
const Controller = require('../modules/logic/controller');
const TestResultController = require('../modules/logic/testResultController');

const controller = new Controller();
const testResultController = controller.getTestResultController();
const dbManager = controller.getDBManager();

beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        //await dbManager.insertTestResultTestData();
    })
});

afterEach(async () => {
    await dbManager.deleteAllData();
});

describe("TestResultController Tests", () => {
    describe("getTestResults method testing", () => {
        let response, errorValue;
        test("successful use of getTestResults", async () => {

            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: false,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResults("12345678901234567890123456789015")

            assert.equal(response.length, 2)

        });

        test("attempt of getTestResults with an undefined parameter", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: false,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResults(undefined)
                .catch(err => errorValue = err);

            assert.equal(errorValue.code, 422)
        });

        test("attempt of getTestResults with an invalid parameter", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: false,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResults("hello")
                .catch(err => errorValue = err);

            assert.equal(errorValue.code, 422)
        });


        test("attempt of getTestResults with a non-existant rfid", async () => {
            response = await testResultController.getTestResults("12345678901234567890123456789015")
                .catch(err => errorValue = err);

            assert.equal(errorValue.code, 404)
        });



    });

    describe("getTestResult method testing", () => {
        let response, errorValue;
        test("successful use of getTestResult", async () => {

            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: false,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResult("12345678901234567890123456789015", 1)

            assert.equal(response.Result, true)

        });

        test("attempt of getTestResults with an undefined parameter", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: false,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResult(undefined, 1)
                .catch(err => errorValue = err);

            assert.equal(errorValue.code, 422)
        });

        test("attempt of getTestResult with an invalid parameter", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: false,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResult("hello", 1)
                .catch(err => errorValue = err);

            assert.equal(errorValue.code, 422)
        });


        test("attempt of getTestResults with a non-existant testResult", async () => {
            response = await testResultController.getTestResult("12345678901234567890123456789015", 1)
                .catch(err => errorValue = err);

            assert.equal(errorValue.code, 404)
        });
    });

    describe("createTestResult method testing", () => {
        let response, errorValue;
        test("Successful use of createTestResult", async () => {


            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResult("12345678901234567890123456789015", 1)

            assert.equal(response.Result, true);


        });

        test("attempt of createTestResult with a non-existant test descriptor", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            })
                .catch(err => errorValue = err)

            assert.equal(errorValue.code, 404);
        });

        test("attempt of createTestResult with a non-existant skuitem", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(err => errorValue = err)

            assert.equal(errorValue.code, 404);
        });

        test("attempt of createTestResult with an undefined parameter", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: undefined,
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(err => errorValue = err)

            assert.equal(errorValue.code, 422);
        });

        test("attempt of createTestResult with an invalid parameter", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "hello",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(err => errorValue = err)

            assert.equal(errorValue.code, 422);
        });

        test("attempt of createTestResult with an invalid date", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "hello",
                Result: true,
            }).catch(err => errorValue = err)

            assert.equal(errorValue.code, 422);
        });
    });

    describe("editTestResult method testing", () => {
        let response, errorValue;
        test("successful use of editTestResult", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.editTestResult("12345678901234567890123456789015", 1, {
                "newIdTestDescriptor": 2,
                "newDate": "2021/11/28",
                "newResult": false
            })

            response = await testResultController.getTestResult("12345678901234567890123456789015", 1)

            assert.equal(response.Result, false);

        });

        test("attempt of editTestResult with an undefined parameter", async() => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.editTestResult(undefined, 1, {
                "newIdTestDescriptor": 2,
                "newDate": "2021/11/28",
                "newResult": false
            })
            .catch(err => errorValue = err);

            assert.equal(errorValue.code, 422)

        });

        test("attempt of editTestResult with an invalid parameter", async() => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.editTestResult("hello", 1, {
                "newIdTestDescriptor": 2,
                "newDate": "2021/11/28",
                "newResult": false
            })
            .catch(err => errorValue = err);

            assert.equal(errorValue.code, 422)
        });

        test("attempt of editTestResult with a non-existant testDescriptor", async() => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.editTestResult("12345678901234567890123456789015", 1, {
                "newIdTestDescriptor": 10,
                "newDate": "2021/11/28",
                "newResult": false
            })
            .catch(err => errorValue = err);

            assert.equal(errorValue.code, 404)
        });

        test("attempt of editTestResult with a non-existant testResult", async() => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.editTestResult("12345678901234567890123456789015", 2, {
                "newIdTestDescriptor": 2,
                "newDate": "2021/11/28",
                "newResult": false
            })
            .catch(err => errorValue = err);

            assert.equal(errorValue.code, 404)
        });

        test("attempt of editTestResult with a non-existant skuitem", async() => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            await testResultController.editTestResult("12345678901234567890123456789016", 1, {
                "newIdTestDescriptor": 2,
                "newDate": "2021/11/28",
                "newResult": false
            })
            .catch(err => errorValue = err);

            assert.equal(errorValue.code, 404)
        });
    });

    describe("deleteTestResult method testing", () => {
        let response, errorValue;
        test("successful use of deleteTestResult", async () => {

            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResult("12345678901234567890123456789015", 1)

            assert.equal(response.Result, true);

            response = await testResultController.deleteTestResult("12345678901234567890123456789015", 1)

            await testResultController.getTestResult("12345678901234567890123456789015", 1)
                .catch(err => errorValue = err)

            assert.equal(errorValue.code, 404);

        });

        test("attempt of deleteTestResult with an undefined parameter", async () => {

            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResult("12345678901234567890123456789015", 1)

            assert.equal(response.Result, true);

            await testResultController.deleteTestResult(undefined, 1)
                .catch(err => errorValue = err)

            assert.equal(errorValue.code, 422)

        });

        test("attempt of deleteTestResult with an invalid parameter", async () => {
            await dbManager.genericSqlRun(`INSERT INTO SKU ( weight, volume, price, notes, description, availableQuantity)
            VALUES ( 10, 20, 10.99, "noteTest", "description1" , 5 );`)
                .catch(() => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO SKUItem (RFID, SKUId, Available, DateOfStock) 
            VALUES ("12345678901234567890123456789015", 1, 1, "2021/11/20 12:30");`)
                .catch((error) => { throw error });

            await dbManager.genericSqlRun(`INSERT INTO TestDescriptor ( name, procedureDescription, idSKU) 
            VALUES ("test1", "procedureDescriptionTest", 1);`)
                .catch((error) => { throw error })


            await testResultController.createTestResult({
                rfid: "12345678901234567890123456789015",
                idTestDescriptor: 1,
                Date: "2020/01/01",
                Result: true,
            }).catch(error => console.log(error))

            response = await testResultController.getTestResult("12345678901234567890123456789015", 1)

            assert.equal(response.Result, true);

            await testResultController.deleteTestResult("hello", 1)
                .catch(err => errorValue = err)

            assert.equal(errorValue.code, 422)
        });
    });
});