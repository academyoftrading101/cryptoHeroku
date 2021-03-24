
let ogValue = []
socket = io.connect()
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
                    document.getElementById("navButtons" + i).innerHTML += '<br><img style="width: 40px;" src="/data/newBG/toggle rectangle green.svg">'
                else
                    document.getElementById("navButtons" + i).innerHTML += '<br><img style="width: 100px; height: 6px" src="/data/newBG/toggle rectangle green.svg">'
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
    socket.emit("predictiondata", )
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
    obj.id = "input" + (document.getElementsByTagName('li').length - 6)
    obj.label = "Ticker " + ((document.getElementsByTagName('li').length - 6) + 1) + " :"
    obj.value = ""
    ogValue.push("")
    placeTicker(obj)

}

function save() {
    let newValues = []
    for (let i = 0; i < ((document.getElementsByTagName('li').length - 6)); i++) {
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
}

let once = [true, true]

let predictionData

socket.on("predictiondata", data => {
    predictionData = data
})

let ogValues2 = []

let o = {0:Bitcoin, 1:E}

function loaddata(n) {
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
    for (let i = 0; i < predictionData.predictions.length; i++) {
        ogValues2.push(predictionData.predictions[i].title)
        let label = document.createElement('label')
        label.for = "input3" + i
        label.appendChild(document.createTextNode('Title :'))
        let title = document.createElement('textarea')
        title.setAttribute("class", "form-control mb-3 hms")
        title.id = "input3" + i
        title.rows = "1"
        title.appendChild(document.createTextNode(predictionData.predictions[i].title))
        let div = document.createElement('div')
        div.setAttribute("class", "row")
        let div2 = document.createElement('div')
        div2.classList.add("col-md-5")
        let div3 = document.createElement('div')
        div3.classList.add("col-md-5")
        for (let j = 0; j < predictionData.predictions[i].data.length; j++) {
            ogValues2.push(predictionData.predictions[i].data[j])
            let label1 = document.createElement('label')
            label1.for = "input3" + i + j
            let data = document.createElement('textarea')
            data.setAttribute("class", "form-control mb-3 hms")
            data.style.maxWidth = "300px"
            data.id = "input3" + i + j
            data.rows = "1"
            data.appendChild(document.createTextNode(predictionData.predictions[i].data[j]))
            if (j <= 2) {
                label1.appendChild(document.createTextNode('R' + (j + 1) + ' :'))
                div2.appendChild(label1)
                div2.appendChild(data)
            }
            else {
                label1.appendChild(document.createTextNode('s' + (j - 2) + ' :'))
                div3.appendChild(label1)
                div3.appendChild(data)
            }
        }
        table.appendChild(label)
        table.appendChild(title)
        div.appendChild(div2)
        div.appendChild(div3)
        table.appendChild(div)
    }
}

function savePredictions(n) {
    let newValues = []
    newValues.push(document.getElementById("coinName").innerHTML.slice(4))
    newValues.push(document.getElementById("input10").value)
    newValues.push(document.getElementById("input11").value)
    for (let i = 0; i < predictionData.predictions.length; i++) {
        newValues.push(document.getElementById("input3" + i).value)
        for (let j = 0; j < predictionData.predictions[i].data.length; j++) {
            newValues.push(document.getElementById("input3" + i + j).value)
        }
    }
    for (let i = 0; i < newValues.length; i++) {
        if (newValues[i] == ogValues2[i] && i != 0) {
            newValues[i] = ""
        }
    }
    if (newValues.length < document.getElementsByClassName("hms").length) {
        let i = (newValues.length - 3) / 7
        let f = ((document.getElementsByClassName("hms").length - 2) / 7)
        let newValues2 = [newValues[0]]
        for (i; i < f; i++) {
            if (document.getElementById("input3" + i).value != "") {
                newValues2.push(document.getElementById("input3" + i).value)
                for (let j = 0; j < 6; j++) {
                    if (document.getElementById("input3" + i + j).value != "")
                        newValues2.push(document.getElementById("input3" + i + j).value)
                    else {
                        alert("please fill all values")
                        return
                    }
                }
            }
            else {
                alert("please fill all values")
                return
            }
        }
        socket.emit("newPrediction", newValues2)
        socket.emit("updatePredictions", newValues)
    }
    else {
        socket.emit("updatePredictions", newValues)
    }

}

let once2 = true
let i
function addPredictions() {
    if (once2 && Number(document.getElementsByClassName("hms")[document.getElementsByClassName("hms").length - 1].id.slice(5, 6)) == 3) {
        i = Number(document.getElementsByClassName("hms")[document.getElementsByClassName("hms").length - 1].id.slice(6, 7)) + 1
        once2 = false
    }
    else if (once2 && Number(document.getElementsByClassName("hms")[document.getElementsByClassName("hms").length - 1].id.slice(5, 6)) == 1) {
        i = 0
        once2 = false
    }
    let table = document.getElementById("tables")
    let label = document.createElement('label')
    label.for = "input3" + i
    label.appendChild(document.createTextNode('Title :'))
    let title = document.createElement('textarea')
    title.setAttribute("class", "form-control mb-3 hms")
    title.id = "input3" + i
    title.rows = "1"
    let div = document.createElement('div')
    div.setAttribute("class", "row")
    let div2 = document.createElement('div')
    div2.classList.add("col-md-5")
    let div3 = document.createElement('div')
    div3.classList.add("col-md-5")
    for (let j = 0; j < 6; j++) {
        let label1 = document.createElement('label')
        label1.for = "input3" + i + j
        let data = document.createElement('textarea')
        data.setAttribute("class", "form-control mb-3 hms")
        data.style.maxWidth = "300px"
        data.id = "input3" + i + j
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
    table.appendChild(label)
    table.appendChild(title)
    div.appendChild(div2)
    div.appendChild(div3)
    table.appendChild(div)
    i++
}