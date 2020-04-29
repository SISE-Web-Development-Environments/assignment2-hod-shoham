var logged_in = false
var valid_registration = false
var users = [
    {username: "p", password: "p"}
]


$(document).ready(function() {
    $("#login_btn").click(function() {
        let usr  = $("#login_usr").val()
        let pass = $("#login_pass").val()
        if (users.some(user => user.username == usr && user.password == pass)) {
            login()
        }
        else{
            window.alert("wrong username or password")
        }
    })

    $("#register_btn").click(function() {
        let fname = $("#register_fname").val()
        let lname = $("#register_lname").val()
        let uname = $("#register_uname").val()
        let email = $("#register_email").val()
        let bdate = $("#register_bdate").val()
        let pass  = $("#register_pass").val()
        
        if(valid_registration){
            let user  = {username: uname, password: pass}
            users.push(user)
            window.alert("registered successfully")
            toggle_off()
            $("#login_screen").show(700)
        }
        else{
            window.alert("something isn't right here...")
        }
    })
})

function login(){
    alert("doneit")
    logged_in = true
    $("#game").show()
    $("#login").hide()
    $("#register").hide()
    toggle_off()
    $("#settings_screen").show(700)
}