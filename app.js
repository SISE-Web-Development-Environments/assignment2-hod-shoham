var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_remaining;
var interval;
var points_remaining;
var empty_cells;

var cell_type = {empty: 0, wall: 1, pac: 2, point_5: 3, point_15: 4, point_25: 5}



$(document).ready(function() {
    context = canvas.getContext("2d");
});

function Start() {
    board = new Array();
    score = 0;
    points_remaining = r_num;
    pac_color = "yellow";
    start_time = new Date();
    for (let i = 0; i < 10; i++) {
        board[i] = new Array();
        for (let j = 0; j < 10; j++) {
            // put walls
            if (
                (i == 3 && j == 3) ||
                (i == 3 && j == 4) ||
                (i == 3 && j == 5) ||
                (i == 6 && j == 1) ||
                (i == 6 && j == 2)
            ) {
                board[i][j] = cell_type.wall;
            } else {
                board[i][j] = cell_type.empty;
            }
        }
    }
    empty_cells = get_all_empty_cells(board);

    let pac_pos = set_random_empty_cell(board, cell_type.pac);
    shape.i = pac_pos[0];
    shape.j = pac_pos[1];


    for(let i = 0; i < Math.floor(points_remaining * 0.6); i++) {
        set_random_empty_cell(board, cell_type.point_5);
    }
    for(let i = 0; i < Math.floor(points_remaining * 0.3); i++) {
        set_random_empty_cell(board, cell_type.point_15);
    }
    for(let i = 0; i < Math.floor(points_remaining * 0.1); i++) {
        set_random_empty_cell(board, cell_type.point_25);
    }

    keysDown = {};
    addEventListener(
        "keydown",
        function(e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    addEventListener(
        "keyup",
        function(e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    interval = setInterval(UpdatePosition, 100);
}

function get_all_empty_cells(board){
    let ans = [];
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
            if(board[i][j] == cell_type.empty){
                ans.push([i, j]);
            }
        }
    }
    return ans;
}

function set_random_empty_cell(board, new_cell_type) {
    let empty_cell_id = Math.floor(Math.random() * empty_cells.length);
    let empty_cell = empty_cells[empty_cell_id];
    empty_cells.splice(empty_cell_id, 1);
    board[empty_cell[0]][empty_cell[1]] = new_cell_type;
    return empty_cell;
}

function GetKeyPressed() {
    if (keysDown[directions[directions_enum["up"]]]) {
        return "up";
    }
    if (keysDown[directions[directions_enum["down"]]]) {
        return "down";
    }
    if (keysDown[directions[directions_enum["left"]]]) {
        return "left";
    }
    if (keysDown[directions[directions_enum["right"]]]) {
        return "right";
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_remaining;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == cell_type.pac) {
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == cell_type.wall) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            } else if (board[i][j] == cell_type.point_5) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = color_5_points; //color
                context.fill();
            } else if (board[i][j] == cell_type.point_15) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = color_15_points; //color
                context.fill();
            } else if (board[i][j] == cell_type.point_25) {
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = color_25_points; //color
                context.fill();
            }
        }
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    let x = GetKeyPressed();
    if (x == "up") {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != cell_type.wall) {
            shape.j--;
        }
    }
    if (x == "down") {
        if (shape.j < 9 && board[shape.i][shape.j + 1] != cell_type.wall) {
            shape.j++;
        }
    }
    if (x == "left") {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != cell_type.wall) {
            shape.i--;
        }
    }
    if (x == "right") {
        if (shape.i < 9 && board[shape.i + 1][shape.j] != cell_type.wall) {
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] == cell_type.point_5) {
        score += 5;
        points_remaining--;
    }
    if (board[shape.i][shape.j] == cell_type.point_15) {
        score += 15;
        points_remaining--;
    }
    if (board[shape.i][shape.j] == cell_type.point_25) {
        score += 25;
        points_remaining--;
    }
    board[shape.i][shape.j] = 2;
    let currentTime = new Date();
    time_remaining = time_for_game - (currentTime - start_time) / 1000;
    
    // game over
    if (points_remaining == 0 || time_remaining <= 0) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}