var express = require('express'),
    router = express.Router();

var dbHelp = require('../db/mongo-util.js'),
    handle = require('../lib/handle.js');

router.get('/', (req, res) => {
  var id = null;
  dbHelp.find(id, (err, results) => {
      res.render('cards', {newObj: results});
  })
})

router.get('/:uniqueID', (req, res) => {
  var id = req.params.uniqueID;
  dbHelp.find(id, (err, results) => {
    res.send(results[0]); // the results array only has one element
    // because id is always unique
  })
});

router.get('/:uniqueID/edit', (req, res) => {
  var id = req.params.uniqueID;
  dbHelp.find(id, (err, results) => {
    res.render('card', {newObj: results});
  })
});

// router.post('/:uniqueID', (req, res) => {
//   var newAns = req.body.value.newAns,
//   id = req.body.value.cardId;
//   console.log('newAns in cards.js is ' + req.body.value.newAns);
//   dbHelp.update(id, newAns, (err, upd) => {
//     handle.errHandle(err, upd, res);
//   })
// })


// router.put('/:uniqueID', (req, res) => {
//   var newAns = req.body.value.newAns,
//   id = req.body.value.cardId;
//   console.log('newAns in cards.js is ' + req.body.value.newAns);
//   dbHelp.update(id, newAns, (err, upd) => {
//     handle.errHandle(err, upd, res);
//   })
// })

// router.post('/delete/:deleteID', (req, res) => {
//   var id = req.body.value;
//   dbHelp.remove(id, (err, del) => {
//     handle.delHandle(err, del, res);
//   })
// })

router.delete('/delete/:deleteID', (req, res) => {
  var id = req.body.value;
  dbHelp.remove(id, (err, del) => {
    handle.delHandle(err, del, res);
  })
})

router.post('/', (req, res) => {
  var requester_name = req.body.value.requester_name;
  var email = req.body.value.email;
  var venmo_username = req.body.value.venmo_username;
  var min_amount = req.body.value.min_amount;
  var max_amount = req.body.value.max_amount;
  var cardC  = req.body.value.cardColor;
  dbHelp.add(requester_name, email, venmo_username, min_amount, max_amount, cardC, (err, upd) => {
    handle.errHandle(err, upd, res);
  });
})

module.exports = router;
