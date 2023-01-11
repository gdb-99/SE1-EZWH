const express = require('express')
const router = express.Router()
const Controller = require('../modules/logic/controller')

//TEST DESCRIPTOR
//GET /api/testDescriptors
router.get('/api/testDescriptors', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);

  await controller.getTestDescriptorController().getAllTestDescriptors()
    .then((testDescriptors) => { return res.status(200).json(testDescriptors); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});


//GET /api/testDescriptors/:id
router.get('/api/testDescriptors/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);

  await controller.getTestDescriptorController().getTestDescriptor(param)
    .then((testDescriptor) => { return res.status(200).json(testDescriptor); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/testDescriptor
router.post('/api/testDescriptor', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('POST', req.url);

  await controller.getTestDescriptorController().createTestDescriptor(req.body)
    .then(() => { return res.status(201).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//PUT /api/testDescriptor/:id
router.put('/api/testDescriptor/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('PUT', req.url);
  

  await controller.getTestDescriptorController().editTestDescriptor(param, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//DELETE /api/testDescriptor/:id
router.delete('/api/testDescriptor/:id', async (req, res) => {
  const param = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('DELETE', req.url);
  

  await controller.getTestDescriptorController().deleteTestDescriptor(param)
    .then(() => { return res.status(204).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});



//TEST RESULT
//GET /api/skuitems/:rfid/testResults
router.get('/api/skuitems/:rfid/testResults', async (req, res) => {
  const param = req.params.rfid;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);

  await controller.getTestResultController().getTestResults(param)
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//GET /api/skuitems/:rfid/testResults/:id
router.get('/api/skuitems/:rfid/testResults/:id', async (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);
  let testResult;

  await controller.getTestResultController().getTestResult(paramRfid, paramId)
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//POST /api/skuitems/testResult
router.post('/api/skuitems/testResult', async (req, res) => {

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('POST', req.url);

  await controller.getTestResultController().createTestResult(req.body)
    .then((user) => { return res.status(201).json(user); })
    .catch(error => {  return res.status(error.getCode()).send(error.getMessage()); });
});

//PUT /api/skuitems/:rfid/testResult/:id
router.put('/api/skuitems/:rfid/testResult/:id', async (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('PUT', req.url);

  await controller.getTestResultController().editTestResult(paramRfid, paramId, req.body)
    .then((user) => { return res.status(200).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

//DELETE /api/skuitems/:rfid/testResult/:id
router.delete('/api/skuitems/:rfid/testResult/:id', async (req, res) => {
  const paramRfid = req.params.rfid;
  const paramId = req.params.id;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('DELETE', req.url);

  await controller.getTestResultController().deleteTestResult(paramRfid, paramId)
    .then((user) => { return res.status(204).json(user); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});


module.exports = router