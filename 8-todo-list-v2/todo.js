const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dateObj = require(__dirname + "/date.js");
const _ = require("lodash");
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb+srv://admin-akshay:Test123@cluster0.icp4w.mongodb.net/todolistDB', { useNewUrlParser: true, useUnifiedTopology: true });
const taskSchema = { name: String };
const Item = mongoose.model('Item', taskSchema);

//FOR Custom list
const listSchema = {
    name: { type: String },
    items: [taskSchema]
};
const List = mongoose.model("List", listSchema);


const item1 = new Item({ name: "Welcome to your todo list!" });
const item2 = new Item({ name: "Click + to Add task" });
const item3 = new Item({ name: "<== Click to Delete task" });
const defaultItems = [item1, item2, item3];

app.get('/', (req, res) => {
    var tasksArr = [];



    Item.count(function (err, count) {
        if (!err && count === 0) {
            Item.insertMany(defaultItems);

        }
    });

    Item.find((err, items) => {
        if (err)
            console.log("Error is: " + err);
        else {
            var date = dateObj.getDate();

            items.forEach(element => {
                tasksArr.push(element.name);
            });
            res.render('list', {
                Title: date,
                tasksArr: items
            });
        }
    });



});

app.post('/', (req, res) => {
    var t = req.body.task;
    const newItem = new Item({ name: t });
    newItem.save();
    res.redirect('/');
    console.log(req.body);
});

app.post('/delete', (req, res) => {
    var checkedItemID = req.body.checkBox;
    const listName = req.body.listName;

    if (listName === dateObj.getDate()) {
        Item.findByIdAndRemove(checkedItemID, function (err) {
            if (!err) {
                console.log("Deleted");
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemID } } }, function (err, foundList) {
            if (!err)
                res.redirect("/" + listName);
        });
    }

});

app.get('/:customlistName', (req, res) => {
    const customListName = _.capitalize(req.params.customlistName);
    List.findOne({ name: customListName }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect('/' + customListName);
            }
            else {
                res.render('list', {
                    Title: customListName,
                    tasksArr: foundList.items
                });
            }
        }
    });

});

app.post('/:customlistName', (req, res) => {
    const customListName = req.params.customlistName
    var t = req.body.task;
    const item = new Item({ name: t });

    List.findOne({ name: customListName }, (err, foundList) => {
        console.log(foundList)
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + customListName);
    });


});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})