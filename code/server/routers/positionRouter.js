const express = require('express')
const router = express.Router();
const Controller = require('../modules/logic/controller')

//POSITION
//GET /api/positions
router.get('/api/positions', async(req, res) => {
  
  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('GET', req.url);

  await controller.getPositionController().getAllPositions()
    .then((positions) => { return res.status(200).json(positions); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });

});

//POST /api/position
router.post('/api/position', async (req, res) => {
  

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('POST',req.url);


  await controller.getPositionController().createPosition(req.body)
    .then(() => { return res.status(201).end(); })
    .catch(error => {return res.status(error.getCode()).send(error.getMessage()); });

});

//PUT /api/position/:positionID
router.put('/api/position/:positionID', async (req, res) => {
  const param = req.params.positionID;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('PUT',req.url);

  await controller.getPositionController().editPositionVer1(param, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });

});

//PUT /api/position/:positionID/changeID
router.put('/api/position/:positionID/changeID', async (req, res) => {
  const param = req.params.positionID;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('PUT',req.url);

  await controller.getPositionController().editPositionVer2(param, req.body)
    .then(() => { return res.status(200).end(); })
    .catch(error => {return res.status(error.getCode()).send(error.getMessage()); });

});

//DELETE /api/position/:positionID
router.delete('/api/position/:positionID', async (req, res) => {
  const param = req.params.positionID;

  /** @type {Controller} */
  const controller = req.app.get("controller");
  //console.log('DELETE',req.url);

  await controller.getPositionController().deletePosition(param)
    .then((user) => { return res.status(204).end(); })
    .catch(error => { return res.status(error.getCode()).send(error.getMessage()); });
});

module.exports = router;