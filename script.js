


$(document).ready(function() {
    $("welcome_screen").show()
    toggle_off()
	$("welcome").click(function() {
        toggle_off()
        $("welcome_screen").show();
    });

    $("register").click(function() {
        toggle_off()
        $("register_screen").show();
    });

    $("login").click(function() {
        toggle_off()
        $("login_screen").show();
    });

    $("about").click(function() {
        toggle_off()
        $("about_screen").show();
    });

    $("game").click(function() {
        toggle_off()
        $("settings_screen").show();
    });

    $("play").click(function() {
        toggle_off()
        $("game_screen").show();
    });
});

function toggle_off() {
    $("welcome_screen").hide()
    $("register_screen").hide()
    $("login_screen").hide()
    $("about_screen").hide()
    $("game_screen").hide()
    $("settings_screen").hide()
    $("game_screen").hide()
}