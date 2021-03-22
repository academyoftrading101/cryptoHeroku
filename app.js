const express = require('express');
const app = express();
const serv = require('http').createServer(app);
const Ticker = require('./schemas/ticker')

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

