var up = 38
var down = 40
var left = 37
var right = 39

$(document).ready(function() {
    toggle_off()
    $("#welcome_screen").show(700)
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
        $("#game_screen").show(700)
        Start() // start the packman game
    })


    $("#up_btn").click(function() {
        $("#up_btn").on("keydown", function(e) {
            var tmp_up = e.keyCode
            if(tmp_up != down && tmp_up != left && tmp_up != right){
                $("#up").text(e.key)
                up = e.keyCode
            }
        })
    })

    $("#down_btn").click(function() {
        $("#down_btn").on("keydown", function(e) {
            var tmp_down = e.keyCode
            if(tmp_down != up && tmp_down != left && tmp_down != right){
                $("#down").text(e.key)
                down = e.keyCode
            }
        })
    })
    
    $("#left_btn").click(function() {
        $("#left_btn").on("keydown", function(e) {
            var tmp_left = e.keyCode
            if(tmp_left != up && tmp_left != down && tmp_left != right){
                $("#left").text(e.key)
                left = e.keyCode
            }
        })
    })

    $("#right_btn").click(function() {
        $("#right_btn").on("keydown", function(e) {
            var tmp_right = e.keyCode
            if(tmp_right != up && tmp_right != down && tmp_right != left){
                $("#right").text(e.key)
                right = e.keyCode
            }
        })
    })

    $("#random").click(function(){
        $("#up").text("ArrowUp")
        $("#down").text("ArrowDown")
        $("#left").text("ArrowLeft")
        $("#right").text("ArrowRight")
        $("#r_num").val(Math.floor((Math.random() * (90-50+1)) + 50))
        $("#5_points").val("#"+((1<<24)*Math.random()|0).toString(16))
        $("#15_points").val("#"+((1<<24)*Math.random()|0).toString(16))
        $("#25_points").val("#"+((1<<24)*Math.random()|0).toString(16))
        $("#time_picker").val(Math.floor((Math.random() * (600-60+1)) + 60))
        $("#monster_picker").val(Math.floor((Math.random() * 4) + 1))
    })
})

function set_key(direction ,e){
    $(direction).text(e.key)
}

function toggle_off() {
    $("#welcome_screen").hide(700)
    $("#register_screen").hide(700)
    $("#login_screen").hide(700)
    $("#about_screen").hide(700)
    $("#game_screen").hide(700)
    $("#settings_screen").hide(700)
    $("#game_screen").hide(700)
}