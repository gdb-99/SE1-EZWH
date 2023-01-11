'use strict'

const axios = require('axios');

class InternalOrdersAPICalls {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getInternalOrdersTest() {
        const url = this.#baseURL + "/api/internalOrders";
        let response;

        await axios.get(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    async getIssuedInternalOrdersTest() {
        const url = this.#baseURL + "/api/internalOrdersIssued";
        let response;

        await axios.get(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    async getAcceptedInternalOrdersTest() {
        const url = this.#baseURL + "/api/internalOrdersAccepted";
        let response;

        await axios.get(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    async getInternalOrderByIdTest(id) {
        const url = this.#baseURL + "/api/internalOrders/" + id;
        let response;

        await axios.get(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    //POST
    async addInternalOrderTest(issueDate, products, customerId) {
        const url = this.#baseURL + "/api/internalOrders";
        const body = {
            issueDate: issueDate,
            products: products,
            customerId: customerId
        }
        const headers = { headers: { 'Content-Type': 'application/json' } };
        let response;

        await axios.post(url, body, headers)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    //PUT
    async editInternalOrderTest(id, newState, products) {
        const url = this.#baseURL + "/api/internalOrders/" + id;
        const body = {
            newState: newState,
            products: products
        }
        const headers = { headers: { 'Content-Type': 'application/json' } };
        let response;


        await axios.put(url, body, headers)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

    //DELETE
    async deleteInternalOrderTest(id) {
        const url = this.#baseURL + "/api/internalOrders/" + id;
        let response;

        await axios.delete(url)
            .then(value => response = value)
            .catch(error => response = error.response);

        return response;
    }

}

module.exports = InternalOrdersAPICalls;