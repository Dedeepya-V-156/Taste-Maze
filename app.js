require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
const tvMaze = "http://api.tvmaze.com/shows";
const tdendpoint = "&type=shows&info=1";
const tastedive = "https://tastedive.com/api/similar?q=";
const omdburl = "http://www.omdbapi.com/"
const tdapikey = "442003-Apimashu-DTG7GG08";
const omdbapikey = "ddeddbdd";
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const x=0;
let test = "";

//Get the details of the user input show from the first API
app.get('/',(req,res)=>{
  res.render('landing',{x:x})
})
app.post('/show',(req,res)=>{
  const query = req.body.showname;
  test = req.body.showname;
  if(query != null)
  {
    const url1 = "http://api.tvmaze.com/search/shows?q="+req.body.showname;
  request(url1,(err,response,body)=>{
      if(!err && response.statusCode==200 && query != null)
      {
          bodyp=JSON.parse(body);
          res.render('next',{
            
            x:1,show:bodyp
        
          });
          console.log(test);
      }
      else
      console.log("Sorry Try Again");
      app.get('/');
    })
    
  }
  else
      console.log("Sorry Try Again");
      app.get('/');
})

//Get the Recommendations based on the results from the first API
  app.post("/top_shows", (req, res)=>{

    const name = req.body.name;
    const url="https://tastedive.com/api/similar?q="+test+"&k="+process.env.tdapikey+"&type=shows&info=1";
    request(url, function(err, response, body){
      if(!err && res.statusCode == 200 && test != "") { // Successful response
         // Displays the response from the API
          const movieData=JSON.parse(body);
          res.render("top_shows.ejs",{
            show: movieData.Similar.Results,
        
          });
       
          console.log(test);
      } else {
          console.log(err);
          console.log("Sorry couldnt find results");
      }
    })
  });

  //Get the images and names of movies and shows with a similar title from the third API
  app.post("/results", (req, res)=>{

    const name = req.body.name;
    const url= omdburl+"?apikey="+process.env.omdbapikey+"&s="+ test ;
    request(url, function(err, response, body){
      if(!err && res.statusCode == 200) { // Successful response
          // console.log(body); // Displays the response from the API
          const data=JSON.parse(body);
          res.render("results.ejs",{
            show:data,
          });
      } else {
          console.log(err);
      }
    })
  });
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });

  console.log("api key1 ="+ process.env.tdapikey);
  console.log("api key2 ="+ process.env.omdbapikey);
  module.exports = app;