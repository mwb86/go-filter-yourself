var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var FilterSchema = new Schema({
  name: String,
  description: String,
  apiurl: String,
  sample_image_url: String
});

var UserProfileSchema = new Schema({
  name: String,
  username: String,
  favorites: [FilterSchema]
});

var FilterModel = mongoose.model('Filter', FilterSchema);
var UserProfileModel = mongoose.model('UserProfile', UserProfileSchema);

module.exports = {
  UserProfile: UserProfileModel,
  Filter: FilterModel
};
