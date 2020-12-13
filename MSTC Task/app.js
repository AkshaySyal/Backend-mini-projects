const express = require('express')
const bodyParser = require('body-parser')
const _ = require("lodash")
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const app = express()


app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

const pcMap = new Map([['Data Structure & Algorithm', [4, 0]], ['Applied Linear Algebra', [4, 0]], ['Introduction to Programming', [2, 0]], ['PDC', [3, 0]], ['Digital Logic and Design', [4, 0]]])
const peMap = new Map([['Blockchain', [3, 0]], ['Software Engineering', [4, 0]], ['Artificial Intelligence', [4, 0]], ['Data Visualization', [4, 0]], ['Image Processing', [4, 0]]])
const ucMap = new Map([['Engineering Chemistry', [4, 0]], ['OOPS', [3, 0]], ['Lean Start-up Management', [2, 0]], ['Engineering Physics', [4, 0]], ['Ethics and Values', [2, 0]]])
const ueMap = new Map([['Cryptography Fundamentals', [4, 0]], ['Micro Kernel OS', [4, 0]], ['Data Mining', [4, 0]], ['Web Mining', [4, 0]], ['Computer Vision', [4, 0]]])
var totalCredits = 0;
var success = "";

app.use(session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());



mongoose.connect('mongodb+srv://admin-akshay:Test123@cluster0.icp4w.mongodb.net/coursesDB', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

const courseSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    courses: Array
});


courseSchema.plugin(passportLocalMongoose);
const User = new mongoose.model("User", courseSchema);
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/pc');
    } else {
        res.redirect('/register');
    }

})

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect("/");
})

app.get('/register', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/register', (req, res) => {
    User.register({ username: req.body.username }, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/pc');
            })
        }
    })
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (err, user) => {
        if (err) {
            console.log(err);

        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/pc');
            })
        }
    })
});


app.get('/:customlistName', (req, res) => {
    if (req.isAuthenticated()) {
        const customListName = _.capitalize(req.params.customlistName);
        var m = pcMap;
        title = "";

        User.findOne({ username: req.user.username }, (err, foundList) => {

            //Re initialise courses map
            for (var k of pcMap.keys()) {
                pcMap.set(k, [pcMap.get(k)[0], 0]);
            }
            for (var k of peMap.keys()) {
                peMap.set(k, [peMap.get(k)[0], 0]);
            }
            for (var k of ucMap.keys()) {
                ucMap.set(k, [ucMap.get(k)[0], 0]);
            }
            for (var k of ueMap.keys()) {
                ueMap.set(k, [ueMap.get(k)[0], 0]);
            }
            totalCredits = 0;


            for (var i = 0; i < foundList.courses.length; i++) {
                if (pcMap.has(foundList.courses[i])) {
                    pcMap.set(foundList.courses[i], [pcMap.get(foundList.courses[i])[0], 1]);
                    totalCredits = totalCredits + pcMap.get(foundList.courses[i])[0];
                }
                if (peMap.has(foundList.courses[i])) {
                    peMap.set(foundList.courses[i], [peMap.get(foundList.courses[i])[0], 1]);
                    totalCredits = totalCredits + peMap.get(foundList.courses[i])[0];
                }
                if (ucMap.has(foundList.courses[i])) {
                    ucMap.set(foundList.courses[i], [ucMap.get(foundList.courses[i])[0], 1]);
                    totalCredits = totalCredits + ucMap.get(foundList.courses[i])[0];
                }
                if (ueMap.has(foundList.courses[i])) {
                    ueMap.set(foundList.courses[i], [ueMap.get(foundList.courses[i])[0], 1]);
                    totalCredits = totalCredits + ueMap.get(foundList.courses[i])[0];
                }

            }

        });



        if (customListName === 'Pc') {
            m = pcMap;
            title = "Program Core";
        }
        if (customListName === 'Pe') {
            m = peMap;
            title = "Program Elective";
        }
        if (customListName === 'Uc') {
            m = ucMap;
            title = "University Core";
        }
        if (customListName === 'Ue') {
            m = ueMap;
            title = "University Elective";
        }

        res.render('courseList', {
            Title: title,
            coursesMap: m,
            success: success,
            totalCredits: totalCredits
        });
        success = "";
    } else {
        res.redirect('/login');
    }


});

app.post('/:customlistName', (req, res) => {

    var status = Number(req.body.status);
    var courseName = req.body.courseName;
    var customListName = _.capitalize(req.params.customlistName);





    if (status === 0) {



        if (customListName === 'Pc') {

            User.findOne({ username: req.user.username }, (err, foundList) => {
                foundList.courses.push(courseName);

                foundList.save();
            });
        }
        if (customListName === 'Pe') {


            User.findOne({ username: req.user.username }, (err, foundList) => {
                foundList.courses.push(courseName);

                foundList.save();
            });
        }
        if (customListName === 'Uc') {


            User.findOne({ username: req.user.username }, (err, foundList) => {
                foundList.courses.push(courseName);

                foundList.save();
            });
        }
        if (customListName === 'Ue') {
            var check = 0;
            User.findOne({ username: req.user.username }, (err, foundList) => {
                //HERE
                for (var i = 0; i < foundList.courses.length; i++) {
                    if (ueMap.has(foundList.courses[i])) {
                        check = 1;
                        success = "Can Choose only 1 UE!";
                    }
                }
                if (check == 0) {
                    foundList.courses.push(courseName);
                    foundList.save();
                }
            });
        }




    } else {

        User.findOne({ username: req.user.username }, (err, foundList) => {
            for (var i = 0; i < foundList.courses.length; i++) {
                if (foundList.courses[i] === courseName) {
                    foundList.courses.splice(i, 1);
                }
            }

            foundList.save();

        });



    }



    var route = "";
    if (customListName === 'Pc') {
        route = "pc";
    }
    if (customListName === 'Pe') {
        route = "pe";
    }
    if (customListName === 'Uc') {
        route = "uc";
    }
    if (customListName === 'Ue') {
        route = "ue";
    }
    res.redirect('/' + route);
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})