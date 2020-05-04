var logged_in = false
var valid_registration = false
var users = [
    {username: "p", password: "p"}
]

var logged_user

$(document).ready(function() {
    $("#login_btn").click(function() {
        let usr  = $("#login_usr").val()
        let pass = $("#login_pass").val()
        if (users.some(user => user.username == usr && user.password == pass)) {
            login()
            logged_user = usr
        }
        else{
            window.alert("wrong username or password")
        }
    })

    $("#register_btn").click(function() {
        let uname = $("#register_uname").val()
        let pass  = $("#register_pass").val()
        
        if(valid_registration){
            let user  = {username: uname, password: pass}
            users.push(user)
            window.alert("registered successfully")
            toggle_all_off()
            $("#login_screen").show(700)

            $(".nav").find(".active").removeClass("active");
            $("#login").addClass("active");
            curr_screen = "login"
        }
        else{
            window.alert("something isn't right here...")
        }
    })
})

function login() {
    logged_in = true
    $("#game").show()
    $("#login").hide()
    $("#welcome").hide()
    $("#register").hide()
    toggle_all_off()
    $("#settings_screen").show(700)

    curr_screen = "settings"
    $(".nav").find(".active").removeClass("active");
    $("#game").addClass("active");
}