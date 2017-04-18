/**
 * Created by hesk on 17年2月9日.
 * keystone middleware for connection db to external mongodb
 */

var
  cf = require("./lbconfig"),
  async = require("async"),
  mongodb = require("mongodb"),
  Db = mongodb.Db,
  MongoClient = mongodb.MongoClient,
  Server = mongodb.Server,
  ReplSetServers = mongodb.ReplSetServers,
  ObjectID = mongodb.ObjectID,
  Binary = mongodb.Binary,
  GridStore = mongodb.GridStore,
  Grid = mongodb.Grid,
  Code = mongodb.Code,
  assert = require("assert"),
  error_ks = "ks error",
  p = require("../lib/common/prepare");


var connector_settings = {
  native_parser: true
};


var internal_connect = function (url, transaction_callback) {
  mongodb.MongoClient.connect(url, connector_settings, function (err, db) {
    if (!err) {
      transaction_callback(null, db)
    } else {
      transaction_callback(err, db);
    }
  });
};
var ensureVariableInteger = function (Query, item) {
  if (!p.l.isUndefined(Query.where[item])) {
    Query.where[item] = parseInt(Query.where[item]);
  }
};
var connection_db = function (connected, model, schema) {
  this.init(connected, model, schema);
  schema.on('index', function(error) {
    // "_id index cannot be sparse"
    console.log(error.message);
  });
  var self = this;
  return {
    find: function (_idstring, result_callback) {
      self.Model.findOne({
        _id: ObjectID(_idstring)
      }).then(function (myDocument) {
        result_callback(myDocument);
      });
    },
    findByAttrKey: function (keyName, SimpleValue, result_callback) {
      self.Model.find({
        keyName: SimpleValue
      }).then(function (cursor) {
        var myDocument = cursor.hasNext() ? cursor.next() : null;
        result_callback(myDocument);
      });
    },
    findByAttrKeyPagination: function (keyName, SimpleValue, result_callback, _skip, _limit) {
      self.Model.find({
        keyName: SimpleValue
      }).skip(_skip).limit(_limit).then(function (cursor) {
        var myDocument = cursor.hasNext() ? cursor.next() : null;
        result_callback(myDocument);
      });
    },
    findByAttrKeyAdvancePagination: function (objectQuery, result_callback, _skip, _limit) {
      self.Model.find(objectQuery).skip(_skip).limit(_limit).then(function (cursor) {
        result_callback(cursor.toArray());
      });
    },
    findByAttrKeyAdvance: function (objectQuery, result_callback) {
      self.Model.find(objectQuery).then(function (cursor) {
        result_callback(cursor.toArray());
      });
    },
    updateOnly: function (_id_, object, result_callback) {
      try {
        if (p.l.isEmpty(_id_)) {
          throw new Error("id is null");
        }
        //  console.log("operation count", object);
        //  self.Model.findById("_id", ObjectID(_id_)).count(function (err, __count) {
        //  console.log("operation __count", __count);
        //  if (__count > 0) {
        //  console.log("operation $set", object);
        //  console.log("operation self model", self.Model);
        //  upsert: when no match is found.. the new document is insert to the collection
        self.Model.findByIdAndUpdate(
          _id_,
          {$set: object},
          {upsert: false},
          function (err, result) {
            if (p.l.isError(err)) {
              console.log("operation $set done", err);
              console.log("================");
              result_callback(err);
              return;
            }
            console.log(">> can or cannot find the item from ", _id_);
            console.log("operation $set done", result);
            console.log("================");
            result_callback(result);
          });

        // result_callback(object);

        //  } else {
        /*    console.log("================");
         console.log(">> cannot find the item from ", _id_);
         console.log("================");*/
        //   result_callback(null);
        //  }


      } catch (e) {
        console.log(error_ks, e);
      }

    },
    insertOrUpdate: function (_id_, object, result_callback) {
      try {
        if (p.l.isEmpty(_id_)) {
          throw new Error("id is null");
        }
        console.log("operation count", object);
        self.Model.where({
          _id: ObjectID(_id_)
        }).count(function (__count) {
          if (__count > 0) {
            //var out_pairs = {};
            /*  p.l.each(object, function (value, key) {
             var k = p.l.replace(key, ".", "%");
             out_pairs[k] = value;
             });*/
            console.log("operation $set", object);
            //upsert: when no match is found.. the new document is insert to the collection
            self.Model.findOneAndUpdate({_id: ObjectID(_id_)}, {$set: object},
              {upsert: false}, function (err, result) {
                console.log("operation $set done", object);
                console.log("================");
                result_callback(result);
              });
          } else {

            self.Model.insertOne(p.l.defaults(
              {_id: new ObjectID(_id_)}, object
            )).then(function (result) {
              result_callback(result);
            });
          }
        });

      } catch (e) {
        console.log(error_ks, e);
      }
    }
  }
};
connection_db.prototype.castInt = function (q, value) {
  return ensureVariableInteger(q, value);
};
connection_db.prototype.init = function (connected_db, c_model, schema) {
  this.Model = connected_db.model(c_model, schema);
  console.log("initialize external db model:", c_model);
};
var connection = null;
module.exports = function (model_b, schema) {
  if (connection == null) {
    connection = p.mongoose.createConnection(cf.connector_lb_url);
  }
  return new connection_db(connection, model_b, schema);
};
