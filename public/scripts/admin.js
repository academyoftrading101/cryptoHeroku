
let ogValue = []
socket = io.connect()


function tryLogin(e, p, b)
{
    document.getElementById("modal-title").innerHTML = "wait";
    let text = "Signing in please wait"
    document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="color: black; font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
    $('#modal').modal('toggle');
    socket.emit("tryAdminLogin", e, p, b);
}

window.onunload = ()=>{
    location.href = "signin"
}



function loaded() {


    let innerhtml = []
    for (let i = 0; i < 4; i++) {
        innerhtml.push(document.getElementById("navButtons" + i).innerHTML)
    }
    var once = [true, true, true, true]
    for (let i = 0; i < 4; i++) {
        $("#navButtons" + i).on('mouseover', function () {
            if (once[i]) {
                if (i != 2)
                    document.getElementById("navButtons" + i).innerHTML += ''
                else
                    document.getElementById("navButtons" + i).innerHTML += ''
                once[i] = false
            }
            for (let j = 0; j < 4; j++) {
                if (i != j) {
                    document.getElementById("navButtons" + j).innerHTML = innerhtml[j]
                    once[j] = true
                }
            }
        });
    }
    socket.emit("showTicker")
    
    document.getElementById("form").style.display = "block"
    socket.on("showTicker", (data) => {
        {
            for (let i = 0; i < data.list.length; i++) {
                let obj = {}
                obj.id = "input" + i
                obj.label = "Ticker " + (i + 1) + " :"
                obj.value = data.list[i]
                ogValue.push(data.list[i])
                placeTicker(obj)
            }
        }

    })
}
function placeTicker(obj) {
    let mainUl = document.getElementById("ul")
    let li = document.createElement('li')
    li.setAttribute("class", "list-group-item")
    li.setAttribute("style", "background-color: transparent")
    let label = document.createElement('label')
    //label.setAttribute("style", "color: black;")
    label.setAttribute("for", obj.id)
    label.appendChild(document.createTextNode(obj.label))
    let textarea = document.createElement('textarea')
    textarea.setAttribute("class", "form-control mb-4")
    textarea.setAttribute("id", obj.id)
    textarea.setAttribute("rows", "1")
    textarea.appendChild(document.createTextNode(obj.value))
    li.appendChild(label)
    li.appendChild(textarea)
    mainUl.appendChild(li)
}

function addticker() {
    let obj = {}
    obj.id = "input" + (document.getElementsByTagName('li').length - 12)
    obj.label = "Ticker " + ((document.getElementsByTagName('li').length - 12) + 1) + " :"
    obj.value = ""
    ogValue.push("")
    placeTicker(obj)

}

function save() {
    document.getElementById("modal-title").innerHTML = "wait";
    let text = "saving changes please wait"
    document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="color: black; font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
    $('#modal').modal('toggle');
    let newValues = []
    for(let i = 0; i < document.getElementsByTagName('li').length; i++)
    {
        console.log(document.getElementsByTagName('li')[i])
    }
    for (let i = 0; i < ((document.getElementsByTagName('li').length - 12)); i++) {
        if (document.getElementById("input" + i).value == ogValue[i]) {
            newValues.push("")
        }
        else {
            newValues.push(document.getElementById("input" + i).value)
        }
        if (document.getElementById("input" + i).value == "") {
            newValues[i] = -1
        }
    }
    socket.emit("save", newValues)
    socket.on("savedTicker", ()=>{
        document.getElementById("modal-title").innerHTML = "Success";
        document.getElementById("modal-body").innerHTML = "Successfully saved changes";
        let timeOut = setTimeout(() => {
            $('#modal').modal('toggle');
        }, 2000);
        $('#modal').on('hidden.bs.modal', function (e) {
            clearInterval(timeOut)
        })
    })
}

let once = [true, true]

let predictionData



let ogValues2 = []

let o = {0:"Bitcoin", 1:"Ethereum", 2:"Litecoin", 3:"Cardano", 4:"XRP", 5:"Dogecoin"}

