const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');  
const Article = require('./../models/articles')
const url = process.env.MONGODB_URI || 'mongodb://localhost/blog'

mongoose.connect( url , { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})

router.get('/', (req,res,next)=>{
    res.render(__dirname + '/views/first.ejs');
});


router.get('/read', async (req,res,next)=>{
    const article = await Article.find().sort({createdAt: 'desc'})
    res.render(__dirname + '/views/read.ejs', { articles : article });
});

router.get('/write', (req,res,next)=>{
    res.render(__dirname + '/views/write.ejs');
});

router.get('/:id',  (req, res) => {
    
    Article.findOne({_id : req.params.id}, function(err,obj) { 
        res.render(__dirname + '/views/show.ejs', { article : obj });
     })
   
})

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
        res.render(__dirname + '/views/write.ejs',{ article : article })
    }
})


 module.exports = router;

