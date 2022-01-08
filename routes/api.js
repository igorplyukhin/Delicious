// /api/v1
const express = require('express');
const router = express.Router();


router.post('/book_table', async (req, res) => {
  const collection = req.app.locals.collection;
  let order = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    date: req.body.date,
    time: req.body.time,
    people: req.body.people,
    message: req.body.message,
  }

  try {
    const users = await collection.insertOne(order)
    console.log(users);
    res.send(users.insertedId.toString());
  }
  catch (err) { return console.log(err); }
});

module.exports = router;
