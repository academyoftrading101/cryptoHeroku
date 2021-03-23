const express = require('express');
const app = express();
const serv = require('http').createServer(app);
const Ticker = require('./schemas/ticker')
const Pridictions = require('./schemas/pridictions')


const mongoose = require('mongoose');
//const connectDB = require('./mongodbconnection/connection');
const URI = "mongodb+srv://neeraj_kr_007:EZm7XCq5GRZVcEa7@cluster0.7y2mn.mongodb.net/db?retryWrites=true&w=majority"
//const URI = "mongodb+srv://neeraj_kr_007:EZm7XCq5GRZVcEa7@cluster0.kjior.mongodb.net/Users?retryWrites=true&w=majority"
const connection = async ()=>{
    await mongoose.connect(
    URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true },
    function(err){
        if (err){
            console.log(err)
            return
        }
        mongoose.set('useFindAndModify', false);
        console.log("db connected")
    });
}
connection();





app.get('/', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
});

app.get('/index', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
}); 

app.get('/admin', (req, res) =>
{
    res.sendFile(__dirname + '/admin.html');
    
}); 

app.get('/calculator', (req, res) =>
{
    res.sendFile(__dirname + '/calculator.html');
}); 

app.get('/calculator2', (req, res) =>
{
    res.sendFile(__dirname + '/calculator2.html');
}); 

app.get('/contact', (req, res) =>
{
    res.sendFile(__dirname + '/contact.html');
    
}); 

app.get('/Pridictions', (req, res) =>
{
    res.sendFile(__dirname + '/Pridictions.html');
    
}); 

app.get('/quiz', (req, res) =>
{
    res.sendFile(__dirname + '/quiz.html');
}); 

app.use(express.static(__dirname + '/public'));

serv.listen(process.env.PORT || 3000); 

var io = require('socket.io')(serv,{});

io.on('connection', function(socket){
    console.log("socket connected")

    socket.on("showTicker", async ()=>{
        let tickerData = await Ticker.findOne({})
        socket.emit("showTicker", tickerData)
    })

    socket.on("pridictiondata", async ()=>{
        let pridictiondata = await Pridictions.find({})
        socket.emit("pridictiondata", pridictiondata)
    })

    socket.on("updatePridictions", async (d)=>{
        let test = ["review", "reviewTitle", "reviewText", "title", "data", "data", "data", "data", "data", "data"]
        let test3 = ["a", "b", "pridictions"]
        console.log(d)
        let test2 = await Pridictions.findOne({"coin":d[0]})
        for(let i = 1; i < d.length; i++)
        {
            if(d[i] != "")
            {
                if(i <= 2)
                {
                    test2[test[0]][test[i]] = d[i]
                }
                else
                {
                    //console.log(String(Math.floor((i-3)/7)) + "   " + test[(i - ((Math.floor((i-3)/7))*7))] + "   " + (((i-3)%7)-1))
                    if((((i-3)%7)-1) == -1)
                        test2[test3[2]][String(Math.floor((i-3)/7))][test[(i - ((Math.floor((i-3)/7))*7))]] = d[i]
                    else
                        test2[test3[2]][String(Math.floor((i-3)/7))][test[(i - ((Math.floor((i-3)/7))*7))]][(((i-3)%7)-1)] = d[i]
                    test2.markModified('pridictions')
                    test2.markModified('data')
                }
            }
        }
        await test2.save()
    })

    socket.on("newPridiction", async (d)=>{
        
    })

    socket.on("save", async (d)=>{
        let tickerData = await Ticker.findOne({})
        for(let i = 0; i < d.length; i++)
        {
            if(i < tickerData.list.length)
            {
                if(d[i] != "" && d[i] != -1)
                {
                    tickerData.list[i] = d[i]
                    tickerData.markModified("list")
                }
                else if(d[i] == -1)
                {
                    tickerData.list.splice(i, 1)
                    tickerData.markModified("list")
                }
            }
            else
            {
                if(d[i] != "" && d[i] != -1)
                {
                    tickerData.list.push(d[i])
                }
                else if(d[i] == -1)
                {
                    tickerData.list.splice(i, 1)
                    tickerData.markModified("list")
                }
            }
        }
        await tickerData.save()
    })

    socket.on("getTicker", async ()=>{
        let tickerData = await Ticker.findOne({})
        socket.emit("getTicker", tickerData.list)
    })
});

