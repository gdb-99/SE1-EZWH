'use strict';
const axios = require('axios');


class SkuAPICalls {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    async getSKUsTest() {
 
        let response;
        await axios.get(this.#baseURL + "/api/skus/")
            .then(value => { response = value })
            .catch(function (error) { response = error.response; });
        return response;
    }


    async getSKUTest(id) {

        let response;
        await axios.get(this.#baseURL + "/api/skus/" + id)
            .then(value => { response = value })
            .catch(function (error) { response = error.response; });
        return response;
    }

    async addSKUTest(description, weight, volume, notes, price, availableQuantity){

        let response;
        await axios.post(this.#baseURL + "/api/sku", {
            description: description,
            weight: Number(weight),
            volume: Number(volume),
            notes: notes,
            price: Number(price),
            availableQuantity: Number(availableQuantity)
        })
            .then(value => { response = value })
            .catch(error => { response = error.response; });

        return response;

    }

    async modifySKUTest(id, description, weight, volume, notes, price, newAvailableQuantity) {

        let response;
        await axios.put(this.#baseURL + "/api/sku/" + id,
            {
                newDescription: description,
                newWeight: weight,
                newVolume: volume,
                newNotes: notes,
                newPrice: price,
                newAvailableQuantity: newAvailableQuantity
            })
            .then(value => { response = value })
            .catch(error => { response = error.response; });
        return response;
    }

    async modifySKUPosition(id, position) {

        let response;
        await axios.put(this.#baseURL + "/api/sku/" + id + "/position",
            {
                position: position,
            })
            .then(value => { response = value })
            .catch(error => { response = error.response; });
        return response;
    }

    async deleteSKUTest(id) {

        let response;
        await axios.delete(this.#baseURL + "/api/skus/" + id)
            .then(value => { response = value })
            .catch(error => { response = error.response; });
        return response;
    }
}

module.exports = SkuAPICalls;