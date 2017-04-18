const prp = require('../lib/common/prepare');
const asy = require('async');
const settings = prp.cfg;
/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 *
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */
exports = module.exports = function (done_final) {
  asy.series([function (cb) {

    asy.forEach(settings.roles, function (src, done) {
      console.log("src", src);
      var r = new prp.keystone.list('Role').model(src);
      if (r == null) {
        return done(new Error("not working"));
      }
      r.name = src.name;
      r.rolekey = src.ref;
      r.save(function (err) {
        if (err) {
          console.error("Error adding Role " + src.name + " to the database:");
          console.error(err);
        } else {
          console.log("Added Role " + r.name + " to the database.");
        }
        done(err);
      });
    }, cb);

  }, function (cb) {

    asy.forEach(settings.admins, function (_admin, done) {
      var newAdmin = new prp.keystone.list('UserAdmin').model(_admin);
      newAdmin.isAdmin = true;
      newAdmin.save(function (err) {
        if (err) {
          console.error("Error adding admin " + _admin.email + " to the database:");
          console.error(err);
        } else {
          console.log("Added admin " + _admin.email + " to the database.");
        }
        done(err);
      });
    }, cb);

  }], function (err, cb) {

    done_final();

  });

};
