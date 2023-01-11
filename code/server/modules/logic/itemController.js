//WORKING 

'use strict'

const Exceptions = require('../../routers/exceptions');
const Controller = require('./controller');

class ItemController {
    /** @type {Controller} */
    #controller;
    #dbManager;
    constructor(controller) {
        this.#controller = controller;
        this.#dbManager = this.#controller.getDBManager();
        //console.log("itemController started");
    }


    /** getter function to retreive all the items
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 500 Internal Server Error (generic error).
    */
    async getAllItems() {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        let rows = await this.#dbManager.genericSqlGet("SELECT * FROM Item")
            .catch(error => { throw error });
        return rows;


    }

    /**getter function to retreive a single item given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (no item associated to id)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 500 Internal Server Error (generic error).
    */
    async getItem(id, supplierId) {

        /*check if the current user is authorized */
        console.log("called get item");
        if (!this.#controller.isLoggedAndHasPermission("manager"))
            throw new Exceptions(401);


        //check if the id is valid
        if (this.#controller.areUndefined(id, supplierId) || this.#controller.areNotNumbers(id, supplierId)
            || !this.#controller.areAllPositiveOrZero(id)) {
            throw new Exceptions(422);
            
        }
        
        
        const suppliers = await this.#controller.getUserController().getAllSuppliers()
            .catch(err => { throw err })


        const suppliersCode = suppliers.map(s => s.id);
        // if (!suppliersCode.includes(supplierId)) {
        //     console.log("test supplier", suppliersCode[0] == supplierId);
        //     throw new Exceptions(404)
        // }

        let supplierFound = false;
        for(let supCode of suppliersCode){
            //console.log("fd", supCode, supplierId)
            if(Number(supCode) === Number(supplierId)){
                supplierFound = true;
            }
        }

        if(!supplierFound){
            console.log("dfsdff");
            throw new Exceptions(404)
        }


        let row;
        await this.#dbManager.genericSqlGet(`SELECT * FROM Item WHERE id= ? AND supplierId = ?;`, id, supplierId)
            .then(value => row = value[0])
            .catch(error => { throw error });


        console.log(await this.getAllItems());
        //check if the item exists
        if (!row)
            throw new Exceptions(404)

        return row;

    }

    /**creation of a new item in the table
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not Found (Sku not found)
     * @throws 422 Unprocessable Entity (validation of request body failed or this supplier already sells an item with the same SKUId or supplier already sells an Item with the same ID)
     * @throws 503 Service Unavailable (generic error).
    */
    async createItem(body) {

        /*check if the user is authorized */
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        const id = body["id"];
        const description = body["description"];
        const price = body["price"];
        const SKUId = body["SKUId"]
        const supplierId = body["supplierId"];


        //check if the body is valid
        if (this.#controller.areUndefined(id, description, price, SKUId, supplierId)
            || this.#controller.areNotNumbers(id, price, SKUId, supplierId)
            || !this.#controller.areAllPositiveOrZero(id, price, SKUId, supplierId))
            throw new Exceptions(422);

        //check if sku exists in the SKU table
        await this.#controller.getSkuController().getSku(SKUId)
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else { console.log("err", error); throw error } })

        //check if the supplier already sells an item with the same SKUId
        let item;
        await this.#dbManager.genericSqlGet('SELECT * FROM Item WHERE SKUid = ? AND supplierId = ?', SKUId, supplierId)
            .then(value => item = value[0])
            .catch(error => { throw error });
        if (item !== undefined) {
            throw new Exceptions(422);
        }


        await this.#dbManager.genericSqlGet('SELECT * FROM Item WHERE id=?', id)
            .then(value => item = value[0])
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else throw error })
        if (item !== undefined) {
            throw new Exceptions(422);
        }




        await this.#dbManager.genericSqlRun(`INSERT INTO Item (id, description, price, SKUId, supplierId) 
        VALUES (?,?,?,?,?);`, id, description, price, SKUId, supplierId)
            .catch(error => { throw error });


    }

    /**function to edit the properties of a specific item, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 404 Not found (Item not existing)
     * @throws 422 Unprocessable Entity (validation of request body failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async editItem(id, supplierId, body) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        const newDescription = body["newDescription"];
        const newPrice = body["newPrice"];

        /*check if the body is valid*/
        if (this.#controller.areUndefined(newDescription, newPrice, id, supplierId)
            || this.#controller.areNotNumbers(id, supplierId, newPrice)
            || !this.#controller.areAllPositiveOrZero(newPrice))
            throw new Exceptions(422);

        await this.getItem(id, supplierId)
            .catch(error => { if (error.getCode() === 500) throw new Exceptions(503); else {console.log(error); throw error} })

        const suppliers = await this.#controller.getUserController().getAllSuppliers()
            .catch(err => { throw err })

        const suppliersCode = suppliers.map(s => s.id);
        // if (!suppliersCode.includes(supplierId)){
        //     console.log(suppliersCode.includes(supplierId))
        //     throw new Exceptions(404)
        // }

        let supplierFound = false;

        for(let supCode of suppliersCode){
            if(Number(supCode) === Number(supplierId)){
                supplierFound = true;
            }
        }

        if(!supplierFound){
            console.log("tira");
            throw new Exceptions(404)
        }

        await this.#dbManager.genericSqlRun(`UPDATE Item SET description= ? , price= ? WHERE id= ? AND supplierId = ?;`, newDescription, newPrice, id, supplierId)
            .catch(error => { throw error });

    }

    /**delete function to remove an item from the table, given its ID
     * @throws 401 Unauthorized (not logged in or wrong permissions)
     * @throws 422 Unprocessable Entity (validation of id failed)
     * @throws 503 Service Unavailable (generic error).
    */
    async deleteItem(id, supplierId) {

        /*check if the current user is authorized*/
        if (!this.#controller.isLoggedAndHasPermission("supplier"))
            throw new Exceptions(401);

        /*check if the id is valid*/
        if (this.#controller.areUndefined(id, supplierId) || this.#controller.areNotNumbers(id, supplierId)
            || !this.#controller.areAllPositiveOrZero(id))
            throw new Exceptions(422);


        const suppliers = await this.#controller.getUserController().getAllSuppliers()
            .catch(err => { throw err })

        const suppliersCode = suppliers.map(s => s.id);
        if (!suppliersCode.includes(Number(supplierId))) {
            console.log("test suppliers", supplierId, suppliersCode, suppliersCode.includes(supplierId))
            throw new Exceptions(404)
        }
        await this.#dbManager.genericSqlRun(`DELETE FROM Item WHERE id = ? AND supplierId = ?;`, id, supplierId)
            .catch((error) => { throw error });
    }


}

module.exports = ItemController;