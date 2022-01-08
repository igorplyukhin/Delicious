const express = require('express');
const router = express.Router();
const objectId = require("mongodb").ObjectId;


router.get('/', async (req, res) => {
  res.render('main', { title: 'Delicious' });
});


router.get(['/reservation/:id', '/reservation/:id:'], async (req, res) => {

  const collection = req.app.locals.collection;
  try {
    const id = new objectId(req.params.id)
    const reservation = await collection.findOne({ _id: id })
    res.render('reservation', reservation);

  } catch (err) { 
    console.log(err);
    res.redirect('/');
  }
})
module.exports = router;
