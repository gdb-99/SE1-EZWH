const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')

//SKU ITEM

//GET /api/skuitems
router.get('/api/skuitems', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
    console.log('GET', req.url);
  let skuitems;
  await controller.getSkuItemController().getAllSkuItems()
    .then(skuitems => { return res.status(200).json(skuitems); })
    .then(v => skuitems = v)
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
    

});

//GET /api/skuitems/sku/:id
router.get('/api/skuitems/sku/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  await controller.getSkuItemController().getSkuItems(param)
    .then(skuitems => { return res.status(200).json(skuitems); })
    .catch(error => { console.log(error); return res.status(error.getCode()).send(error.getMessage()); });
});

//GET /api/skuitems/:rfid
router.get('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);
  await controller.getSkuItemController().getSkuItem(param)
    .then(skuitem => { return res.status(200).json(skuitem); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/skuitem
router.post('/api/skuitem', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

  await controller.getSkuItemController().createSkuItem(req.body)
    .then(() => { return res.status(201).end(); })
    .catch(error => { console.log(error);return res.status(error.getCode()).send(error.getMessage()); });
});

//PUT /api/skuitems/:rfid
router.put('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  /** @type {Controller} */
  const controller = req.app.get("controller");
 console.log('PUT', req.url);

  await controller.getSkuItemController().editSkuItem(param, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => {console.log(error); return res.status(error.getCode()).send(error.getMessage()); });
});

//DELETE /api/skuitems/:rfid
router.delete('/api/skuitems/:rfid', async (req, res) => {
  const param = req.params.rfid;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE', req.url);

  await controller.getSkuItemController().deleteSkuItem(param)
    .then(() => { return res.status(204).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});



module.exports = router