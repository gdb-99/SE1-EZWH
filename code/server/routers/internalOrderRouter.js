const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')

router.get('/api/internalOrders', async (req, res) => {
  
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);
  
  await controller.getInternalOrderController().getAllInternalOrders()
    .then((orders) => { return res.status(200).json(orders); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
  
});

router.get('/api/internalOrdersIssued', async (req, res) => {
  
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);
  
  await controller.getInternalOrderController().getIssuedInternalOrders()
    .then((orders) => { return res.status(200).json(orders); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

router.get('/api/internalOrdersAccepted', async (req, res) => {
  
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);

  await controller.getInternalOrderController().getAcceptedInternalOrders()
    .then((orders) => { return res.status(200).json(orders); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

router.get('/api/internalOrders/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);

  await controller.getInternalOrderController().getInternalOrder(param)
    .then((orders) => { return res.status(200).json(orders); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

router.post('/api/internalOrders', async (req, res) => {
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('POST', req.url);

  await controller.getInternalOrderController().createInternalOrder(req.body)
    .then(() => { return res.status(201).end(); })
    .catch(error => {  return res.status(error.getCode()).send(error.getMessage()); });
});


router.put('/api/internalOrders/:id', async (req, res) => {
  const param = req.params.id;
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('PUT', req.url);

  await controller.getInternalOrderController().editInternalOrder(param, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

router.delete('/api/internalOrders/:id', async (req, res) => {
  const param = req.params.id;
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('DELETE', req.url);
  
  await controller.getInternalOrderController().deleteInternalOrder(param)
    .then(() => { return res.status(204).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
  
});


module.exports = router;