// seed filter data

var mongoose = require('mongoose');


var Schema = require("./models.js");
var UserProfile = Schema.UserProfile;
var Filter = Schema.Filter;

mongoose.Promise = global.Promise;

var mongoURI =  process.env.MONGODB_URI || 'mongodb://localhost/beer_api';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;


Filter.remove({}, function(err) {
  console.log(err);
});

// UserProfile.remove({}, function {
//   console.log(err);
// });

var filter1 = new Filter({
  name: 'Filter One',
  description: 'A cool filter',
  apiurl: 'http://test.com',
  sample_image_url:'../img/test.jpg'
});

var filter2 = new Filter({
  name: 'Filter Two',
  description: 'A cooler filter',
  apiurl: 'http://test.com',
  sample_image_url:'../img/test.jpg'
});

var filter3 = new Filter({
  name: 'Filter Three',
  description: 'A way cool filter',
  apiurl: 'http://test.com',
  sample_image_url:'../img/test.jpg'
});

var filter4 = new Filter({
  name: 'Filter Four',
  description: 'A way cooler filter',
  apiurl: 'http://test.com',
  sample_image_url:'../img/test.jpg'
});

var filter5 = new Filter({
  name: 'Filter Five',
  description: 'A bad filter',
  apiurl: 'http://test.com',
  sample_image_url:'../img/test.jpg'
});

var filter6 = new Filter({
  name: 'Filter Six',
  description: 'A very good filter',
  apiurl: 'http://test.com',
  sample_image_url:'../img/test.jpg'
});

var filter7 = new Filter({
  name: 'Filter Seven',
  description: 'A middling filter',
  apiurl: 'http://test.com',
  sample_image_url:'../img/test.jpg'
});

var filter8 = new Filter({
  name: 'Filter Eight',
  description: 'A great filter',
  apiurl: 'http://test.com',
  sample_image_url:'../img/test.jpg'
});

var filter9 = new Filter({
  name: 'Filter Nine',
  description: 'A awesome filter',
  apiurl: 'http://test.com',
  sample_image_url:'../img/test.jpg'
});

var filter10 = new Filter({
  name: 'Filter Ten',
  description: 'A pretty filter',
  apiurl: 'http://test.com',
  sample_image_url:'../img/test.jpg'
});

var filters = [filter1, filter2, filter3, filter4, filter5, filter6, filter7, filter8, filter9, filter10];

filters.forEach((fil, i) => {
  // fil.items.push(menus[i], menus[i+1]);   // Assigning each author multiple reminders
  fil.save((err, fil) => {
    if (err){
      console.log(err);
    } else {
      console.log(fil);
    }
  });
});
