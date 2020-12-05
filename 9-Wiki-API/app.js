const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/wikiDB', { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model('Article', articleSchema);

//Routes Targeting All Articles

app.route("/articles")

    //GET route that fetch all articles
    .get((req, res) => {

        Article.find(function (err, foundArticles) {
            if (!err)
                res.send(foundArticles);
            else
                res.send(err)
        });

    })

    //POST new article

    .post((req, res) => {
        console.log(req.body.title);
        console.log(req.body.content);
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save((err) => {
            if (!err)
                res.send("Article Added");
            else
                res.send(err);
        });
    })

    //DELETE all articles

    .delete((req, res) => {
        Article.deleteMany(function (err) {
            if (!err)
                res.send("All Articles Deleted!");
            else {
                res.send(err);
            }
        });
    });


//Routes Targeting Specific Articles

app.route("/articles/:articleName")

    //GET route that fetch a particular articles

    .get((req, res) => {
        const articleName = req.params.articleName
        Article.findOne({ title: articleName }, function (err, foundArticles) {
            if (!err)
                res.send(foundArticles);
            else
                res.send(err)
        });

    })

    //PUT 

    .put((req, res) => {
        const articleName = req.params.articleName
        Article.update(
            { title: articleName }, //condition
            { title: req.body.title, content: req.body.content }, // kinda like post request
            { overwrite: true },
            function (err) {
                if (!err)
                    res.send("Updated!");
            }
        )
    })

    //PATCH

    .patch((req, res) => {
        Article.update(
            { title: req.params.articleName }, //condition
            { $set: req.body },
            function (err) {
                if (!err)
                    res.send("Patched!");
            }
        )
    })

    //DELETE

    .delete((req, res) => {
        Article.deleteOne(
            { title: req.params.articleName }, //condition
            function (err) {
                if (!err)
                    res.send("Deleted!");
            }
        )
    })




app.listen(3000, () => {
    console.log("Server running on port 3000");
});