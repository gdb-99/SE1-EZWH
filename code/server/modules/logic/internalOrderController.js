'use strict'

const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')

class InternalOrderController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
        //console.log("internalOrderController started");
    }


    /**getter function to retreive all the internal orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getAllInternalOrders() {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        let rows = await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder;")
            .catch((error) => { throw error });

        for (let i = 0; i < rows.length; i++) {
            rows[i].products = await this.getProductsForInternalOrder(rows[i].id, rows[i].state)
                .catch(error => { throw error })
        }

        return rows;

    }

    async getProductsForInternalOrder(id, state) {
        let final_query;

        if(state !== "COMPLETED"){
            final_query = `SELECT SKUId, description, price, qty
            FROM SKUPerInternalOrder WHERE id = ?;`;
        }
        else{
            final_query = `SELECT SPI.SKUId, SPI.description, SPI.price, SI.rfid
            FROM SKUPerInternalOrder SPI, SKUItem SI  WHERE id = ? AND SPI.SKUId = SI.SKUId;`;
        }

        let products = await this.#dbManager.genericSqlGet(
            final_query, id)
            .catch(error => { throw error });
        return products;
    }

    /**getter function to retreive all the issued internal orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getIssuedInternalOrders() {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer"))
            throw new Exceptions(401);

        let rows = await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder WHERE state = 'ISSUED';")
            .catch((error) => { throw error });

        for (let i = 0; i < rows.length; i++) {
            rows[i].products = await this.getProductsForInternalOrder(rows[i].id, rows[i].state)
                .catch(error => { throw error })
        }
        return rows;

    }

    /**getter function to retreive all the accepted internal orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getAcceptedInternalOrders() {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "deliveryEmployee"))
            throw new Exceptions(401);
        let rows = await this.#dbManager.genericSqlGet("SELECT * FROM InternalOrder WHERE state = 'ACCEPTED';")
            .catch((error) => { throw error });

        for (let i = 0; i < rows.length; i++) {
            rows[i].products = await this.getProductsForInternalOrder(rows[i].id, rows[i].state)
                .catch(error => { throw error })
        }

        return rows;
    }

    /**getter function to retreive a single internal order, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no internal order associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 500 Internal Server Error (generic error).
    */
    async getInternalOrder(id) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "deliveryEmployee"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (!id || isNaN(Number(id)) || !this.#controller.areAllPositiveOrZero(id))
            throw new Exceptions(422);


        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM InternalOrder WHERE ID = ?;`, id)
            .then((value) => row = value[0])
            .catch((error) => { throw error });

        /*check if the internal order exists*/
        //console.log(row);
        if (!row)
            throw new Exceptions(404);

        row.products = await this.getProductsForInternalOrder(row.id, row.state)
            .catch(error => { throw error })


        return row;

    }

    /**creation of a new internal order
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of request body failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async createInternalOrder(body) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer"))
            throw new Exceptions(401);

        const issueDate = body["issueDate"];
        const products = body["products"];
        const customerId = body["customerId"]

        /*check if the body is valid */
        if (this.#controller.areUndefined(issueDate, products, customerId)
            || isNaN(Number(customerId))
            || !this.#controller.areAllPositiveOrZero(customerId))
            throw new Exceptions(422);

        let dateToSave
        try {
            dateToSave = this.#controller.checkAndFormatDate(issueDate);
        } catch (error) {
            throw new Exceptions(503);
        }


        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM InternalOrder')
            .then(value => id = value[0]["COUNT(*)"])
            .catch(error => { throw error });

        await this.#dbManager
            .genericSqlRun(`INSERT INTO InternalOrder (id, issueDate, state, customerId) VALUES (?, ?, "ISSUED", ?);`,
                id + 1, dateToSave, customerId)
            .catch(error => { throw error })

        const sqlInsert = `INSERT INTO SKUPerInternalOrder (id, SKUId, description, price, qty) VALUES (?, ?, ?, ?, ?);`;
        for (let i = 0; i < products.length; i++) {
            await this.#dbManager.genericSqlRun(sqlInsert, id + 1, products[i].SKUId, products[i].description, products[i].price, products[i].qty)
                .catch(error => { throw error })
        }


    }

    /**function to edit the state of an internal order, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no internal order associated to id)
     * @throws 422 Unprocessable Entity (validation of request body or of id failed)
     * @throws 503 Service Unavailable (generic error).
     */
    async editInternalOrder(id, body) {

        const newState = body["newState"];


        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager", "customer", "deliveryEmployee"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (this.#controller.areUndefined(id, newState)
            || isNaN(Number(id))
            || !this.#controller.areAllPositiveOrZero(id))
                throw new Exceptions(422);
            

        if (!this.#controller.checkStateInternalOrders(newState)){
            throw new Exceptions(422);
        }

        /*check if the internal order exists*/
        await this.getInternalOrder(id)
            .catch(error => { throw error });

        if (newState === "COMPLETED") {

            const products = body["products"];
            if (!products)
                throw new Exceptions(422);

            
             //Same problem as in restock order and return, RFID not unique
            const sqlGet = `SELECT COUNT(*) FROM SKUItemsPerInternalOrder WHERE RFID = ?`;
            const sqlInsert = `INSERT INTO SKUItemsPerInternalOrder (id, SKUId, RFID) VALUES (?, ?, ?);`;
            
            for (let i = 0; i < products.length; i++) {
                let count;
                //Checking for already existent RFID  (other way to solve is to remove the check since it's not requested)
                await this.#dbManager.genericSqlGet(sqlGet, products[i].RFID).then((result) => count = result[0]["COUNT(*)"])
                                                                            .catch((err) => {throw new Exceptions(503)});
                if(count > 0){
                    continue;
                }

                await this.#dbManager.genericSqlRun(sqlInsert, id, products[i].SkuID, products[i].RFID)
                    .catch(error => { throw new Exceptions(505) });
            }

        }
            const sqlInstruction = `UPDATE InternalOrder SET state = ? WHERE ID = ?`;

            await this.#dbManager.genericSqlRun(sqlInstruction, newState, id)
                .catch(error => { throw new Exceptions(503) })
        
    }


    /**delete function to remove an internal order from the table, given its ID 
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async deleteInternalOrder(id) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (!id
            || isNaN(Number(id))
            || !this.#controller.areAllPositiveOrZero(id))
            throw new Exceptions(422);

        await this.#dbManager.genericSqlRun(`DELETE FROM InternalOrder WHERE ID = ?;`, id)
            .catch((error) => { throw error });
    }

}

module.exports = InternalOrderController;