var express = require('express'),
    mongoose = require('mongoose'),
    shortUrl = require('./shortUrl'),
    autoIncrement = require('mongoose-auto-increment')

var app = express()
app.set('port', (process.env.PORT || 5000));
var connection = mongoose.connect('mongodb://localhost:27017/urls')

app.get('/n/:url', function(req, res){
  var newDoc = new shortUrl({ 'full': req.params.url });
                   newDoc.save(function (err, doc) {
                       if (err) { throw err; }
                        var url = {
                          full_Url: doc.full,
                          short_Url: doc.short
                        }
                       res.json(url);
                   });
})

app.get('/', function(req, res){
     res.sendFile(process.cwd() + '/index.html')
} )

app.get('/go/:shortUrl', function(req, res){
  shortUrl.findOne({ short: req.params.shortUrl }, function(err, shortUrl){
      if (err) { throw err; }
      if (shortUrl){
          res.redirect("http://" + shortUrl.full)
      }else{
        res.redirect('/')
      }

  })

})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
