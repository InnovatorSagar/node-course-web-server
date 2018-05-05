const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('currentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now},${req.method},${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err)
    {
      console.log('Unable to append server.log.');
    }
  });
   next();
});
// app.use((req,res,next)=>{
//   res.render('Maintenance.hbs');
//
// });

app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
  //res.send('<b>Hello Express!</b>');
  res.render('home.hbs',{
    welcomeMessage:'Ajja bhosdi k!!',
    pageTitle: 'Home Page',
    currentYear : new Date().getFullYear()
  });
});
app.set('view engine','hbs');

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
    currentYear : new Date().getFullYear()
  });
});

app.get('/bad',(req,res)=>{
  res.send({
    error:'Unable to process this request.'
  });
});

app.listen(port,()=>{
  console.log(`Sever is up on ${port}`);
});
