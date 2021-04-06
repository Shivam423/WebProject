const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const User = require('./db/userdata');

console.log(path.join(__dirname,'/views'));
console.log(__dirname);
app.set('view engine','pug');
app.set('views',path.join(__dirname,'./views'));
app.use(express.static(path.join(__dirname,'/static')));
app.use(express.urlencoded());

app.get("/",(req,res)=>{
    res.render("home.pug");
});
app.get("/contact",(req,res)=>{
    res.render("contact.pug");
});
app.post("/contact",async(req,res)=>{
        try{
            const userData = new User(req.body);
            console.log(userData);
            console.log(req.body);
            await userData.save();
            res.status(201).render("home.pug");
        }catch(error){
            res.status(500).send(error);
        }
});
app.listen(port, ()=>{
    console.log(`Server listening to the port no ${port}`);
})