var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShortUrl = new Schema(
  { fullUrl: String }
)


module.exports = mongoose.model('ShortUrl', ShortUrl);
