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
  price: {type: E.Money, default: -1, label: 'Original Copy Price', required: false},
  printed_shared: {type: E.Money, default: -1, label: 'printing shared profit for issuer', required: false},
  factory_shared: {type: E.Money, default: -1, label: 'production shared profit for issuer', required: false},
  currency: {
    type: E.Select, default: 'USD', label: '貨幣', options: prp.arr_currencies
  },
  state: {type: E.Select, options: prp.arr_status, default: prp.arr_status[0]},
  createdAt: {type: E.Datetime, noedit: true, default: Date.now}
});
P.defaultColumns = 'stock_full_id|4%, print_limit|4%, currency|2%, price|3%';
P.register();