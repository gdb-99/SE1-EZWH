'use strict'

const axios = require('axios');

class TestDescriptorAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getTestDescriptors(){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/testDescriptors",
        });
    } 

    async getTestDescriptorById(id){
        return axios({
            method: 'get',
            url: this.#baseURL + "/api/testDescriptors/" + id ,
        });
    }

    //POST
    async addTestDescriptor(name, procedureDescription, idSKU){
        let response;
        await axios({
            method: 'post',
            url: this.#baseURL + "/api/testDescriptor",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                name: name,
                procedureDescription: procedureDescription,
                idSKU: idSKU
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }


    //PUT
    async editTestDescriptor(id, newName, newProcedureDescription, newIdSKU){
        let response;
        await axios({
            method: 'put',
            url: this.#baseURL + "/api/testDescriptor/" + id,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                newName: newName,
                newProcedureDescription: newProcedureDescription, 
                newIdSKU: newIdSKU
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }


    //DELETE
    async deleteTestDescriptor(id){
        let response;
        await axios({
            method: 'delete',
            url: this.#baseURL + "/api/testDescriptor/" + id,
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }
}

module.exports = TestDescriptorAPICalls;