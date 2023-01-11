'use strict';
const axios = require('axios');


class PositionAPICalls {
    #baseURL;

    constructor() {
        this.#baseURL = "http://localhost:3001";
    }

    async getPositions() {

        let response;
        await axios.get(this.#baseURL + "/api/positions/")
            .then(value => { response = value })
            .catch(function (error) { response = error.response; });
        return response;
    }

    async addPosition(positionID, aisleID, row, col, maxWeight, maxVolume) {

        let response;
        await axios.post(this.#baseURL + "/api/position/",
            {
                positionID: positionID,
                aisleID: aisleID,
                row: row,
                col: col,
                maxWeight: maxWeight,
                maxVolume: maxVolume,
            })
            .then(value => { response = value })
            .catch(function (error) { response = error.response; });
        return response;
    }

    async modifyPosition(positionID, newAisleID, newRow, newCol, newMaxWeight,
        newMaxVolume, newOccupiedWeight, newOccupiedVolume) {

        let response;
        await axios.put(this.#baseURL + "/api/position/" + positionID,
            {
                newAisleID: newAisleID,
                newRow: newRow,
                newCol: newCol,
                newMaxWeight: newMaxWeight,
                newMaxVolume: newMaxVolume,
                newOccupiedWeight: newOccupiedWeight,
                newOccupiedVolume: newOccupiedVolume,
            })
            .then(value => { response = value })
            .catch(function (error) { response = error.response; });
        return response;
    }

    async changePositionID(positionID, newPositionID) {
        //console.log(newPositionID);
        let response;
        await axios.put(this.#baseURL + "/api/position/" + positionID + '/changeID',
            {
                newPositionID : newPositionID
            })
            .then(value => { response = value })
            .catch(function (error) { response = error.response; });
        return response;
    }

    async deletePosition(positionID) {
 
        let response;
        await axios.delete(this.#baseURL + "/api/position/"+positionID)
            .then(value => { response = value })
            .catch(function (error) { response = error.response; });
        return response;
    }

}

module.exports = PositionAPICalls;