function loaddata(n) {
    socket.emit("predictiondata", o[n])
    socket.on("predictiondata", data => {
        predictionData = data
        ogValues2 = []
        ogValues2.push(predictionData.coin)
        ogValues2.push(predictionData.review.reviewTitle)
        ogValues2.push(predictionData.review.reviewText)
        document.getElementById("coin").style.display = "block"
        document.getElementById("coinName").innerHTML = "for " + predictionData.coin
        document.getElementById("input10").value = predictionData.review.reviewTitle
        document.getElementById("input11").value = predictionData.review.reviewText
        let table = document.getElementById("tables")
        table.innerHTML = ""
        let deleteTable = [predictionData.coin]
        for (let i = 0; i < predictionData.predictions.length; i++) 
        {
            if(predictionData.predictions[i].title != "")
            {
                ogValues2.push(predictionData.predictions[i].title)
                let label = document.createElement('label')
                label.for = "input" + (n+3) + i
                label.appendChild(document.createTextNode('Title :'))
                let title = document.createElement('textarea')
                title.setAttribute("class", "form-control mb-3 hms")
                title.id = "input" + (n+3) + i
                title.rows = "1"
                title.appendChild(document.createTextNode(predictionData.predictions[i].title))
                let div = document.createElement('div')
                div.setAttribute("class", "row")
                let div2 = document.createElement('div')
                div2.classList.add("col-md-5")
                let div3 = document.createElement('div')
                div3.classList.add("col-md-5")
                //console.log(predictionData.predictions[i].data)
                for (let j = 0; j < predictionData.predictions[i].data.length; j++) {
                    ogValues2.push(predictionData.predictions[i].data[j])
                    let label1 = document.createElement('label')
                    let data = document.createElement('textarea')
                    data.setAttribute("class", "form-control mb-3 hms")
                    data.style.maxWidth = "300px"
                    
                    data.rows = "1"
                    
                    if (j % 2 == 0) 
                    {
                        if (j == 0) 
                        {
                            label1.appendChild(document.createTextNode('R1 :'))
                            div2.appendChild(label1)
                        }
                        else if (j == 2) 
                        {
                            label1.appendChild(document.createTextNode('R2 :'))
                            div2.appendChild(label1)
                        }else if (j == 4) 
                        {
                            label1.appendChild(document.createTextNode('R3 :'))
                            div2.appendChild(label1)
                        }
                        if(predictionData.predictions[i].data[j] == "")
                        data.classList.remove("hms")     
                        data.id = "input" + (n+3) + i + j
                        data.appendChild(document.createTextNode(predictionData.predictions[i].data[j]))
                        div2.appendChild(data)
                    }
                    else
                    {
                        if (j == 1) 
                        {
                            label1.appendChild(document.createTextNode('S1 :'))
                            div3.appendChild(label1)
                        }
                        else if (j == 3) 
                        {
                            label1.appendChild(document.createTextNode('S2 :'))
                            div3.appendChild(label1)
                        }else if (j == 5) 
                        {
                            label1.appendChild(document.createTextNode('S3 :'))
                            div3.appendChild(label1)
                        }         
                        if(predictionData.predictions[i].data[j] == "")
                        data.classList.remove("hms")           
                        data.id = "input" + (n+3) + i + j
                        data.appendChild(document.createTextNode(predictionData.predictions[i].data[j]))
                        div3.appendChild(data)
                    }
                }
                table.appendChild(label)
                table.appendChild(title)
                div.appendChild(div2)
                div.appendChild(div3)
                table.appendChild(div)
            }
            else{
                deleteTable.push(i)
            }
        }
        socket.emit("deleteTable", deleteTable)
    })
}

function savePredictions(n) {
    document.getElementById("modal-title").innerHTML = "wait";
    let text = "saving changes please wait"
    document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="color: black; font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
    $('#modal').modal('toggle');
    let newValues = []
    newValues.push(o[n])
    newValues.push(document.getElementById("input10").value)
    newValues.push(document.getElementById("input11").value)
    //console.log(predictionData.predictions.length)
    for (let i = 0; i < predictionData.predictions.length; i++)
    {
        newValues.push(document.getElementById("input" + (n+3) + i).value)
        let j = 0
        while (j < 6) 
        {
            newValues.push(document.getElementById("input" + (n+3) + i + j).value)
            j++
        }
    }
    let count = 0
    for (let i = 0; i < newValues.length; i++) 
    {
        if (newValues[i] == ogValues2[i] && i != 0 && ogValues2[i] != "") 
        {
            //console.log("test ", i)
            newValues[i] = "-1"
        }
        if(newValues[i] != "-1" && newValues[i] != "")
        {
            count++;
        }

    }
    //console.log(count, "   ", newValues.length, "   ", document.getElementsByClassName("hms").length)
    if (newValues.length < document.getElementsByClassName("hms").length) {
        let i = (newValues.length - 3) / 7
        let f = ((document.getElementsByClassName("hms").length - 2) / 7)
        let newValues2 = [newValues[0]]
        for (i; i < f; i++) {
            if (document.getElementById("input" + (n+3) + i).value != "") 
            {
                newValues2.push(document.getElementById("input" + (n+3) + i).value)
                let flip = true
                let j = 0
                while (j < 6) 
                {
                    //console.log(j)
                    if(flip)
                    {
                        newValues2.push(document.getElementById("input" + (n+3) + i + j).value)
                        j += 3
                        flip = false
                    }
                    else
                    {
                        newValues2.push(document.getElementById("input" + (n+3) + i + j).value)
                        j -= 2
                        flip = true
                    }
                    if(j == 5)
                    {
                        newValues2.push(document.getElementById("input" + (n+3) + i + j).value)
                        break
                    }
                }
            }
            // else {
            //     alert("please fill all values")
            //     return
            // }
        }
        //console.log(newValues)
        //console.log(newValues2)
        socket.emit("newPrediction", newValues2)
        socket.on("addedPrediction", ()=>{
            socket.emit("updatePredictions", newValues)
        })
    }
    else 
    {
        //console.log(newValues)
        socket.emit("updatePredictions", newValues)
    }

}

