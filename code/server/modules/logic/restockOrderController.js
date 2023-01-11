'use strict'

const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller')


class RestockOrderController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
        //console.log("restockOrderController started");
    }

    /**getter function to retreive all the restock orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error). 
    */
    async getAllRestockOrders() {
        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk", "qualityEmployee"))
            throw new Exceptions(401)

        let orders = await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder;").catch((error) => { throw error });

        for (let i = 0; i < orders.length; i++) {
            if (orders[i].state !== 'ISSUED' && orders[i].state !== 'DELIVERY') {
                orders[i].products = await this.getProductsForOrders(orders[i].id).catch((error) => { throw error });

                orders[i].skuItems = await this.getSKUItemsForOrders(orders[i].id).catch((error) => { throw error });

            }
            if (orders[i].state !== 'ISSUED') {
                orders[i].skuItems = await this.getTransportNote(orders[i].id).catch((error) => { throw error });
            }
        }

        return orders;
    }

    /** @throws 500 */
    async getProductsForOrders(id) {
        //let products = await this.#dbManager.genericSqlGet(`SELECT SKUId, description, price, qty FROM SKUPerRestockOrder WHERE id = ?;`, id).catch((error) => { throw error });
        let products = await this.#dbManager.genericSqlGet(`SELECT SKUId, itemId, description, price, qty FROM SKUPerRestockOrder WHERE id = ?;`, id).catch((error) => { throw error });
        return products;
    }

    /** @throws 500 */
    async getTransportNote(id) {
        let transportNote = await this.#dbManager.genericSqlGet(`SELECT transportNote FROM RestockOrder WHERE id = ?;`, id).catch((error) => { throw error });

        return transportNote[0];
    }

    /** @throws 500 */
    async getSKUItemsForOrders(id) {
        //let skuItems = await this.#dbManager.genericSqlGet(`SELECT SKUId, RFID FROM SKUItemsPerRestockOrder WHERE id = ?;`, id).catch((error) => { throw error });
        let skuItems = await this.#dbManager.genericSqlGet(`SELECT SKUId, itemId, RFID FROM SKUItemsPerRestockOrder WHERE id = ?;`, id).catch((error) => { throw error });
        return skuItems;
    }

    /**getter function to retreive all the issued restock orders
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getIssuedRestockOrders() {


        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "supplier"))
            throw new Exceptions(401)

        let rows = await this.#dbManager.genericSqlGet("SELECT * FROM RestockOrder WHERE state = 'ISSUED';")
            .catch((error) => { throw error });

        for (let i = 0; i < rows.length; i++) {
            rows[i].products = await this.getProductsForOrders(rows[i].id)
                .catch((error) => { throw error });

            rows[i].skuItems = await this.getSKUItemsForOrders(rows[i].id)
                .catch((error) => { throw error });

        }

        return rows;
    }

    /**getter function to retreive a single restock order, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 500 Internal Server Error (generic error).
    */
    async getRestockOrder(id) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        /*check if the id is valid*/
        if (!id || isNaN(Number(id))
            || !this.#controller.areAllPositiveOrZero(id))
            throw new Exceptions(422);

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch((error) => { throw error });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404)

        if (row.state !== 'DELIVERY' && row.state !== 'ISSUED') {
            row.products = await this.getProductsForOrders(row.id)
                .catch((error) => { throw error });

            row.skuItems = await this.getSKUItemsForOrders(row.id)
                .then(value => row.skuItems = value)
                .catch((error) => { throw error });


        }
        if (row.state !== 'ISSUED') {
            row.transportNote = await this.getTransportNote(row.id)
                .catch((error) => { throw error });
        }


        return row;
    }

    /**function to retreive the sku items to be returned of a restock order
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed or restock order state != COMPLETEDRETURN)
     * @throws 500 Internal Server Error (generic error).
    */
    async getRestockOrderToBeReturned(id) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401)

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch((error) => { throw error });

        /*check if the restock order exists*/
        if (!row)
            throw new Exceptions(404)

        /*check if the id is valid*/
        if (!id || isNaN(Number(id))
            || !this.#controller.areAllPositiveOrZero(id))
            throw new Exceptions(422);

        /*check if the state of the restock order is COMPLETEDRETURN */
        if (row.state !== 'COMPLETEDRETURN')
            throw new Exceptions(422)

        let failedProducts = await this.#dbManager.genericSqlGet('SELECT Distinct RFID FROM TestResult WHERE Result = false')
            .catch(error => { throw error })

        let failedProductsToReturn = []
        let skuItems = row["skuItems"];

        if (skuItems === undefined) {
            return failedProductsToReturn;
        }

        for (let j = 0; j < skuItems.length; j++) {
            if (failedProducts.includes(skuItems[i].rfid))
                failedProductsToReturn = [...failedProductsToReturn, skuItems[i]];
            return failedProductsToReturn;

        }
    }

    /**creation of a restock order
     * @throws  401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of request body failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async createRestockOrder(body) {
        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "supplier"))
            throw new Exceptions(401)

        const issueDate = body["issueDate"];
        const products = body["products"];
        const supplierId = body["supplierId"]

        /*check if the body is valid*/
        if (this.#controller.areUndefined(issueDate, products, supplierId)
            || isNaN(Number(supplierId))
            || !this.#controller.areAllPositiveOrZero(supplierId))
            throw new Exceptions(422);

        let dateToSave;
        try {
            dateToSave = this.#controller.checkAndFormatDate(issueDate);
        } catch (error) {
            throw new Exceptions(422);
        }

        let id;
        await this.#dbManager.genericSqlGet('SELECT COUNT(*) FROM RestockOrder')
            .then(value => id = value[0]["COUNT(*)"] + 1)
            .catch((error) => { throw error });

        const sqlInstruction = `INSERT INTO RestockOrder ( id, issueDate, state, transportNote, supplierId) 
        VALUES (?, ?, "ISSUED", '', ?);`;

        await this.#dbManager.genericSqlRun(sqlInstruction, id, dateToSave, supplierId)
            .catch((error) => { throw error });

        // const sqlInsert = `INSERT INTO SKUPerRestockOrder (id, SKUid, description, price, qty) VALUES (?,?,?,?,?);`
        // for (let i = 0; i < products.length; i++) {
        //     await this.#dbManager.genericSqlRun(sqlInsert, id + 1, products[i].SKUId, products[i].description, products[i].price, products[i].qty)
        //         .catch((error) => { throw error })
        // }

        
        const sqlInsert = `INSERT INTO SKUPerRestockOrder (id, SKUid, itemId, description, price, qty) VALUES (?,?,?,?,?,?);`
        for (let i = 0; i < products.length; i++) {
            await this.#dbManager.genericSqlRun(sqlInsert, id + 1, products[i].SKUId, products[i].itemId, products[i].description, products[i].price, products[i].qty)
                .catch((error) => { throw error })
        } 
        

    }

    /**function to edit a state of a restock order, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to id)
     * @throws 422 Unprocessable Entity (validation of request body or of id failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async editRestockOrder(id, body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk"))
            throw new Exceptions(401)

        const newState = body["newState"]

        /*check if the body is valid*/
        if (!newState || !this.#controller.checkStateRestockOrders(newState))
            throw new Exceptions(422);

        let row = await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .catch((error) => { throw error });
        /*check if the restock order exists*/
        if (!(row[0]))
            throw new Exceptions(404);

        await this.#dbManager.genericSqlRun(`UPDATE RestockOrder SET state = ? WHERE id=?;`, newState, id)
            .catch((error) => { throw error });

    }

    /**function to add a list of sku items to a restock order 
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no restock order associated to id)
     * @throws 422 Unprocessable Entity (validation of request body or of id failed or order state != DELIVERED)
     * @throws 503 Service Unavailable (generic error).
    */
    async addSkuItemsToRestockOrder(id, body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("manager", "clerk"))
            throw new Exceptions(401)


        const skuItems = body["skuItems"];


        /*check if the body is valid*/
        if (!skuItems){
            throw new Exceptions(422);
        }

        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
            .then(value => row = value[0])
            .catch((error) => { throw error });

        if(row === undefined){
            throw new Exceptions(404);
        }
        const supplierId = row.supplierId;

    
        /*check if the restock order exists*/
        if (!row){
            throw new Exceptions(404);
        }

        /*check if the state of the restock order is DELIVERED*/
        if (row.state !== 'DELIVERED'){
            throw new Exceptions(422)
        }

        //console.log(skuItems);

        let skuidInfo, itemIdInfo;
        let num;
        const sqlGet = `SELECT COUNT(*) FROM SKUItemsPerRestockOrder WHERE RFID = ?`;
        //const sqlInsert = `INSERT INTO SKUItemsPerRestockOrder (id, SKUID, RFID) VALUES (?,?,?);`
        const sqlInsert = `INSERT INTO SKUItemsPerRestockOrder (id, SKUID, itemId, RFID) VALUES (?,?,?,?);`
        //const sqlInsert2 = `INSERT INTO SKUPerRestockOrder (id, SKUid, description, price, qty) VALUES (?,?,?,?,?);`
        const sqlInsert2 = `INSERT INTO SKUPerRestockOrder (id, SKUid, itemId, description, price, qty) VALUES (?,?,?,?,?,?);`
        const sqlUpdate = `UPDATE SKUPerRestockOrder SET qty = qty + 1 WHERE SKUid = ?`
        
  
        for (let i = 0; i < skuItems.length; i++) {
            let count;

            //Checking for already existent RFID  (other way to solve is to remove the check since it's not requested)
            await this.#dbManager.genericSqlGet(sqlGet, skuItems[i].rfid).then((result) => count = result[0]["COUNT(*)"])
                                                                         .catch((err) => {throw new Exceptions(503)});                                                            
            if(count > 0){
                continue;
            }


            //await this.#dbManager.genericSqlRun(sqlInsert, id, skuItems[i].SKUId, skuItems[i].rfid).catch((error) => { throw new Exceptions(503) })
            await this.#dbManager.genericSqlRun(sqlInsert, id, skuItems[i].SKUId, skuItems[i].itemId, skuItems[i].rfid).catch((error) => { throw new Exceptions(503) });
            skuidInfo = await this.#controller.getSkuController().getSku(skuItems[i].SKUId).catch((err) => {
                console.log(err);
            })
            itemIdInfo = await this.#controller.getItemController().getItem(skuItems[i].itemId, supplierId);

            //Do we need also to add a WHERE for itemId = itemIdInfo ? 
            num = await this.#dbManager.genericSqlGet("SELECT SKUId FROM SKUPerRestockOrder WHERE SKUId = ?", skuidInfo.id).catch(error => { throw new Exceptions(503) });
                
            if (num.length === 0) {
                //await this.#dbManager.genericSqlRun(sqlInsert2, id, skuidInfo.id, skuidInfo.description, skuidInfo.price, 1).catch((error) => { throw new Exceptions(503) })
                await this.#dbManager.genericSqlRun(sqlInsert2, id, skuidInfo.id, itemIdInfo, skuidInfo.description, skuidInfo.price, 1).catch((error) => { throw new Exceptions(503) })
            }
            else {
                await this.#dbManager.genericSqlRun(sqlUpdate, skuidInfo.id).catch((error) => { throw new Exceptions(503) })
            }

        }
    }



    /**function to add a transport note to a restock order, given its ID
     @throws  401 Unauthorized (not logged in or wrong permissions)
     @throws 404 Not Found (no restock order associated to id)
     @throws 422 Unprocessable Entity (validation of request body or of id failed or order state != DELIVERY or deliveryDate is before issueDate)
     @throws 503 Service Unavailable (generic error).
    */
    async addTransportNote(id, body) {

    /*check if the current user is authorized*/
    if (!this.#controller.isLoggedAndHasPermission("manager", "supplier"))
        throw new Exceptions(401)

        /*check if the body is valid */

        const transportNote = body["transportNote"];

        if (!transportNote){
            throw new Exceptions(422);
        }
            
    /*check if the id is valid*/
    if (!id || isNaN(Number(id))
        || !this.#controller.areAllPositiveOrZero(id))
        throw new Exceptions(422);

    let row;
    await this.#dbManager.genericSqlGet(`SELECT * FROM RestockOrder WHERE id=?;`, id)
        .then(value => row = value[0]).catch((error) => { throw error });

    /*check if the restock order exists*/
    if (!row)
        throw new Exceptions(404)

    /*check if the state of the restock order is DELIVERY*/
    if (row.state !== 'DELIVERY') {
        throw new Exceptions(422)
    }


    let formattedDeliveryDate, formattedIssueDate;
    try {
        formattedDeliveryDate = this.#controller.checkAndFormatDate(transportNote.deliveryDate);
        formattedIssueDate = this.#controller.checkAndFormatDate(row.issueDate);

    } catch (error) {
        throw error;
    }

    /*check if the deliveryDate is before the issueDate */
    if (formattedDeliveryDate <= formattedIssueDate) {
        throw new Exceptions(422);
    }


    const sqlInstruction = `UPDATE RestockOrder SET transportNote = ? WHERE id = ?;`;
    await this.#dbManager.genericSqlRun(sqlInstruction, transportNote.deliveryDate, id).catch((error) => { throw error })
}

    /**delete function to remove a restock order from the table, given its ID
    * @throws 401 Unauthorized (not logged in or wrong permissions)
    * @throws 422 Unprocessable Entity (validation of id failed)
    * @throws 503 Service Unavailable (generic error).
    */
    async deleteRestockOrder(id) {

    /*check if the current user is authorized*/
    if (!this.#controller.isLoggedAndHasPermission("manager"))
        throw new Exceptions(401)

    /*check if the id is valid*/
    if (!id || isNaN(Number(id))
        || !this.#controller.areAllPositiveOrZero(id))
        throw new Exceptions(422);

    await this.#dbManager.genericSqlRun(`DELETE FROM RestockOrder WHERE ID=?;`, id).catch((error) => { throw error });

}
}

module.exports = RestockOrderController;