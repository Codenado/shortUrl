var express = require('express'),
    mongoose = require('mongoose'),
    shortUrl = require('./shortUrl'),
    bodyParser = require('body-parser'),
    autoIncrement = require('mongoose-auto-increment')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/vnd.api+json'}))

var connection = mongoose.connect('mongodb://localhost:27017/urls')

app.get('/new/:url', function(req, res){
  var newDoc = new shortUrl({ 'fullUrl': req.params.url });
                   newDoc.save(function (err, doc) {
                       if (err) { throw err; }

                       res.json(doc);
                   });
})

app.get('/', function(req, res){
     res.send('enter a url')
} )

app.get('/go/:shortUrl', function(req, res){
  shortUrl.findOne({ _id: req.params.shortUrl }, function(err, shortUrl){
      if (err) { throw err; }
      if shortUrl{
          res.redirect("http://" + shortUrl.fullUrl)
      }else{
        res.redirect('/')
      }

  })

})

app.listen(8080)
