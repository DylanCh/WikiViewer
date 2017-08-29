'use strict';
var express = require('express');
var app = express();
var fs = require('fs');
var cors = require('cors');
var axios = require('axios');
const url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&&prop=info&inprop=url&titles=';
const PORT = 8081;

app.use(cors());

app.get(['/'],(req,res)=>{
    let html = fs.readFileSync('./client/index.html').toString();
    res.send(html);
});

var getWiki = (req,res)=>{
    console.log('Requesting to:'+url+req.query.q);
    axios.get(url+req.query.q
       // ,{headers:{'Api-User-Agent': 'Example/1.0'}}
    )
    .then((response)=>{
        var dataArray = response.data['query']['pages'];
        //console.log(dataArray);
        var pageid = Object.keys(dataArray)[0];
        res.json(dataArray[pageid]);        
    },
    (error)=>{
        console.log(error);
    });
};

app.get('/getWiki',
    // (req,res)=>{
    //     setTimeout(()=>{
    //         console.log('Time\'s up');
    //         res.json({message:'Time is up!'});
    //     },3000);
    //     getWiki(req.query.q,res);
    // }
    getWiki
);

module.exports = getWiki;

app.listen(PORT,()=>{
    console.log('Connected to '+PORT);
});