'use strict'

const axios = require('axios');

class UserAPICalls {
    #baseURL;

    constructor(){
        this.#baseURL = "http://localhost:3001";
    }

    //GET
    async getUserInfo(){
        let response;
        await axios({
            method: 'get',
            url: this.#baseURL + "/api/userinfo",
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    } 

    async getSuppliers(){
        let response;
        await axios({
            method: 'get',
            url: this.#baseURL + "/api/suppliers" ,
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }

    async getUsers(){
        let response;
        await axios({
            method: 'get',
            url: this.#baseURL + "/api/users" ,
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }

    //POST
    async newUser(username, name, surname, password, type){
        let response;
        await axios({
            method: 'post',
            url: this.#baseURL + "/api/newUser",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                name : name, 
                surname : surname, 
                password : password, 
                type : type
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }

    async managerSessions(username, password){
        let response;
        await axios({
            method: 'post',
            url: this.#baseURL + "/api/managerSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }

    async customerSessions(username, password){
        let response;
        await axios({
            method: 'post',
            url: this.#baseURL + "/api/customerSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }

    async supplierSessions(username, password){
        let response;
        await axios({
            method: 'post',
            url: this.#baseURL + "/api/supplierSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }

    async clerkSessions(username, password){
        let response;
        await axios({
            method: 'post',
            url: this.#baseURL + "/api/clerkSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }

    async qualityEmployeeSessions(username, password){
        let response;
        await axios({
            method: 'post',
            url: this.#baseURL + "/api/qualityEmployeeSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }

    async deliveryEmployeeSessions(username, password){
        let response;
        await axios({
            method: 'post',
            url: this.#baseURL + "/api/deliveryEmployeeSessions",
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username : username, 
                password : password
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }

    async logout(){
        let response;
        await axios({
            method: 'post',
            url: this.#baseURL + "/api/logout",
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    } 

    //PUT
    async editUser(username, oldType, newType){
        let response;
        await axios({
            method: 'put',
            url: this.#baseURL + "/api/users/" + username,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                oldType : oldType, 
                newType : newType
            }
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }


    //DELETE
    async deleteUser(username, type){
        let response;
        await axios({
            method: 'delete',
            url: this.#baseURL + "/api/users/" + username +"/"+ type,
        }).then(value => { response = value })
        .catch(function (error) { response = error.response; });
        return response;
    }
}

module.exports = UserAPICalls;