var curr_screen = "welcome"

$(document).ready(function() {
    toggle_all_off(0)
    $("#game").hide()
    $("#welcome_screen").show(0)

    set_screen("welcome")
    set_screen("register")
    set_screen("login")
    set_screen("game")

    $("#about").click(function() {
        window.alert("oops... not implemented yet...")
    })

    $("#play").click(function() {
        $("#game_screen").show(700)
        Start() // start the packman game
    })
})

function set_screen(screen){
    $("#" + screen).click(function() {
        if(curr_screen != screen){
            toggle_all_off(700)
            $("#" + screen + "_screen").show(700)
            curr_screen = screen
        }
    })
}

function toggle_all_off(speed) {
    $("#welcome_screen").hide(speed)
    $("#register_screen").hide(speed)
    $("#login_screen").hide(speed)
    $("#about_screen").hide(speed)
    $("#game_screen").hide(speed)
    $("#settings_screen").hide(speed)
    $("#game_screen").hide(speed)
}