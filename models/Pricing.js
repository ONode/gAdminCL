/**
 * Created by zJJ on 6/22/2016.
 */
const prp = require('../lib/common/prepare');
const E = prp.keystone.Field.Types;
const ks = prp.keystone;
var P = new ks.List('Pricing', {
  autokey: {from: 'stock_full_id', path: 'key', unique: true},
  map: {name: 'stock_full_id'}
});
P.add({
  stock_full_id: {type: E.Text, default: "", label: 'Original Stock ID', required: true},
  print_limit: {type: E.Number, default: -1, label: 'Printing Limitation', required: false},
  license_price: {type: E.Money, default: -1, label: 'Full License Sale Price', required: false},
  estprice: {type: E.Money, default: -1, label: 'Price After Marked Up', required: false},
  baseprice: {type: E.Money, default: -1, label: 'Original Copy Price', required: false},
  printed_shared: {type: E.Money, default: -1, label: 'printing shared profit for issuer', required: false},
  factory_shared: {type: E.Money, default: -1, label: 'production shared profit for issuer', required: false},
  currency: {
    type: E.Select, default: 'USD', label: '貨幣', options: prp.arr_currencies
  },
  state: {type: E.Select, options: prp.arr_pricing_status, default: prp.arr_pricing_status[0]},
  createdAt: {type: E.Datetime, noedit: true, default: Date.now}
});
P.defaultColumns = 'stock_full_id|4%, print_limit|4%, currency|2%, price|3%';
P.register();
P.schema.pre('remove', function (doc, next) {

});
P.schema.post('save', function (doc, next) {
  if (doc.state == 'pending') {
    ks.get('lb').BASEMAP.update_basemap_pricing(doc._id, {
      "listing.monetize": false,
      "listing.searchable": false
    }, function () {
      return next();
    });
  } else if (doc.state == 'proved_publish') {
    ks.get('lb').BASEMAP.update_basemap_pricing(doc._id, {
      "baseprice": doc.baseprice,
      "license_price": doc.license_price,
      "print_limit": doc.print_limit,
      "estprice": doc.estprice,
      "currency": doc.currency,
      "listing.monetize": true,
      "listing.searchable": true
    }, function () {
      return next();
    });
  } else {
    return next();
  }
});