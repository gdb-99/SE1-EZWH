const express = require('express');
const router = express.Router();
const Controller = require('../modules/logic/controller')

//ReturnOrder Requests
router.get('/api/returnOrders', async (req, res) => {

    /** @type {Controller} */
    const controller = req.app.get("controller");
    //console.log('GET',req.url);

    await controller.getReturnOrderController().getAllReturnOrders()
    .then((returnOrders) => { return res.status(200).json(returnOrders); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});


router.get('/api/returnOrders/:id', async (req, res) => {
    const param = req.params.id;

    /** @type {Controller} */
    const controller = req.app.get("controller");
    //console.log('GET',req.url);

    await controller.getReturnOrderController().getReturnOrder(param)
    .then((returnOrder) => { return res.status(200).json(returnOrder); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});



router.post('/api/returnOrder', async (req, res) => {
    
    /** @type {Controller} */
    const controller = req.app.get("controller");
    //console.log('POST',req.url);

    await controller.getReturnOrderController().createReturnOrder(req.body)
    .then(() => { return res.status(201).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

router.delete('/api/returnOrder/:id', async (req, res) => {
    const param = req.params.id;
   
    /** @type {Controller} */
    const controller = req.app.get("controller");
    //console.log('DELETE',req.url);

    await controller.getReturnOrderController().deleteReturnOrder(param)
    .then(() => { return res.status(204).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});



module.exports = router;