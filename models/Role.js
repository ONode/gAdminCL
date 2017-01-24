/**
 * Created by Hesk on 2/1/2015.
 */
const prp = require('../lib/common/prepare');
const E = prp.keystone.Field.Types;
var Role = new prp.keystone.List('Role', {
    autokey: {from: 'name', path: 'key', unique: true}
});
Role.add({
    name: {type: E.Text, initial: true, index: false},
    rolekey: {type: E.Text, initial: true, index: true}
});
Role.relationship({ref: 'UserAdmin', path: 'roles'});
Role.defaultColumns = 'name|50%, rolekey|50%';
Role.register();