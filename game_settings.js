var directions      = [-1, 38, 40, 37, 39]
var directions_enum = {"up": 1, "down": 2, "left": 3, "right": 4}

var r_num
var color_5_points
var color_15_points
var color_25_points
var time_for_game
var monsters_counter

$(document).ready(function() {
    
    $("#5_points").val("#ffffff")
    $("#15_points").val("#ffffff")
    $("#25_points").val("#ffffff")

    update_key("up")
    update_key("down")
    update_key("left")
    update_key("right")

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

    $("#play").click(function(event){
        r_num = $("#r_num").val()
        color_5_points = $("#5_points").val()
        color_15_points = $("#15_points").val()
        color_25_points = $("#25_points").val()
        time_for_game = $("#time_picker").val()
        monsters_counter = $("#monster_picker").val()
    })
})

function update_key(direction){
    $("#" + direction + "_btn").click(function(){
        $("#" + direction + "_btn").on("keydown", function(e) {
            let tmp_key = e.keyCode
            let valid = true
            for(let i = 1; i <= 4; i++){
                if(i != directions_enum[direction]){
                    if(directions[i] == tmp_key){
                        valid = false
                    }
                }
            }
            if(valid){
                $("#" + direction).text(e.key)
                directions[directions_enum[direction]] = tmp_key
            }
        })
    })
}
