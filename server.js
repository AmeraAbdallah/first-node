const express = require('express');
const hbs = require('hbs');
//const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine' , 'hbs');

app.use((req , res , next) =>{
  res.render('mentaince.hbs');
});
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
//   fs.appendFile('server.log' , log + '\n' , (error) =>{
//   if(error){
//   console.log('there is some thing wrong');
// }
// });
  console.log(log);
  next();
});

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req , res) => {
  res.render('Home.hbs',{
    pageTitle : 'Home Page',
    welcomeMessege :'welcome to my website'
  });
});

app.get('/about',(req , res) =>{
  res.render('about.hbs',{
    pageTitle : 'About Page'
  });
});

app.get('/bad',(req,res) =>{
  res.send({
    errorMessege : 'an error'
  });
})
app.listen(3000);
