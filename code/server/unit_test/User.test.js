'use strict';

const { expect, assert } = require('chai');
const Controller = require('../modules/logic/controller');

const controller = new Controller();
const userController = controller.getUserController();
const dbManager = controller.getDBManager();

beforeEach(async () => {
    await dbManager.deleteAllData();
    
});

afterEach(async () => {
    await dbManager.deleteAllData();
});

describe("UserController Tests", () => {


    describe("getUserAPI method testing", () => {
        test("Succesful test, user is manager and is logged", async () => {
            let body = {
                "username": "manager1@ezwh.com",
                "password": "testpassword"
            }
            await userController.login(body, "manager");
            let result = userController.getUserAPI();
            expect(result['username']).to.be.equal("manager1@ezwh.com");
            expect(result['name']).to.be.equal("name6");
            expect(result['surname']).to.be.equal("surname6");
            expect(result['type']).to.be.equal("manager");
            userController.logout();
        });


        test("Failure test, user is not logged", async () => {
            let err;
            let result;
            try {
                result = userController.getUserAPI();
            }
            catch (error) {
                err = error;
            }
            expect(err.code).to.be.equal(401);
        });
    });

    describe("getUser method testing", () => {
        test("Succesfully get the manager", async () => {
            let body = {
                "username": "manager1@ezwh.com",
                "password": "testpassword"
            }
            await userController.login(body, "manager");


            let result = userController.getUser();



            expect(result['username']).to.be.equal("manager1@ezwh.com");
            expect(result['name']).to.be.equal("name6");
            expect(result['surname']).to.be.equal("surname6");
            expect(result['type']).to.be.equal("manager");
            userController.logout();
        });

        test("Succesfully get an user ", async () => {
            let body = {
                "username": "user1@ezwh.com",
                "password": "testpassword"
            }
            await userController.login(body, "customer");
            let result = userController.getUser();
            expect(result['username']).to.be.equal("user1@ezwh.com");
            expect(result['name']).to.be.equal("name1");
            expect(result['surname']).to.be.equal("surname1");
            expect(result['type']).to.be.equal("customer");
            userController.logout();
        });

        test("Test failure, user is not logged", async () => {
            let err;
            let result;
            try {
                result = userController.getUser();
            }
            catch (error) {
                err = error;
            }
            expect(err.code).to.be.equal(401);
        });
    });

    describe("getAllSuppliers method testing", () => {
        test("Succesfully get all the Suppliers", async () => {
            let result = await userController.getAllSuppliers();
            //console.log(result)
            expect(result.length).to.be.equal(1);
        });

    });

    describe("getAllUsers method testing", () => {
        test("Succesfully get all the Users", async () => {
            let result = await userController.getAllUsers();
            assert.equal(result.length, 6)
            //expect(result.length).to.be.equal(6);
        });

    });

    describe("createUser method testing", () => {
        test("Succesful creation of a new user", async () => {
            let body = {
                "username": "user2@ezwh.com",
                "password": "testpassword",
                "name": "Giulia",
                "surname": "Bianchi",
                "type": "customer"
            }
            let oldCount = await userController.getAllUsers();
            let result = await userController.createUser(body);
            let newCount = await userController.getAllUsers().catch((err) => (console.log(err)));
            expect(newCount.length).to.be.equal(oldCount.length + 1);
        });

        test("Not succesfull creation, user with same email and type exist", async () => {
            let body = {
                "username": "user1@ezwh.com",
                "password": "testpassword",
                "name": "Giulia",
                "surname": "Bianchi",
                "type": "customer"
            }
            let err;
            let oldCount = await userController.getAllUsers();
            let result = await userController.createUser(body).catch((error) => (err = error));
            let newCount = await userController.getAllUsers().catch(() => { });
            expect(newCount.length).to.be.equal(oldCount.length);
            expect(err.code).to.be.equal(409);
        });

        test("Not succesful creation, attempted to create a manager", async () => {
            let body = {
                "username": "user2@ezwh.com",
                "password": "testpassword",
                "name": "Giulia",
                "surname": "Bianchi",
                "type": "manager"
            }
            let err;
            let oldCount = await userController.getAllUsers();
            let result = await userController.createUser(body).catch((error) => (err = error));
            let newCount = await userController.getAllUsers().catch(() => { });
            expect(newCount.length).to.be.equal(oldCount.length);
            expect(err.code).to.be.equal(422);
        });
    });

    describe("login method testing", () => {
        test("Succesful login", async () => {
            let body = {
                "username": "manager1@ezwh.com",
                "password": "testpassword"
            }
            await userController.login(body, "manager");
            userController.logout();
        });

        test("Failed login, the username is not in the body", async () => {
            let body = {
                "password": "testpassword"
            }
            let err;
            await userController.login(body, "manager").catch((error) => (err = error));
            expect(err.code).to.be.equal(422);
        });

        test("Failed login, wrong username", async () => {
            let body = {
                "username": "gatto",
                "password": "testpassword"
            }
            let err;
            await userController.login(body, "manager").catch((error) => (err = error));
            expect(err.code).to.be.equal(401);

        });
    });

    describe("logout method testing", () => {
        test("Succesful logout, user is logged", async () => {
            let body = {
                "username": "manager1@ezwh.com",
                "password": "testpassword"
            }
            await userController.login(body, "manager");
            userController.logout();
        });

        test("Failure, the user is not logged", () => {
            let err;
            try {
                userController.logout();
            }
            catch (error) {
                err = error;
            }
            expect(err.code).to.be.equal(500);
        });

    });

    describe("editUser method testing", () => {
        test("Succesful test, edit done", async () => {
            let body = {
                "oldType": "customer",
                "newType": "supplier"
            }
            await userController.editUser("user1@ezwh.com", body);
        });

        test("Failure, wrong username", async () => {
            let err;
            let body = {
                "oldType": "customer",
                "newType": "supplier"
            }
            await userController.editUser("user12@ezwh.com", body).catch((error) => (err = error));
            expect(err.code).to.be.equal(404);
        });

        test("Failure, tryng to change type into manager", async () => {
            let err;
            let body = {
                "oldType": "manager",
                "newType": "customer"
            }
            await userController.editUser("manager1@ezwh.com", body).catch((error) => (err = error));
            expect(err.code).to.be.equal(422);
        });
    });

    describe("deleteUser method testing", () => {
        test("Succesfully delete an user", async () => {
            let oldCount = await userController.getAllUsers();
            let result = await userController.deleteUser("user1@ezwh.com", "customer");
            let newCount = await userController.getAllUsers().catch((err) => (console.log(err)));
            expect(newCount.length).to.be.equal(oldCount.length - 1);
        });

        test("User not deleted, trying to delete a manager", async () => {
            let oldCount = await userController.getAllUsers();
            let error;
            let result = await userController.deleteUser("manager1@ezwh.com", "manager").catch((err) => (error = err));
            expect(error.code).to.be.equal(422);
            let newCount = await userController.getAllUsers().catch((err) => (console.log(err)));
            expect(newCount.length).to.be.equal(oldCount.length);
        });

        test("User not deleted, trying to delete a non existing user", async () => {
            let oldCount = await userController.getAllUsers();
            let error;
            let result = await userController.deleteUser("customer12@ezwh.com", "customer").catch((err) => (error = err));
            let newCount = await userController.getAllUsers().catch((err) => (console.log(err)));
            expect(newCount.length).to.be.equal(oldCount.length);
        });
    });
});