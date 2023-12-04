const express = require("express");
const app = express();

app.get("/",function(req,res){
    res.send("<h1>Hello world<hi>")
});

app.get("/name/:name", function(req,res){
    let name = req.params.name;
    res.send("<h1> Hello " + name  + "</h1>")
});

app.get("/google", function(req,res){
    res.redirect("http://google.com")
});

app.get("/google/:search", function(req,res){
    let searchValue = req.params.search;
    res.redirect("http://google.com/search?q=" + searchValue)
});

app.use(express.static("../fox123"))

app.get("/game", function(req,res){
    res.redirect("index.html")
});

app.get("/*", function(req,res){
    res.redirect(404)
});

app.listen(3000,function (){
    console.log("Server is running on port 3000...")
});




