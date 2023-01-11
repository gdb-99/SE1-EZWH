'use strict'

const axios = require('axios');

class TestResultAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getTestResults(rfid){
        let response;
        await axios({
            method: 'get',
            url: this.#baseURL + "/api/skuitems/"+rfid+"/testResults",
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    } 

    async getTestResultById(rfid, id){
        let response;
        await axios({
            method: 'get',
            url: this.#baseURL + "/api/skuitems/"+rfid+"/testResults/" + id ,
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }

    //POST
    async addTestResult(rfid, idTestDescriptor, Date, Result){
        let response;
        await axios({
            method: 'post',
            url: this.#baseURL + "/api/skuitems/testResult" ,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                rfid : rfid, 
                idTestDescriptor : idTestDescriptor,
                Date : Date,
                Result : Result
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }


    //PUT
    async editTestResult(rfid, id, newIdTestDescriptor, newDate, newResult){
        let response;
        await axios({
            method: 'put',
            url: this.#baseURL + "/api/skuitems/"+rfid+"/testResult/" + id ,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                newIdTestDescriptor : newIdTestDescriptor,
                newDate : newDate, 
                newResult : newResult
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }


    //DELETE
    async deleteTestResult(rfid, id){
        let response;
        await axios({
            method: 'delete',
            url: this.#baseURL + "/api/skuitems/"+rfid+"/testResult/" + id,
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }
}

module.exports = TestResultAPICalls;