/**
 * Created by hesk on 17年1月24日.
 */
const prp = require('../lib/common/prepare');
const E = prp.keystone.Field.Types;
const ks = prp.keystone;
var Issue = new ks.List('Issue', {
  autokey: {from: 'subject_type', path: 'idname', unique: true},
  map: {name: 'subject_id'},
  sortable: true
});
Issue.add({
  idname: {type: E.Text, noedit: true, label: 'Access by user'},
  subject_id: {type: E.Text, label: 'stock id'},
  violation_code: {type: E.TextArray, label: 'code'},
  subject_type: {type: E.Text, label: 'subject type'},
  additional: {type: E.Text, label: 'additional'},
  create: {type: E.Datetime, noedit: true, default: Date.now}
});
Issue.defaultColumns = 'subject_id, violation_code|15%, create|10%';
Issue.register();