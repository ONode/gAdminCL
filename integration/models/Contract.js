/**
 * Created by hesk on 17年2月9日.
 */
const p = require('../../lib/common/prepare');
const model_name = "Contract";
const Schema = new p.mongoose.Schema({
  photo_id_a: String,
  photo_id_b: String,
  cert_a: String,
  cert_b: String,
  agreement_type: String,
  status: String,
  path: String,
  path_aws: String,
  name_agent: String,
  name_agent_id: String,
  name_artist: String,
  name_artist_id: String,
  corp_name: String,
  corp_id: String,
  corp_pos: String,
  createtime: Date,
  updatetime: Date
}, {collection: model_name})
const ks_db = require("./../connection")(model_name, Schema);
module.exports = {
  update_artist: function (artist_id, content, callback) {
    ks_db.insertOrUpdate(artist_id, p.l.merge({
        key: artist_id,
        state: "pending"
      }, content),
      function (res) {
        //console.log("item", res);
        callback();
      });
  },
  get_artist_single: function (stock_id, callback) {
    ks_db.find(stock_id,
      function (res) {
        callback(res);
      });
  },
  ListPublic: function (queryObjectContex, callback) {
    ks_db.lbQueryLooper(queryObjectContex, {
      state: "proved_publish"
    }, function (err, res) {
      callback(err, res);
    });
  }
};
