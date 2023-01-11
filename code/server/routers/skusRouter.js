const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')
//SKU
//GET /api/skus
router.get('/api/skus', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  await controller.getSkuController().getAllSku()
    .then(skus => {  return res.status(200).json(skus); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });



});

//GET /api/skus/:id
router.get('/api/skus/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('GET', req.url);

  await controller.getSkuController().getSku(param)
    .then(sku => { return res.status(200).json(sku); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });


});

//POST /api/sku
router.post('/api/sku', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('POST', req.url);

  await controller.getSkuController().createSku(req.body)
    .then(() => { return res.status(201).end(); })
    .catch(error => { console.log(error); return res.status(error.getCode()).send(error.getMessage()); });


});

//PUT /api/sku/:id
router.put('/api/sku/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT', req.url);

  await controller.getSkuController().editSku(param, req.body)
    .then(() => { res.status(200).end(); })
    .catch(error => { console.log(error);return res.status(error.getCode()).send(error.getMessage()); });
});

//PUT /api/sku/:id/position
router.put('/api/sku/:id/position', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('PUT', req.url);

  await controller.getSkuController().setPosition(param, req.body)
    .then(() => { res.status(200).end(); })
    .catch(error => { console.log(error); return res.status(error.getCode()).send(error.getMessage()); });
});

//DELETE /api/skus/:id
router.delete('/api/skus/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  console.log('DELETE', req.url);

  await controller.getSkuController().deleteSku(param)
  .then(() => { res.status(204).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });


});


module.exports = router;