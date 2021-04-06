
socket = io.connect()

function loaded(n) {
    socket.emit("predictiondata", n)
    //$('#modal').modal('toggle')
    let innerhtml = []
    for (let i = 0; i < 5; i++) {
        innerhtml.push(document.getElementById("navButtons" + i).innerHTML)
    }
    var once = [true, true, true, true, true]
    for (let i = 0; i < 5; i++) {
        $("#navButtons" + i).on('mouseover', function () {
            if (once[i]) {
                if (i != 2 || i != 3)
                    document.getElementById("navButtons" + i).innerHTML += ''
                else
                    document.getElementById("navButtons" + i).innerHTML += ''
                once[i] = false
            }
            for (let j = 0; j < 5; j++) {
                if (i != j) {
                    document.getElementById("navButtons" + j).innerHTML = innerhtml[j]
                    once[j] = true
                }
            }
        });
    }

    socket.on("predictiondata", (data) => {
        //document.getElementById("reviewTitle").innerHTML = data.review.reviewTitle
        //document.getElementById("reviewText").innerHTML = data.review.reviewText
        for (let i =  (data.predictions.length - 1); i > -1; i--) {
            placeTable(data.predictions[i])
        }
    })
}

function placeTable(obj) {
    let box
    if(obj.title.toLowerCase().includes('week') || obj.title.toLowerCase().includes('weekly'))
    {
        box = document.getElementById("predictionBoxWeekly")
    }
    else if(obj.title.toLowerCase().includes('month') || obj.title.toLowerCase().includes('monthly'))
    {
        box = document.getElementById("predictionBoxMonthly")
    }
    
    let title = document.createElement("h3")
    title.setAttribute("class", "display-5 mt-5")
    title.innerHTML = obj.title
    let table = document.createElement('table')
    table.setAttribute("class", "mt-2 text-center")
    table.setAttribute("style", "color: #ffffff;")
    let tbody = document.createElement('tbody')
    for (let i = 0; i < 3; i++) {
        let tr = document.createElement('tr')
        let td0 = document.createElement('td')
        td0.classList.add("td")
        td0.align = "center"
        td0.innerHTML = "R" + (i + 1)
        let td1 = document.createElement('td')
        td1.classList.add("td")
        td1.align = "center"
        td1.innerHTML = obj.data[i]
        let td2 = document.createElement('td')
        td2.classList.add("td")
        td2.align = "center"
        td2.innerHTML = "S" + (i + 1)
        let td3 = document.createElement('td')
        td3.classList.add("td")
        td3.align = "center"
        td3.innerHTML = obj.data[i + 3]
        tr.appendChild(td0)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tbody.appendChild(tr)
    }

    table.appendChild(tbody)
    box.appendChild(title)
    box.appendChild(table)
}