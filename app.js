const express = require('express');
const app = express();
const serv = require('http').createServer(app);
const Ticker = require('./schemas/ticker')
const Predictions = require('./schemas/predictions')
const Admin = require('./schemas/admin')



const mongoose = require('mongoose');
const { once } = require('./schemas/ticker');
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

app.get('/Bitcoins', (req, res) =>
{
    res.sendFile(__dirname + '/Bitcoins.html');
}); 

app.get('/Litecoins', (req, res) =>
{
    res.sendFile(__dirname + '/Litecoins.html');
}); 

app.get('/XRPs', (req, res) =>
{
    res.sendFile(__dirname + '/XRPs.html');
}); 

app.get('/Cardanos', (req, res) =>
{
    res.sendFile(__dirname + '/Cardanos.html');
}); 

app.get('/Dogecoins', (req, res) =>
{
    res.sendFile(__dirname + '/Dogecoins.html');
}); 

app.get('/Ethereums', (req, res) =>
{
    res.sendFile(__dirname + '/Ethereums.html');
}); 


app.get('/quiz', (req, res) =>
{
    res.sendFile(__dirname + '/quiz.html');
}); 

app.get('/admin%20success', (req, res) =>
{
    res.sendFile(__dirname + '/adminRedirected.html');
}); 

app.use(
    express.static(__dirname + '/public')
);

serv.listen(process.env.PORT || 3000); 

var io = require('socket.io')(serv,{});

io.on('connection', function(socket){
    console.log("socket connected")

    socket.on("tryAdminLogin", async (email, pass, b)=>{
        Admin.find({"email":email}, 
            async function(err, data) {
                if(err){
                    console.log(err);
                }
                else{
                    if(data.length == 0){
                        socket.emit("adminLogInFailed", "email");
                        return
                    }
                    else
                    {
                        if(data[0].password == pass || b)
                        {
                            app.get('/admin%20success', (req, res) =>
                            {
                                res.sendFile(__dirname + '/adminRedirected.html');
                            });
                            data[0].loggedIn = true;
                            data[0].save();
                            socket.emit("adminLoggedIn");
                        }
                        else
                            socket.emit("adminLogInFailed", "password");
                    }
                }
        });
    })

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
        socket.emit("savedTicker")
    })

    socket.on("predictiondata", async (n)=>{
        let predictiondata = await Predictions.findOne({"coin":n})
        socket.emit("predictiondata", predictiondata)
    })

    socket.on("updatePredictions", async (d)=>{
        let test = ["review", "reviewTitle", "reviewText", "title", "data", "data", "data", "data", "data", "data"]
        let test2 = await Predictions.findOne({"coin":d[0]})
        let once = true
        for(let i = 1; i < d.length; i++)
        {
            if(d[i] != "-1")
            {
                if(i <= 2)
                {
                    test2[test[0]][test[i]] = d[i]
                }
                else
                {
                    if((((i-3)%7)-1) == -1)
                        test2["predictions"][Number(Math.floor((i-3)/7))][test[(i - ((Math.floor((i-3)/7))*7))]] = d[i]
                    else
                        test2["predictions"][Number(Math.floor((i-3)/7))][test[(i - ((Math.floor((i-3)/7))*7))]][(((i-3)%7)-1)] = d[i]
                    test2.markModified('predictions')
                    test2.markModified('data')
                }
            }
            else if(d[i] == "")
            {
                if(i <= 2)
                {
                    
                }
                else
                {
                    if(once)
                    {
                        once = false
                        test2["predictions"].splice(String(Math.floor((i-3)/7)), 1)
                        //console.log(String(Math.floor((i-3)/7)) + "   " + test[(i - ((Math.floor((i-3)/7))*7))] + "   " + (((i-3)%7)-1))
                        test2.markModified('predictions')
                        test2.markModified('data')
                    }
                }
            }
        }
        await test2.save()
        socket.emit("savedPrediction", "updated")
    })

    socket.on("newPrediction", async (d)=>{
        let test2 = await Predictions.findOne({"coin":d[0]})
        for(let i = 1; i < d.length; i = i+7)
        {
            let obj = {}
            obj.title = d[i]
            obj.data = [d[i+1], d[i+2], d[i+3], d[i+4], d[i+5], d[i+6]]
            test2.predictions.push(obj)
            test2.markModified('predictions')
        }
        
        await test2.save()
        socket.emit("savedPrediction", "added")
    })
    
    socket.on("getTicker", async ()=>{
        let tickerData = await Ticker.findOne({})
        socket.emit("getTicker", tickerData.list)
    })
});

