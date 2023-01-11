'use strict'

const axios = require('axios');
const { response } = require('express');

class RestockOrdersAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getRestockOrders(){
        const url = this.#baseURL + "/api/restockOrders/";
        let response;

        await axios.get(url)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;


    } 


    async getIssuedRestockOrders(){
        const url = this.#baseURL + "/api/restockOrdersIssued/";
        let response;

        await axios.get(url)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;
    } 

    async getRestockOrderById(id){
        const url = this.#baseURL + "/api/restockOrders/" + id;
        let response;

        await axios.get(url)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;
    } 


    async getReturnItemsByRestockOrder(id){
        const url = this.#baseURL + "/api/restockOrders/" + id + "/returnItems";
        const body = {};
        const headers = {headers: {'content-type': 'text/json'}};
        let response;

        await axios.get(url, body, headers)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;
    }

    //POST
    async addRestockOrder(issueDate, products, supplierId){
        const url = this.#baseURL + "/api/restockOrder";
        const body = {
            issueDate : issueDate,
            products: products,
            supplierId : supplierId
        }
        const headers = {headers: {'Content-Type': 'application/json'}};
        let response;

        await axios.post(url, body, headers)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;

    }


    //PUT
    async editRestockOrderState(id, newState){
        const url = this.#baseURL + "/api/restockOrder/" + id;
        const body = {
            newState : newState
        }
        const headers = {headers: {'Content-Type': 'application/json'}};
        let response;


        await axios.put(url, body, headers)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;
    }


    async addSKUItemsToRestockOrder(id, skuItems){
        const url = this.#baseURL + "/api/restockOrder/" + id + "/skuItems";
        const body = {
            skuItems : skuItems
        }
        const headers = {headers: {'Content-Type': 'application/json'}};
        let response;


        await axios.put(url, body, headers)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;
    }


    async addTransportNote(id, transportNote){
        const url = this.#baseURL + "/api/restockOrder/" + id + "/transportNote";
        const body = {
            transportNote : transportNote
        }
        const headers = {headers: {'Content-Type': 'application/json'}};
        let response;

        await axios.put(url, body, headers)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;
    }


    //DELETE
    async deleteRestockOrder(id){
        const url = this.#baseURL + "/api/restockOrder/" + id;
        let response;

        await axios.delete(url)
                    .then(value => response = value)
                    .catch(error => response = error.response);

        return response;
    }
}

module.exports = RestockOrdersAPICalls;