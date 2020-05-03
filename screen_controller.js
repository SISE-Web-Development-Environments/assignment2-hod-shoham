var curr_screen = "welcome"

$(document).ready(function() {
    $("html").css("visibility", "visible");
    toggle_all_off(0)
    // $("#game").hide()
    $("#welcome_screen").show(0)

    set_screen("welcome")
    set_screen("register")
    set_screen("login")

    $(".nav .nav-link").on("click", function(){
        $(".nav").find(".active").removeClass("active");
        $(this).addClass("active");
     });

    $("#about").click(function() {
        $(window).on("keydown", function(e){
            if(e.key == "Escape"){
                $("#about_screen").modal("hide")
            }
        })
    })

    $("#game").click(function() {
        if(curr_screen != "settings"){
            toggle_all_off(700)
            $("#settings_screen").show(700)
            curr_screen = "settings"
        }
        $("#play").click(function() {
            if(r_num == "" || time_for_game == "" || monsters_counter == "" ||
            color_5_points == "#ffffff" || color_15_points == "#ffffff" || color_25_points == "#ffffff" ){
                window.alert("can't start the game without settings!")
            }
            else{
                toggle_all_off(700)
                $("#game_screen").show(700)
                curr_screen = "game"
                sync_settings()
                Start() // start the packman game
                $("#replay").click(function(){
                    Start()
                })
            }
        })
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

function sync_settings() {
    $("#up_stat").text($("#up").text())
    $("#down_stat").text($("#down").text())
    $("#left_stat").text($("#left").text())
    $("#right_stat").text($("#right").text())

    document.getElementById("5_points_stat").style.backgroundColor = $("#5_points").val()
    document.getElementById("15_points_stat").style.backgroundColor = $("#15_points").val()
    document.getElementById("25_points_stat").style.backgroundColor = $("#25_points").val()
}