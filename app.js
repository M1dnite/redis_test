const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');

let client = redis.createClient();

// redis part
client.on('connect', function(){
  console.log('Connected to Redis boys');
});

const port = 8000;
const app =  express();

app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(methodOverride('_method'));

app.get('/', function(req, res, next){
    res.render('searchusers');
  });

  app.post('/user/search', function(req, res, next){
    let id = req.body.id;
  
    // this part is to connect connect the mongo queries

    client.hgetall(id, function(err, obj){
      if(!obj){
        res.render('searchusers', {
          error: 'User doesnt exist you fool !'
        });
      } else {
        obj.id = id;
        
        
      }
    });
  });

  app.listen(port, function(){
    console.log('Server started on port '+port);
  });