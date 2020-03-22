var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/covid-microgrants-project';
var collection = 'dev-requester-cards';

//ask if right way to pass id as null or hack way
function find(id, callback) {
  mongo.connect(url, (err, db) => {
    var objId = {}
    if (id) {
      objId = {_id: objectId(id)};
      console.log('in mongo-util, objId is ' + objId);
    }
    db.collection(collection).find(objId).toArray(
      (err, results) => {
        db.close();
        callback(err, results);
    })
  })
}

function remove(id, callback) {
  mongo.connect(url, (err, db) => {
    db.collection(collection).remove(
      {_id: objectId(id)},
      (err, del) => {
        db.close();
        callback(err, del);
      }
    )
  })
}

// function update(id, newAns, callback) {
//   mongo.connect(url, (err, db) => {
//     db.collection(collection).update(
//       {_id: objectId(id)},
//       {$set: {answer: newAns}},
//       (err, upd) => {
//         db.close();
//         callback(err, upd);
//       }
//     )
//   })
// }

function add(new_requester_name, new_email, new_venmo_username, new_min_amount_requested, new_max_amount_requested, cardColor, callback) {
  mongo.connect(url, (err, db) => {
    db.collection(collection).insert({requester_name: new_requester_name, email: new_email, venmo_username: new_venmo_username, min_amount: new_min_amount_requested, max_amount: new_max_amount_requested, cardColor: cardColor},
      (err, upd) => {
        db.close();
        callback(err, upd);
      });
  });
}

module.exports = {
  find,
  remove,
  // update,
  add
}
