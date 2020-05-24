const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');  
const Article = require('./../models/articles')
const url = process.env.MONGODB_URI || 'mongodb://localhost/blog' //url for the database connection

mongoose.connect( url , { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

router.get('/', (req,res,next)=>{
    res.render(__dirname + '/views/first.ejs');
});

//read router
router.get('/read', async (req,res,next)=>{
    const article = await Article.find().sort({createdAt: 'desc'})
    res.render(__dirname + '/views/read.ejs', { articles : article });
});

//write router to direct the user to the write page
router.get('/write', (req,res,next)=>{
    res.render(__dirname + '/views/write.ejs');
});

//router to show any particular blog by id
router.get('/:id',  (req, res) => {
    
    Article.findOne({_id : req.params.id}, function(err,obj) { 
        res.render(__dirname + '/views/show.ejs', { article : obj });
     })
   
})

//submit router
router.post('/submit', async (req,res)=>{
    let article = new Article({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
       article =  await article.save(),
       res.render(__dirname + '/views/show.ejs', {article : article});
    }catch(e){
        res.render(__dirname + '/views/write.ejs',{ article : article })//redirect the user to write page with the previous content already loaded.
    }
})


 module.exports = router;

