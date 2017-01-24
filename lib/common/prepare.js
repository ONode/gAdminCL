/**
 * Created by hesk on 17年1月24日.
 */
const ks = require('keystone');
const _ = require('lodash');
const E = ks.Field.Types;

const listDistrictOptions = function () {
  "use strict";
  var h = ks.get('district_hk_islandhk');
  var b = ks.get('district_hk_kowloon');
  var c = ks.get('district_hk_nt');
  var d = ks.get('district_jp_tokyo');
  var e = ks.get('district_jp_osaka');
  var f = ks.get('district_tha');
  var g = ks.get('district_usa_vegas');
  return h.concat(b, c, d, e, f, g);
};


module.exports = {
  fnList_locations: listDistrictOptions(),
  arr_languages: ks.get('CMS languages'),
  arr_countries: ks.get('CMS countries'),
  arr_cup_sizes: ks.get('CMS sizes'),
  arr_status: ks.get('item_status'),
  arr_currencies: ks.get('currency'),
  keystone: ks,
  l: _,
  Types: E
};