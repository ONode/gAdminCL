/**
 * Created by Hesk on 2/1/2015.
 */
const prp = require('../lib/common/prepare');
const E = prp.keystone.Field.Types;
var Role = new prp.keystone.List('Role', {
    autokey: { path: 'key', from: 'name', unique: true },
    track: true
});

Role.add({
    name: { type: String, required: true, index: true },
    rolekey: {type: E.Text, initial: true, index: true}
});

// Relationship definitions are optional
//Role.relationship({ ref: 'UserAdmin', refPath: 'roles', path: 'usersWithRole' });
/*Role.relationship({ ref: 'Permission', refPath: 'create', path: 'createsWithRole' });
Role.relationship({ ref: 'Permission', refPath: 'read', path: 'readsWithRole' });
Role.relationship({ ref: 'Permission', refPath: 'update', path: 'updatesWithRole' });
Role.relationship({ ref: 'Permission', refPath: 'delete', path: 'deletesWithRole' });*/

Role.defaultColumns = 'name';
Role.register();

module.exports = Role;
