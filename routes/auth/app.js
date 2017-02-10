/**
 * Created by hesk on 12/16/14.
 */
var keystone = require('keystone-z');
exports = module.exports = function (req, res) {
    var view = new keystone.View(req, res),
        locals = res.locals;
    locals.authUser = req.session.auth;
    view.render('auth/app');
}