'use strict';

const { expect, assert } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const testDescriptorController = controller.getTestDescriptorController();
const dbManager = controller.getDBManager();

beforeEach(async () => {
    await dbManager.deleteAllData().then(async () => {
        await dbManager.insertTestDescriptorTestData();
    })
});

afterEach(async () => {
    await dbManager.deleteAllData();
});

describe("TestDescriptorController Tests", () => {

    describe("createTestDescriptor method testing", () => {
        test("Successfully create a Test Descriptor", async () => {
            let result;
            let currId;
            const body = {
                name: "a_test_descriptor",
                procedureDescription: "procedureDescription99",
                idSKU: 1
            };
            currId = ((await testDescriptorController.getAllTestDescriptors()).length) + 1;

            await testDescriptorController.createTestDescriptor(body);

            result = await testDescriptorController.getTestDescriptor(currId).catch(() => { });

            expect(result).not.to.be.undefined;
        });

        test("Insertion of a test descriptor with a non-existing SKU", async () => {
            let result;
            let currId;
            const body = {
                name: "new_test_descriptor",
                procedureDescription: "procedureDescription13",
                idSKU: -13000
            };
            currId = ((await testDescriptorController.getAllTestDescriptors()).length) + 1;

            await testDescriptorController.createTestDescriptor(body).catch(() => { });

            result = await testDescriptorController.getTestDescriptor(currId).catch(() => { });

            expect(result).to.be.undefined;
        });

        test("Insertion of a test descriptor with invalid body", async () => {
            let result;
            let currId;
            const body = {
                name: "another_test_descriptor",
                procedureDescription: "procedureDescription44",
                idSKU: "anSKU"
            };
            currId = ((await testDescriptorController.getAllTestDescriptors()).length) + 1;

            await testDescriptorController.createTestDescriptor(body).catch(() => { });

            result = await testDescriptorController.getTestDescriptor(currId).catch(() => { });

            expect(result).to.be.undefined;
        });
    });

    describe("editTestDescriptor method testing", () => {
        test("Successfully edit a Test Descriptor", async () => {
            let result;
            let currId;
            const body = {
                newName: "newName",
                newProcedureDescription: "newProcedureDescription",
                newIdSKU: 2
            };
            let thisId;

            currId = ((await testDescriptorController.getAllTestDescriptors()).length);

            await testDescriptorController.editTestDescriptor(currId, body);
            result = await testDescriptorController.getTestDescriptor(currId);
            thisId = result['id'];

            expect(thisId).to.be.equal(currId);
        });

        test("Edit a Test Descriptor with invalid id", async () => {
            let result;
            const body = {
                newName: "newName",
                newProcedureDescription: "newProcedureDescription",
                newIdSKU: 2
            };

            result = await testDescriptorController.editTestDescriptor(-1, body).catch(() => { });
            expect(result).to.be.undefined;
        });

        test("Edit a Test Descriptor with a non-existent SKU", async () => {
            let result;
            const body = {
                newName: "newName",
                newProcedureDescription: "newProcedureDescription",
                newIdSKU: -20000
            };

            result = await testDescriptorController.editTestDescriptor(1, body).catch(() => { });

            expect(result).to.be.undefined;
        });
    });

    describe("deleteTestDescriptor method testing", () => {
        test("Successfully delete a Test Descriptor", async () => {
            let result;
            await testDescriptorController.deleteTestDescriptor(1);

            result = await testDescriptorController.getTestDescriptor(1).catch(() => { });
            expect(result).to.be.undefined;
        });

        test("Delete a non-existing Test Descriptor", async () => {
            let oldCount, newCount;

            oldCount = (await testDescriptorController.getAllTestDescriptors()).length;

            await testDescriptorController.deleteTestDescriptor(-1).catch(() => { });

            newCount = (await testDescriptorController.getAllTestDescriptors()).length;

            expect(oldCount).to.be.equal(newCount);
        });

    });
});