let once2 = true
let i
function addPredictions(n) {
    // if (once2 && Number(document.getElementsByClassName("hms")[document.getElementsByClassName("hms").length - 1].id.slice(5, 6)) == (n +3)) 
    // {
    //     i = Number(document.getElementsByClassName("hms")[document.getElementsByClassName("hms").length - 1].id.slice(6, 7)) + 1
    //     once2 = false
    // }
    // else if (once2 && Number(document.getElementsByClassName("hms")[document.getElementsByClassName("hms").length - 1].id.slice(5, 6)) == 1) 
    // {
    //     i = 0
    //     once2 = false
    // }
    if (Number(document.getElementsByClassName("hms")[document.getElementsByClassName("hms").length - 1].id.slice(5, 6)) == 1) 
    {
        i = 0
    }
    else
    {
        i = (Number(document.getElementById('addTable').parentElement.previousElementSibling.children[6].children[(document.getElementById('addTable').parentElement.previousElementSibling.children[6].children.length - 2)].id.slice(6)) + 1)
    }
    let table = document.getElementById("tables")
    let label = document.createElement('label')
    label.for = "input" + (n+3) + i
    label.appendChild(document.createTextNode('Title :'))
    let dltButton = document.createElement('button')
    dltButton.setAttribute('class', "btn btn-danger float-right dltButton")
    dltButton.innerHTML = "delete this"
    let title = document.createElement('textarea')
    title.setAttribute("class", "form-control mb-3 hms")
    title.id = "input" + (n+3) + i
    title.rows = "1"
    let div = document.createElement('div')
    div.id = "divId" + i
    div.setAttribute("class", "row")
    let div2 = document.createElement('div')
    div2.classList.add("col-md-5")
    let div3 = document.createElement('div')
    div3.classList.add("col-md-5")
    for (let j = 0; j < 6; j++) {
        let label1 = document.createElement('label')
        label1.for = "input" + (n+3) + i + j
        let data = document.createElement('textarea')
        data.setAttribute("class", "form-control mb-3 hms")
        data.style.maxWidth = "300px"
        data.id = "input" + (n+3) + i + j
        data.rows = "1"
        if (j <= 2) {
            label1.appendChild(document.createTextNode('R' + (j + 1) + ' :'))
            div2.appendChild(label1)
            div2.appendChild(data)
        }
        else {
            label1.appendChild(document.createTextNode('S' + (j - 2) + ' :'))
            div3.appendChild(label1)
            div3.appendChild(data)
        }
    }
    dltButton.setAttribute("onclick", "{let n2 = (i - document.getElementsByClassName('dltButton').length); document.getElementById('input" + (n+3) + "' + n2).previousElementSibling.previousElementSibling.remove(); document.getElementById('input" + (n+3) + "' + n2).previousElementSibling.remove(); document.getElementById('input" + (n+3) + "' + n2).remove(); document.getElementById('divId' + n2).remove();  }")
    table.appendChild(label)
    table.appendChild(dltButton)
    table.appendChild(title)
    div.appendChild(div2)
    div.appendChild(div3)
    table.appendChild(div)
    
    i++
}

function loggedIn()
{
    location.replace("/admin%20success")
    document.getElementById("welcome-msg").innerHTML = 'Welcome, Admin';
}

socket.on("adminLoggedIn", ()=>{
    document.getElementById("input0").classList.remove("is-invalid");
    document.getElementById("input0").classList.add("is-valid");
    document.getElementById("input1").classList.remove("is-invalid");
    document.getElementById("input1").classList.add("is-valid");
    document.getElementById("invalid0").innerHTML = ""
    document.getElementById("invalid1").innerHTML = ""
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = "Successfully Logged In";
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
        loggedIn()
    }, 1000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
        loggedIn()
    })
});

socket.on("adminLogInFailed", (data)=>{
    document.getElementById("modal-title").innerHTML = "Failed";
    document.getElementById("modal-body").innerHTML = "Failed to login";
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
    if(data == "email")
    {
        document.getElementById("input0").classList.remove("is-valid");
        document.getElementById("input0").classList.add("is-invalid");
        document.getElementById("invalid0").innerHTML = "bad credentials"
    }
    else if(data == "password")
    {
        document.getElementById("input1").classList.remove("is-valid");
        document.getElementById("input1").classList.add("is-invalid");
        document.getElementById("invalid1").innerHTML = "bad credentials"
    }
})

socket.on("savedPrediction", (d)=>{
    document.getElementById("modal-title").innerHTML = "Success";
    document.getElementById("modal-body").innerHTML = "Successfully " + d + " changes";
    let timeOut = setTimeout(() => {
        $('#modal').modal('toggle');
    }, 2000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
    })
})

socket.on('deleted', ()=>{
    location.replace('/admin success')
})