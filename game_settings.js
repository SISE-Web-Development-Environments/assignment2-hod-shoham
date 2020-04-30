var directions      = [38, 40, 37, 39]
var directions_enum = {"up": 0, "down": 1, "left": 2, "right": 3}

$(document).ready(function() {
    
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
})

function update_key(direction){
    $("#" + direction + "_btn").click(function(){
        $("#" + direction + "_btn").on("keydown", function(e) {
            let tmp_key = e.keyCode
            let valid = true
            for(let i = 0; i < 4; i++){
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
