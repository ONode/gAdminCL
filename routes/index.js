/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

const keystone = require('keystone-z');
const middleware = require('./middleware.js');
/*const user_api = require('./util/user_operation.js');
const feature_api = require('./util/smartlistfeaturephoto.js');
const comment_api = require('./util/comment.js');
const image_api = require('./util/imageapi.js');
const price_api = require('./util/pricing.js');
const coins_api = require('./util/creditsystem.js');
const app_api = require('./util/downloadapp.js');
const tag_api = require('./util/featureupdate.js');
const overhead_api = require('./util/overhead.js');
const list_api = require('./util/listing_api.js');*/
const rest = require('restful-keystone-onode')(keystone, {
  root: "/api/v1"
});
const importRoutes = keystone.importer(__dirname);
// Common Middleware
keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.externalSchema);
keystone.set('404', function (req, res, next) {
  res.status(404).render('errors/404');
});
/*
function initRestfulAPIKeyStone() {
  "use strict";
  rest.expose({
    UserAdmin: {
      filter: {
        isAdmin: false
      },
      show: ['cellPhone', 'customization']
    }
  })
  .before('create', {
      User: user_api.create_user_basic
    })
  .before('update', {
      User: user_api.update_user_basic
    })
  .after('create', {
      Article: comment_api.create_article_comment_after
    })
  .before('list',
      {
        Profile: list_api.list_profile_before
      }
    )
  .start();
}*/
// Import Route Controllers
var routes = {
  views: importRoutes('./views')
};
//download: importRoutes('./../lib/export/users')
var api = {
  token: importRoutes('./api/').token
};
// Setup Route Bindings
exports = module.exports = function (app) {
  // Views
  app.get('/', routes.views.index);
  //initRestfulAPIKeyStone();
  app.all('/api/token*', middleware.requireUser);
  app.all('/api/token', api.token);
  //app.post('/api/login', user_api.user_login_short_token);
};
