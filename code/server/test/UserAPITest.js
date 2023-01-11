'use strict';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const axios = require('axios');

const UtilityCalls = require('./APICalls/UtilityCalls');
const UserAPICalls = require('./APICalls/UserAPICalls');
const DBManager = require('../modules/database/databaseManager');

const baseURL = "http://localhost:3001";

const dbmanager = new DBManager()
const utilityCalls = new UtilityCalls();
const userAPICalls = new UserAPICalls();


describe('User test suite', async () => {
    beforeEach(async () => {
        await dbmanager.deleteAllData().then(async () => {
            await dbmanager.insertUserTestData();
        });
    })
    afterEach(async () => {
        await dbmanager.deleteAllData().then(async () => {
            await dbmanager.insertUserTestData();
        });
    })
    describe('Standard User getters', async () => {
        it('Succesfully get all user info', async () => { //it indicates a TEST CASE
            let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );        
            response.status.should.equal(200);
            response = await userAPICalls.getUserInfo();

            let loggedUser = await dbmanager.genericSqlGet("SELECT * FROM USERS U WHERE type='manager' AND email='manager1@ezwh.com';")
            .catch(error => { throw error });
            response.status.should.equal(200);
            response.data.id.should.equal(loggedUser[0].id);
            response.data.name.should.equal(loggedUser[0].name); 
            response.data.surname.should.equal(loggedUser[0].surname);
            response.data.type.should.equal(loggedUser[0].type);

            response = await userAPICalls.logout();
            response.status.should.equal(200);
        })

        it('Succesfully get all suppliers', async () => { //it indicates a TEST CASE
            let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
            response.status.should.equal(200);
            response = await userAPICalls.getSuppliers();
            response.status.should.equal(200);
            response = await userAPICalls.logout();
            response.status.should.equal(200);
        });

        it('Succesfully get all users', async () => { //it indicates a TEST CASE
            let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
            response.status.should.equal(200);
            response = await userAPICalls.getUsers();
            response.status.should.equal(200);
            response = await userAPICalls.logout();
            response.status.should.equal(200);
        });
    });


    describe('POST Requests tests to User', async () => {
        describe('Add a new user tests', async() => {
            it('Succesfully add a new user', async () => {
                let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
                response.status.should.equal(200);

                response = await userAPICalls.newUser("giu@yahoo.it", "giulia", "bianchi", "testpassword", "customer");
                response.status.should.equal(201);

                 //if there is the user, i can delete it
                response = await userAPICalls.deleteUser("giu@yahoo.it", "customer");
                response.status.should.equal(204);

                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });
             
            it('User not added, user with same email and type already exists ', async () => {
                let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.newUser("user1@ezwh.com","name1","surname1","e16b2ab8d12314bf4efbd6203906ea6c","customer");
                response.status.should.equal(409); 
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            }); 

            it('User not added, wrong user password ', async () => {
                let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.newUser("user111@ezwh.com","name1","surname1","c","customer");
                response.status.should.equal(422);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });
            
        });
        describe('User session test', async() => {
            it('Succesfully log a manager', async () => {
                let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });

            it('Succesfully log a customer', async () => {
                let response = await userAPICalls.customerSessions("user1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });
            
            it('Succesfully log a supplier', async () => {
                let response = await userAPICalls.supplierSessions("supplier1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });

            it('Succesfully log a clerk', async () => {
                let response = await userAPICalls.clerkSessions("clerk1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.logout();
                response.status.should.equal(200);

            });

            it('Succesfully log a quality empolyee', async () => {
                let response = await userAPICalls.qualityEmployeeSessions("qualityEmployee1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });

            it('Succesfully log a delivery empolyee', async () => {
                let response = await userAPICalls.deliveryEmployeeSessions("deliveryEmployee1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });

            it('Succesfully logout', async () => {
                let response = await userAPICalls.deliveryEmployeeSessions("deliveryEmployee1@ezwh.com", "testpassword" );
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });

        });
    });

    describe('PUT Requests tests to User', async () => {
        describe('Edit a user tests', async() => {
            it('Succesfully edit user', async () => {
                let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.editUser("user1@ezwh.com", "customer", "clerk");
                response.status.should.equal(200);
                //editing it back to its previous type, if it has been edited corrected previously i can do it
                response = await userAPICalls.editUser("user1@ezwh.com", "clerk", "customer");
                response.status.should.equal(200);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });
            
            it('User not edited, no user associated to username ', async () => {
                let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.editUser("user-1@ezwh.com", "customer", "clerk");
                response.status.should.equal(404);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });

            it('User not edited, username format is not valid ', async () => {
                let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.editUser(undefined, "customer", "clerk");
                response.status.should.equal(422);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            }); 
        });
    });

    describe('DELETE Requests tests to user', async () => {
        describe('Delete a user tests', async() => {
            it('Succesfully delete a user', async () => {
                let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.deleteUser("user1@ezwh.com", "customer");
                response.status.should.equal(204);
                //if it has been deleted, i can add it
                response = await userAPICalls.newUser("user1@ezwh.com", "name", "surname", "testpassword", "customer");
                response.status.should.equal(201);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            });
            
            it('User not deleted, validation of username failed ', async () => {
                let response = await userAPICalls.managerSessions("manager1@ezwh.com", "testpassword" );
                response.status.should.equal(200);
                response = await userAPICalls.deleteUser(undefined, "customer");
                response.status.should.equal(422);
                response = await userAPICalls.logout();
                response.status.should.equal(200);
            
            });

        });
    });


});