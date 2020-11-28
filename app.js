const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const json = require("body-parser/lib/types/json");
const { options } = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname +'/form.html');
})

app.post("/",function(req,res){
    const query = req.body.username;
    const url = 'https://gitlab.com/api/v4/users?username='+query;

    https.get(url,function(response){
        console.log(res.statusCode);

        response.on("data",function(data){
            const Data = JSON.parse(data);
            const repoActivityLink = "https://gitlab.com/users/"+query+"/activity" ;//Data[0].web_url+"/activity";
            res.redirect(repoActivityLink);

        })
    })
})

app.listen(3000,function(req,res){
    console.log("Server is started at port 3000");
})