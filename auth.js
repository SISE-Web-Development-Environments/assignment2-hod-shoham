var logged_in = false

var users = [
    {username: "p", password: "p"}
]


$(document).ready(function() {

    $("#login_btn").click(function() {
        let usr = $("#login_usr").val()
        let pass = $("login_pass").val()
        if (users.some(user => user.username == usr && usr.password == pass)) {
            alert("doneit")
            logged_in = true
        }
    })

    $("#register_btn").click(function() {
        let usr = $("#register_usr").val()
        let pass = $("register_pass").val()
        let user = {username: usr, password: pass}
        users.push(user)
    })
})