var context;
var pacman = new Object();
var score;
var pac_color;
var start_time;
var time_remaining;
var interval;
var points_remaining;
var empty_cells;
var pac_lives;

var cell_type = {empty: 0, wall: 1, pac: 2, point_5: 3, point_15: 4, point_25: 5};

var sprite_pacman = loadImages(["rec/pacman_up.svg", "rec/pacman_down.svg", "rec/pacman_left.svg", "rec/pacman_right.svg"]);
var sprite_ghost = loadImages(["rec/ghost_blue.svg", "rec/ghost_yellow.svg", "rec/ghost_red.svg", "rec/ghost_green.svg"])
var curr_pac_sprite = sprite_pacman[3];

var ghosts;

var board_len = 20;
var board_hight = 10;

var board;
var board_layout = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,1,0,0,0,1],
                    [1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1],
                    [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0],
                    [1,1,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,1,1],
                    [1,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

$(document).ready(function() {
    context = canvas.getContext("2d");
    $("#pacman_up").hide()
    $("#pacman_down").hide()
    $("#pacman_left").hide()
    $("#pacman_right").hide()
});

function Start() {
    score = 0;
    points_remaining = r_num;
    pac_color = "yellow";
    start_time = new Date();
    board = JSON.parse(JSON.stringify(board_layout));
    pac_lives = 5
    init_characters();

    let cnt_5_points = Math.floor(points_remaining * 0.6);
    let cnt_15_points = Math.floor(points_remaining * 0.3);
    let cnt_25_points = points_remaining - cnt_5_points - cnt_15_points;

    for(let i = 0; i < cnt_5_points; i++) {
        set_random_empty_cell(board, cell_type.point_5);
    }
    for(let i = 0; i < cnt_15_points; i++) {
        set_random_empty_cell(board, cell_type.point_15);
    }
    for(let i = 0; i < cnt_25_points; i++) {
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
    window.clearInterval(interval)
    interval = setInterval(UpdatePosition, 100);
}

function get_all_empty_cells(board){
    let ans = [];
    for(let x = 0; x < board[0].length; x++){
        for(let y = 0; y < board.length; y++){
            if(board[y][x] == cell_type.empty){
                ans.push([y, x]);
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

var cell_size = 45;
function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_remaining;
    for (let x = 0; x < board[0].length; x++) {
        for (let y = 0; y < board.length; y++) {
            let center = new Object();
            center.x = x * cell_size + cell_size/2;
            center.y = y * cell_size + cell_size/2;
            if (board[y][x] == cell_type.pac) {
                context.drawImage(curr_pac_sprite, center.x - cell_size/2, center.y - cell_size/2, cell_size, cell_size)
            } else if (board[y][x] == cell_type.wall) {
                context.beginPath();
                context.rect(center.x - cell_size/2, center.y - cell_size/2, cell_size, cell_size);
                context.fillStyle = "grey"; //color
                context.fill();
            } else if (board[y][x] == cell_type.point_5) {
                draw_reward(context, center.x, center.y, color_5_points)
            } else if (board[y][x] == cell_type.point_15) {
                draw_reward(context, center.x, center.y, color_15_points)
            } else if (board[y][x] == cell_type.point_25) {
                draw_reward(context, center.x, center.y, color_25_points)
            }
        }
    }

    for(let i = 0; i < ghosts.length; i++){
        context.drawImage(ghosts[i].sprite, ghosts[i].x * cell_size, ghosts[i].y * cell_size, cell_size, cell_size)
    }
}

function draw_reward(context, x, y, color) {
    context.beginPath();
    context.arc(x, y, cell_size/4, 0, 2 * Math.PI); // circle
    context.fillStyle = color; //color
    context.fill();
}

function init_characters(){
    ghosts = []
    empty_cells = [[1,1], [8,1], [1,18], [8,18]]
    for(let i = 0; i < monsters_counter; i++) {
        let ghost_pos = set_random_empty_cell(board, cell_type.empty)
        let ghost = new Object()
        ghost.y = ghost_pos[0]
        ghost.x = ghost_pos[1]
        ghost.sprite = sprite_ghost[i]
        ghosts.push(ghost)
    }

    empty_cells = get_all_empty_cells(board);

    let pac_pos = set_random_empty_cell(board, cell_type.pac);
    pacman.y = pac_pos[0];
    pacman.x = pac_pos[1];
}

function UpdatePosition() {
    board[pacman.y][pacman.x] = 0;
    let x = GetKeyPressed();
    if (x == "up") {
        if (pacman.y > 0 && board[pacman.y - 1][pacman.x] != cell_type.wall) {
            pacman.y--;
            curr_pac_sprite = sprite_pacman[0];
        }
    }
    if (x == "down") {
        if (pacman.y < board_hight -1 && board[pacman.y + 1][pacman.x] != cell_type.wall) {
            pacman.y++;
            curr_pac_sprite = sprite_pacman[1];
        }
    }
    if (x == "left") {
        if (pacman.x > 0 && board[pacman.y][pacman.x - 1] != cell_type.wall) {
            pacman.x--;
            curr_pac_sprite = sprite_pacman[2];
        }
    }
    if (x == "right") {
        if (pacman.x < board_len -1 && board[pacman.y][pacman.x + 1] != cell_type.wall) {
            pacman.x++;
            curr_pac_sprite = sprite_pacman[3];
        }
    }
    
    if (board[pacman.y][pacman.x] == cell_type.point_5) {
        score += 5;
        points_remaining--;
    }
    if (board[pacman.y][pacman.x] == cell_type.point_15) {
        score += 15;
        points_remaining--;
    }
    if (board[pacman.y][pacman.x] == cell_type.point_25) {
        score += 25;
        points_remaining--;
    }
    board[pacman.y][pacman.x] = 2;
    let currentTime = new Date();
    time_remaining = time_for_game - (currentTime - start_time) / 1000;
    
    for(let i = 0; i < ghosts.length; i++) {
        if(ghosts[i].x == pacman.x && ghosts[i].y == pacman.y) {
            score -= 10
            pac_lives--
            board[pacman.y][pacman.x] = cell_type.empty
            init_characters()
        }
    }

    // game over
    // TODO: change order??
    if (points_remaining == 0 || time_remaining <= 0 || pac_lives <= 0) {
        Draw();
        window.clearInterval(interval);
        setTimeout(() => {
            window.alert("Game completed");
        }, 100)
    } else {
        Draw();
    }
}