'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var stormpath = require('express-stormpath');
var mongoose = require('mongoose');


// Create the Express application.

var app = express();

// mongoose.connect('mongodb://localhost/beer_api');

var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/beer_api';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

// set up a variable to hold our model here...
var Schema = require("./models/models");
var UserProfile = Schema.UserProfile;
var Filter = Schema.Filter;

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// The 'trust proxy' setting is required if you will be deploying your
// application to Heroku, or any other environment where you will be behind an
// HTTPS proxy.

app.set('trust proxy',true);

  // We need to setup a static file server that can serve the assets for the
  // angular application.  We don't need to authenticate those requests, so we
  // setup this server before we initialize Stormpath.

app.use('/',express.static(path.join(__dirname, '..', 'client'),{ redirect: false }));

 // Now we initialize Stormpath, any middleware that is registered after this
 // point will be protected by Stormpath.

console.log('Initializing Stormpath');

app.use(stormpath.init(app, {
  web: {
    spa: {
      enabled: true,
      view: path.join(__dirname, '..', 'client','index.html')
    },
    me: {
      expand: {
        customData: true,
        groups: true
      }
    }
  }
}));








// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
  console.log("Something is happening");
  next();
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the Go Filter Yourself api!' });
});

// more routes for our API will happen here
router.route('/filters')

// create
  .post(function(req, res) {

      Filter.create(req.body.filter)
        .then((filter) => {
          res.json({filter});
        })
        .catch((err) => {
          if(err) {
            console.log('Failed to Create', err);
            res.json({Error: 'Failed to Create'});
          }
        });

  })

// index
  .get(function(req, res) {

      Filter.find()
        .then((filters) => {
          res.json({filters});
        })
        .catch((err) => {
          if(err) {
            console.log('Not Found', err);
            res.json({Error: 'Not Found'});
          }
        });

  });


router.route('/filters/:filter_id')

  // show
  .get(function(req, res) {

    Filter.findById(req.params.filter_id)
      .then((filter) => {
        res.json({filter});
      })
      .catch((err) => {
        if(err) {
          console.log('Not Found', err);
          res.json({Error: 'Not Found'});
        }
      });

  })

  // update
  .put(function(req, res) {

    Filter.findByIdAndUpdate(req.params.filter_id, req.body.filter,{new:true})
      .then((filter) => {
        res.json({filter});
      })
      .catch((err) => {
        if(err) {
          console.log('Failed to Update', err);
          res.json({Error: 'Failed to Update'});
        }
      });

  })

  // destroy
  .delete(function(req, res) {

    Filter.findByIdAndRemove(req.params.filter_id)
      .then((filter) => {
        res.json({filter});
      })
      .catch((err) => {
        if(err) {
          console.log('Failed to Delete', err);
          res.json({Error: 'Failed to Delete'});
        }
      });

  });



//
//
// UserProfile ROUTES
//
//






  // more routes for our API will happen here
  router.route('/userprofiles')

  // create
    .post(function(req, res) {

        UserProfile.create(req.body.userprofile)
          .then((userprofile) => {
            res.json({userprofile});
          })
          .catch((err) => {
            if(err) {
              console.log('Failed to Create', err);
              res.json({Error: 'Failed to Create'});
            }
          });

    })

  // index
    .get(function(req, res) {

        UserProfile.find()
          .then((userprofiles) => {
            res.json({userprofiles});
          })
          .catch((err) => {
            if(err) {
              console.log('Not Found', err);
              res.json({Error: 'Not Found'});
            }
          });

    });


  router.route('/userprofiles/:userprofile_id')

    // show
    .get(function(req, res) {

      UserProfile.findById(req.params.userprofile_id)
        .then((userprofile) => {
          res.json({userprofile});
        })
        .catch((err) => {
          if(err) {
            console.log('Not Found', err);
            res.json({Error: 'Not Found'});
          }
        });

    })

    // update
    .put(function(req, res) {

      UserProfile.findByIdAndUpdate(req.params.userprofile_id, req.body.userprofile,{new:true})
        .then((userprofiles) => {
          res.json({userprofiles});
        })
        .catch((err) => {
          if(err) {
            console.log('Failed to Update', err);
            res.json({Error: 'Failed to Update'});
          }
        });

    })

    // destroy
    .delete(function(req, res) {

      UserProfile.findByIdAndRemove(req.params.userprofile_id)
        .then((userprofile) => {
          res.json({userprofile});
        })
        .catch((err) => {
          if(err) {
            console.log('Failed to Delete', err);
            res.json({Error: 'Failed to Delete'});
          }
        });

    });

















// View all routes
router.get("/routes", function(req, res){
  console.log(router.stack);
  res.json(router.stack);
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);









// Now that our static file server and Stormpath are configured, we let Express
// know that any other route that hasn't been defined should load the Angular
//  application.  It then becomes the responsiliby of the Angular application
//  to define all view routes, and rediret to the home page if the URL is not
//  defined.

app.route('/*')
  .get(function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'client','index.html'));
  });

app.post('/profile', bodyParser.json(), stormpath.loginRequired, require('./routes/profile'));


// Start the web server.

app.on('stormpath.ready',function () {
  console.log('Stormpath Ready');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Application running at http://localhost:'+port);
});
