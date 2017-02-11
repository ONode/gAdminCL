/**
 * Created by hesk on 17年2月9日.
 */
const model_name = "Basemap";
const p = require('../../lib/common/prepare');
const Schema = new p.mongoose.Schema({
  baseprice: Number,
  license_price: Number,
  print_limit: Number,
  estprice: Number,
  currency: String,
  listing: {
    monetize: Boolean,
    searchable: Boolean
  }
}, {collection: model_name});
const ks_db = require("./../connection")(model_name, Schema);
module.exports = {
  update_basemap_pricing: function (stock_uuid, content, callback) {
    ks_db.updateOnly(stock_uuid, p.l.merge({}, content),
      function (res) {
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
