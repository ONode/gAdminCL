/**
 * Created by hesk on 12/21/2014.
 */
const prp = require('../lib/common/prepare');
const T = prp.keystone.Field.Types;
const ks = prp.keystone;
var Tokenized = new ks.List('Tokenized', {
    map: {name: 'token'},
    nocreate: true,
    defaultSort: '-expire'
});
Tokenized.add({
    user: {noedit: true, type: T.Relationship, ref: 'UserAdmin'},
    token: {noedit: true, type: T.Text, index: true},
    expire: {noedit: true, type: T.Datetime},
    isvalid: {type: T.Boolean},
    object: {
        index: true,
        type: T.Select,
        options: [
            {value: 'registration', label: 'registration'},
            {value: 'login', label: 'login'},
            {value: 'refillcredit', label: 'credit refill'}
        ],
        default: 'registration'
    }
});
Tokenized.defaultColumns = 'object|5%, token|20%, expire|5%, user|5%';
Tokenized.register();