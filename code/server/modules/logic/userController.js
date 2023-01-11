'use strict'

const Exceptions = require('../../routers/exceptions');
const MD5 = require("crypto-js/md5")
const Controller = require('./controller')
class UserController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    #validTypes = ["manager", "customer", "supplier", "clerk", "deliveryEmployee", "qualityEmployee"]
    #user = {
        id: undefined,
        username: undefined,
        name: undefined,
        surname: undefined,
        type: undefined,

    };
    #logged = false;

    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
        //console.log("testController started");


    }

    /** 
     * @throws 401 Unauthorized (not logged in) 
     * @throws 500 Internal Server Error (generic error).
     */
    getUserAPI() {
        if (!this.#controller.isLoggedAndHasPermission("manager")
            || !this.#logged)
            throw new Exceptions(401);

        return this.#user;
    }

    /**
     * 
     * @throws 401 (Not Authorized)
     */
    getUser() {
        //console.log("log check", this.#logged)
        if (!this.#logged) {
            throw new Exceptions(401);
        }
        return this.#user;
    }

    /** 
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error). 
     */
    async getAllSuppliers() {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        let suppliers = await this.#dbManager.genericSqlGet("SELECT * FROM USERS U WHERE TYPE='supplier';")
            .catch(error => { throw error });
        return suppliers;

    }

    /** 
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error). 
     */
    async getAllUsers() {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        let users = await this.#dbManager.genericSqlGet("SELECT * FROM USERS U")
            .catch(error => { throw error });

        return users;
    }


    /** 
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 409 Conflict (user with same mail and type already exists)
     * @throws 422 Unprocessable Entity (validation of request body failed or attempt to create manager or administrator accounts)
     * @throws 503 Service Unavailable (generic error). */
    async createUser(body) {

        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        const username = body["username"];
        const name = body["name"];
        const surname = body["surname"];
        const password = body["password"];
        const type = body["type"];

        if (this.#controller.areUndefined(username, name, surname, password, type)
            || String(password).length < 8
            || type === "manager")
            throw new Exceptions(422);

        const hashedPassword = MD5(password).toString();

        let users = await this.getAllUsers()
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else throw error })

        let usersEmails = users.map(user => user.email)
        if (usersEmails.includes(username))
            throw new Exceptions(409);


        const sqlInstruction = `INSERT INTO USERS ( email, name, surname, password, type) VALUES (?,?,?,?,?);`;

        this.#dbManager.genericSqlRun(sqlInstruction, username, name, surname, hashedPassword, type)
            .catch((error) => { throw error });

    }

    /** 
     * @throws 401 Unauthorized (wrong username and/or password) 
     * @throws 500 Internal Server Error (generic error). */
    async login(body, type) {


        const username = body["username"];
        const password = body["password"];

        if (this.#controller.areUndefined(username, password))
            throw new Exceptions(422);

        const hashedPassword = MD5(password).toString();
        const sqlInstruction = `SELECT * FROM USERS U WHERE email= ? AND password= ? AND type= ?`;
        //console.log(username, hashedPassword)
        let row;
        await this.#dbManager.genericSqlGet(sqlInstruction, username, hashedPassword, type)
            .then(value => row = value[0])
            .catch(error => { throw error; });

        if (!row)
            throw new Exceptions(401);


        this.#user.id = row.id;
        this.#user.username = row.email;
        this.#user.name = row.name;
        this.#user.surname = row.surname;
        this.#user.type = row.type;
        this.#logged = true;
        //console.log("logged", this.#logged);

        return ({
            id: this.#user.id,
            username: this.#user.username,
            name: this.#user.name
        });

    }

    /** 
     * @throws 500 Internal Server Error (generic error). 
     */
    logout() {
        //console.log(this.#logged);
        if (!this.#logged)
            throw new Exceptions(500)//already logged out
        this.#logged = false;
        return;
    }

    /** 
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not found (wrong username or oldType fields or user doesn't exists)
     * @throws 422 Unprocessable Entity (validation of request body or of username failed or attempt to modify rights to administrator or manager)
     * @throws 503 Service Unavailable (generic error)
     */
    async editUser(username, body) {
        if (username == "undefined")
            username = undefined;

        if (!this.#controller.isLoggedAndHasPermission("manager")) {
            throw new Exceptions(401);
        }

        const oldType = body["oldType"];
        const newType = body["newType"];

        if (this.#controller.areUndefined(username, oldType, newType) || oldType === "manager")
            throw new Exceptions(422);

        let users = await this.getAllUsers()
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else throw error })

        let usernames = users.map(us => us.email)
        if (!usernames.includes(username))
            throw new Exceptions(404);

        let filteredUsers = users.filter((us) => us.email === username && us.type === oldType)
        //console.log("testUser", filteredUsers, "fineTest")
        if (filteredUsers.length===0)
            throw new Exceptions(404);

        await this.#dbManager.genericSqlRun
            (`UPDATE USERS SET type= ? WHERE type= ? ;`, newType, oldType)
            .catch((error) => { throw error });
    }

    /** 
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of username or of type failed or attempt to delete a manager/administrator)
     * @throws 503 Service Unavailable (generic error). */
    async deleteUser(username, type) {
        if (username == "undefined")
            username = undefined;
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        if (this.#controller.areUndefined(username, type) || type === "manager")
            throw new Exceptions(422);

        if(!this.#controller.validateEmail(username)) throw new Exceptions(422)
        if(!this.#validTypes.includes(type)) throw new Exceptions(422)

        await this.#dbManager.genericSqlRun
            (`DELETE FROM USERS WHERE email= ? AND type= ?;`, username, type)
            .catch((error) => { throw error });
    }

    hasPermission(type, validType) {
        //console.log(type, validType, validType.includes(type))
        /* console.log("Type: " + type);
        console.log(" validType: " + validType);
        console.log(" bool: " + validType.includes(type)); */
        return validType.includes(type);
    }

   

}

module.exports = UserController;