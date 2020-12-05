var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("fruitsDB");

    var myobj = [
        {
            name: "Apple",
            review: "Keeps docs away lololol",
            rating: 8
        },
        {
            name: "Banana",
            review: "Most sexualised fruit of all time",
            rating: 9
        },
        {
            name: "Papaya",
            review: "Chee",
            rating: 2
        }
    ];
    dbo.collection("fruits").insertMany(myobj, function (err, res) {
        if (err) throw err;
        console.log(res.insertedCount + "document inserted");
        db.close();
    });
});