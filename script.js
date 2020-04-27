$(document).ready(function() {
    $("#welcome_screen").show(700)
    toggle_off()
    $("#welcome").click(function() {
        toggle_off()
        $("#welcome_screen").show(700)
    })

    $("#register").click(function() {
        toggle_off()
        $("#register_screen").show(700)
    })

    $("#login").click(function() {
        toggle_off()
        $("#login_screen").show(700)
    })

    $("#about").click(function() {
        toggle_off()
        $("#about_screen").show(700)
    })

    $("#game").click(function() {
        toggle_off()
        $("#settings_screen").show(700)
    })

    $("#play").click(function() {
        toggle_off()
        $("#game_screen").show(700)
        Start() // start the packman game
    })
})

function toggle_off() {
    $("#welcome_screen").hide(700)
    $("#register_screen").hide(700)
    $("#login_screen").hide(700)
    $("#about_screen").hide(700)
    $("#game_screen").hide(700)
    $("#settings_screen").hide(700)
    $("#game_screen").hide(700)
}