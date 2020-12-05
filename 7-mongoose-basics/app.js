const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/peopleDB', { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = {
    name: { //Adding validations
        type: String,
        required: [true, 'Y no name??']
    },
    age: {
        type: Number,
        max: [100, "That's too old"],
        min: [0, "Can't be -ve number"]
    }
}

const Person = mongoose.model('Person', personSchema);

//CREATE Operations

//const john = new Person({ name: 'John', age: 32 }); (Adding single doc, have to save later)
const jim = new Person({ name: 'Jim Halpert', age: 32 });
const dwight = new Person({ name: 'Dwight Schrute', age: 35 });

//john.save().then(() => console.log('added')); (HERE: saving the change made of adding one doc)

//Person.insertMany([jim, dwight], (err) => { (Adding multiple docs)
//   console.log(err);
//});

//READ Operations

/* Person.find((err, people) => {
    if (err)
        console.log(err);
    else {
        console.log(people); //people is an array
    }
}); */

//Reading and logging out just the names

/* Person.find((err, people) => {
    if (err)
        console.log(err);
    else {
        mongoose.connection.close();
        people.forEach(person => {
            console.log(person.name);
        });
    }
}); */

/* const lalit = new Person({ name: "L. Lalit", age: 17 });
lalit.save().then((err) => {
    mongoose.connection.close();
}); */

//UPDATE Operations

/* Person.updateOne({ name: "John" }, { name: "John Wick", age: 40 }, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Updated");
}); */

//DELETE Operation

/* Person.deleteOne({ name: "L. Lalit" }, (err) => {
    if (err)
        console.log(err);
    else
        console.log("Deleted");
}); */



