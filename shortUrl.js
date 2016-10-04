var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment')

var connection = mongoose.createConnection(process.env.MONGODB_URI|| 'mongodb://localhost:27017/urls')
autoIncrement.initialize(connection)

var ShortUrl = new Schema(
  {
    full: String,
    short: Number
   }
)

ShortUrl.plugin(autoIncrement.plugin, { model: 'ShortUrl', field: 'short' })
module.exports = mongoose.model('ShortUrl', ShortUrl);
