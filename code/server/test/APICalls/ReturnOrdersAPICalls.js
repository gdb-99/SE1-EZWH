'use strict'

const axios = require('axios');
const { response } = require('express');


class ReturnOrdersAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    async getReturnOrders(){
        const url = this.#baseURL + "/api/returnOrders";
        let response;

        await axios.get(url)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;
    }

    async getReturnOrderById(id){
        const url = this.#baseURL + "/api/returnOrders/" + id;
        let response;

        await axios.get(url)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;
    }


    async createReturnOrder(returnDate, products, restockOrderId){
        const url = this.#baseURL + "/api/returnOrder";
        const body = {
            returnDate : returnDate,
            products : products,
            restockOrderId : restockOrderId
        }

        const headers = {headers: {'Content-Type': 'application/json'}};
        let response;

        await axios.post(url, body, headers)
                    .then(value => response = value)
                    .catch(error => response = error.response);
    
        return response;
    }

    async deleteReturnOrderById(id){
        const url = this.#baseURL + "/api/returnOrder/" + id;
        let response;

        await axios.delete(url)
                    .then(value => response = value)
                    .catch(error => response = error.response);

        return response;
    }
}

module.exports = ReturnOrdersAPICalls;