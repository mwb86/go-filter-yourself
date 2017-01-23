var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilterSchema = new Schema({
  name: String,
  description: String,
  apiurl: Number,
  
});

module.exports = mongoose.model('Filter', FilterSchema);
