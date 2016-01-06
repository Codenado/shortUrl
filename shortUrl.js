var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment')

var connection = mongoose.createConnection('mongodb://localhost:27017/urls')
autoIncrement.initialize(connection)

var ShortUrl = new Schema(
  { fullUrl: String }
)

ShortUrl.plugin(autoIncrement.plugin, 'ShortUrl')
module.exports = mongoose.model('ShortUrl', ShortUrl);
