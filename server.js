var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    students = require('./server/students'),
    courses = require('./server/courses'),
    enrollments = require('./server/enrollments'),
    teachers = require('./server/teachers'),
    periods = require('./server/periods'),
    express  =require('express'),
    passport=require('passport'),
    LocalStrategy=require('passport-local')
    auth    =require('./server/auth'),
    sqlinit = require('./server/sqlinit'),
    bcrypt  =require("bcrypt"),
    app = express();

const initializePassport=require("./passport-config");

app.set('port', process.env.PORT || 5000);

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(compression());
app.use('/', express.static(__dirname + '/www'));

app.use(require("express-session")({
    secret:"auth using passport",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);


passport.serializeUser((user,done)=>{
    console.log("SerializeUser "+user.username);////testing
    done(null,user.id)
});
passport.deserializeUser(auth.findById);


////auth route//
app.get("/home",function(req,res){
    res.render("home");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
// app.post("/login",(req,res)=>{
//     res.send("login auth page");
// });
app.post("/login",passport.authenticate('local',{
    successRedirect:'/home',
    failureRedirect:'/login',
    failureFlash:false   ////allow flash msg
}));


app.post("/register",async (req,res)=>{
    try{
        console.log(req.body.username);
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        console.log(hashedPassword);
        auth.addUser(req.body.username,hashedPassword);
        res.redirect("/login"); 
    }catch{
        res.redirect("/register");
    }
});

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/login");
});


///testing ///
app.get("/userid",(req,res)=>{
    const val=auth.findUser('smith');
    console.log(val);
    res.send(val);
})



app.get('/students', students.findAll);
app.get('/students/:id', students.findById);
app.get('/students/:id/enrollments', enrollments.findByStudent);
app.post('/students', students.createItem);
app.put('/students', students.updateItem);
app.delete('/students/:id', students.deleteItem);

app.get('/courses', courses.findAll);
app.get('/courses/:id', courses.findById);
app.get('/courses/:id/enrollments', enrollments.findByCourse);
app.post('/courses', courses.createItem);
app.put('/courses', courses.updateItem);
app.delete('/courses/:id', courses.deleteItem);

app.get('/teachers', teachers.findAll);
app.get('/teachers/:id', teachers.findById);
app.get('/teachers/:id/courses', courses.findByTeacher);
app.post('/teachers', teachers.createItem);
app.put('/teachers', teachers.updateItem);
app.delete('/teachers/:id', teachers.deleteItem);

app.post('/enrollments', enrollments.createItem);
app.delete('/enrollments/:id', enrollments.deleteItem);

app.get('/periods', periods.findAll);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});