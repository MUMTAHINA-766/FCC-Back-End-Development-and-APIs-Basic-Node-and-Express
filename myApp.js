var express = require('express');
var app = express();
let bodyParser = require('body-parser')

//
app.use(function(req, res, next){
  console.log(req.method+' '+req.path+'-'+req.ip)
  next()
})


//
console.log("Hello World");
//
/*app.get("/", function(req, res) {
  res.send("Hello Express");
});*/

//
app.get("/", (req, res)=> {
  res.sendFile(__dirname+'/views/index.html');
});
app.use('/public',express.static(__dirname + "/public"))

//Serve JSON on a Specific Route

let message = {"message": "Hello json"}/*
app.get("/json",(req, res)=>{
  res.json(message);
});
*/

//
app.get("/json",(req, res)=>{
  if(process.env['MESSAGE_STYLE']=== 'uppercase'){
    res.json({"message":"HELLO JSON"})}
  else{
  res.json(message)
}
});

//

app.get('/now',(request, response, next)=>{
  request.time = new Date().toString()
  next()
}, (request, response)=>{
  response.json({'time': request.time})
})

//Get Route Parameter Input from the Client 

app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word})
})
//Get Query Parameter Input from the Client
/*
app.get('/name', (req, res)=>{
  let string = req.query.first+' '+req.query.last
  res.json({name: string})
})
*/

//Use body-parser to Parse POST Requests
//mount the body-parser middleware here
app.use(bodyParser.urlencoded({extended: false
}))
//Get Data from POST Requests
app.post('/name',bodyParser.urlencoded({extended: false}),(req, res) => {
  let string = req.body.first+ " " + req.body.last;
  res.json({name: string });
}
         )






































 module.exports = app;
