const express = require('express');
const path = require('path');
const router = require('./route/first');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded ( { extended:false } ) );//body parser

app.use(express.static(path.join(__dirname,'public')));//server static files

app.set('view engine','ejs'); //setting the view

app.use('/', router);


//error handling
app.use((req,res,next)=>{
    var err = new Error('Page not found!');
    err.status = 404;
    next(err);
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send(err.message);
})

//server
app.listen(PORT, () => {
    console.log('server is running smoothly');
});

module.exports = app;