socket = io.connect()


function tryLogin(e, p, b)
{
    document.getElementById("modal-title").innerHTML = "wait";
    let text = "Signing in please wait"
    document.getElementById("modal-body").innerHTML = '<div class="d-flex inline-flex"><div><p class="display-4 mr-4" style="color: black; font-size:medium; margin-bottom:0; margin-top:0.1rem">'+text+'</p></div><div class="spinner-border" role="status"><span class="sr-only"></span></div></div>'
    $('#modal').modal('toggle');
    socket.emit("tryAdminLogin", e, p, b);
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
        location.replace("/admin%20success")
    }, 1000);
    $('#modal').on('hidden.bs.modal', function (e) {
        clearInterval(timeOut)
        location.replace("/admin%20success")
    })
});