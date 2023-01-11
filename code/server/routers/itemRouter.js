const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')

//GET /api/items
router.get('/api/items', async (req, res) => {

/** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET',req.url);

  await controller.getItemController().getAllItems()
    .then((items) => { return res.status(200).json(items); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});



//GET /api/items/:id/:supplierId
router.get('/api/items/:id/:supplierId', async (req, res) => {
  const itemId = req.params.id;
  const supplierId = req.params.supplierId;

  console.log(itemId, supplierId)

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET',req.url);

  await controller.getItemController().getItem(itemId, supplierId)
    .then((item) => { return res.status(200).json(item); })
    .catch(error => {  return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/item
router.post('/api/item',async (req, res) => {
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('POST',req.url);

  await controller.getItemController().createItem(req.body)
    .then(() => { return res.status(201).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//PUT /api/item/:id/:supplierId
router.put('/api/item/:id/:supplierId', async (req, res) => {
  const itemId = req.params.id;
  const supplierId = req.params.supplierId;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('PUT',req.url);

  await controller.getItemController().editItem(itemId, supplierId, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => {return res.status(error.getCode()).send(error.getMessage()); });
});

//DELETE /api/items/:id/:supplierId
router.delete('/api/items/:id/:supplierId', async(req, res) => {
  const itemId = req.params.id;
  const supplierId = req.params.supplierId;
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('DELETE',req.url);

  await controller.getItemController().deleteItem(itemId, supplierId)
    .then(() => { return res.status(204).end(); })
    .catch(error => {  return res.status(error.getCode()).send(error.getMessage()); });
});

module.exports = router;