/**
 * Created by Hesk on 14年12月17日.
 */
var keystone = require('keystone-z'),
    csv = require('csv');

module.exports = function (req, res) {
    keystone.list('UserAdmin').model.find().exec(function (err, results) {
        var users = results.map(function (i) {
            return {
                first_name: i.name.first,
                last_name: i.name.last,
                email: i.email
            }
        });
        csv().from(users).to(
            res.attachment('users.csv'),
            {
                header: true,
                columns: ['first_name', 'last_name', 'email']
            }
        );

    });
};