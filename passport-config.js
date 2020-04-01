"use strict";

let db = require('./server/mysqlhelper');
const LocalStrategy=require("passport-local").Strategy;
const bcrypt=require("bcrypt");

function initialize(passport){
    const authenticateUser=async (username,password,done) =>{
        var user=null;
        let sql="SELECT * FROM user WHERE username = ?";
        user=await db.query(sql,[username]);
        user=user[0];
        if(user==null){
            console.log("User null ");
            return done(null,false)
        }
        try{
            if(await bcrypt.compare(password,user.password)){
                console.log("Done auth "+user);
                return done(null,user)
            }else{
                console.log("Wrong password");
                return done(null,false)
            }
        }catch(e){
            console.log("something wrong sql fetch");
             return done(e)
        }
    }
    passport.use(new LocalStrategy(authenticateUser))
    
}

module.exports=initialize;