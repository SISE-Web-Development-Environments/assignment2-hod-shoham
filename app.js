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
var background_music;
var round_time;

var cell_type = {empty: 0, wall: 1, pac: 2, point_5: 3, point_15: 4, point_25: 5, life: 6, time: 7};

var sprite_pacman = loadImages(["rec/pacman_up.svg", "rec/pacman_down.svg", "rec/pacman_left.svg", "rec/pacman_right.svg"]);
var sprite_ghost = loadImages(["rec/ghost_blue.svg", "rec/ghost_yellow.svg", "rec/ghost_red.svg", "rec/ghost_green.svg"])
var curr_pac_sprite = sprite_pacman[3];

var life_point = loadImages(["rec/life.svg"])[0]
var add_time = loadImages(["rec/time.svg"])[0]

var star = {x: 0, y: 0, eaten: false, star_image: loadImages(["rec/star.svg"])[0]}


var ghosts;

var board_len = 20;
var board_hight = 10;

var board;
var board_layout = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,1,1,0,0,1],
                    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1],
                    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
                    [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
                    [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1],
                    [1,0,0,0,1,1,1,0,0,0,1,0,0,0,1,1,1,0,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

$(document).ready(function() {
    context = canvas.getContext("2d");
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
});

function Start() {
    $("#usr_id").text("Hello " + logged_user)
    score = 0;
    points_remaining = r_num;
    pac_color = "yellow";
    start_time = new Date();
    board = JSON.parse(JSON.stringify(board_layout));
    pac_lives = 5;
    round_time = parseInt(time_for_game)
    background_music = new Audio("/rec/pac_sound.mp3");
    background_music.addEventListener("ended", function() {
        this.currentTime = 0;
        this.play();
    }, false)
    background_music.play()
    init_star();
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

    let life_points = 2
    for(let i = 0; i < life_points; i++) {
        set_random_empty_cell(board, cell_type.life);
    }
    let time_points = 4
    for(let i = 0; i < time_points; i++) {
        set_random_empty_cell(board, cell_type.time);
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
    interval = setInterval(tick, 80);
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

function tick() {
    if (curr_screen != "game") {
        window.clearInterval(interval);
        background_music.pause()
        background_music.currentTime = 0
    }


    update_packman()
    update_ghosts()
    update_star()
    draw()
}

var cell_size = 45 // 45X45 px
function draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_remaining;
    lblLives.value = pac_lives; 
    for (let x = 0; x < board[0].length; x++) {
        for (let y = 0; y < board.length; y++) {
            let center = new Object();
            center.x = x * cell_size + cell_size/2;
            center.y = y * cell_size + cell_size/2;
            if (board[y][x] == cell_type.pac)
                context.drawImage(curr_pac_sprite, center.x - cell_size/2, center.y - cell_size/2, cell_size, cell_size)
            else if (board[y][x] == cell_type.wall) {
                context.beginPath();
                context.rect(center.x - cell_size/2, center.y - cell_size/2, cell_size, cell_size);
                context.fillStyle = "grey"; //color
                context.fill();
            } else if (board[y][x] == cell_type.point_5)
                draw_reward(context, center.x, center.y, color_5_points, "5")
            else if (board[y][x] == cell_type.point_15)
                draw_reward(context, center.x, center.y, color_15_points, "15")
            else if (board[y][x] == cell_type.point_25)
                draw_reward(context, center.x, center.y, color_25_points, "25")
            else if (board[y][x] == cell_type.life)
                context.drawImage(life_point, center.x - cell_size/2, center.y - cell_size/2, cell_size/2, cell_size/2)
            else if (board[y][x] == cell_type.time)
                context.drawImage(add_time, center.x - cell_size/2, center.y - cell_size/2, cell_size/2, cell_size/2)

        }
    }

    for(let i = 0; i < ghosts.length; i++){
        context.drawImage(ghosts[i].sprite, ghosts[i].x * cell_size, ghosts[i].y * cell_size, cell_size, cell_size)
    }

    if(!star.eaten)
        context.drawImage(star.star_image, star.x * cell_size, star.y * cell_size, cell_size, cell_size)
}

function draw_reward(context, x, y, color, reward) {
    context.beginPath();
    context.arc(x, y, cell_size/4, 0, 2 * Math.PI); // circle
    context.fillStyle = color; //color
    context.fill();
    
    context.fillStyle = "black"
    context.font = "15px Ariel"
    context.fillText(reward, x-5, y+5)
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

function init_star(){
    empty_cells = [[1,1], [8,1], [1,18], [8,18]]
    let star_pos = set_random_empty_cell(board, cell_type.empty)
    star.y = star_pos[0]
    star.x = star_pos[1]
    star.eaten = false
}

function update_packman() {
    board[pacman.y][pacman.x] = 0;
    let x = GetKeyPressed();
    if (x == "up") {
        if (pacman.y > 0 && board[pacman.y - 1][pacman.x] != cell_type.wall) {
            pacman.y--;
        }
        curr_pac_sprite = sprite_pacman[0];
    }
    if (x == "down") {
        if (pacman.y < board_hight -1 && board[pacman.y + 1][pacman.x] != cell_type.wall) {
            pacman.y++;
        }
        curr_pac_sprite = sprite_pacman[1];
    }
    if (x == "left") {
        if (pacman.x > 0 && board[pacman.y][pacman.x - 1] != cell_type.wall) {
            pacman.x--;
        }
        else if(pacman.x <= 0){
            pacman.x = board_len - 1
        }
        curr_pac_sprite = sprite_pacman[2];
    }
    if (x == "right") {
        if (pacman.x < board_len -1 && board[pacman.y][pacman.x + 1] != cell_type.wall) {
            pacman.x++;
        }
        else if(pacman.x >= board_len -1){
            pacman.x = 0
        }
        curr_pac_sprite = sprite_pacman[3];
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
    if (board[pacman.y][pacman.x] == cell_type.life)
        pac_lives++
    if (board[pacman.y][pacman.x] == cell_type.time)
        round_time += 10
    if(pacman.x == star.x && pacman.y == star.y){
        score += 50
        star.eaten = true
        star.x = -1
        star.y = -1
    }

    board[pacman.y][pacman.x] = 2;
    let currentTime = new Date();
    time_remaining = round_time - (currentTime - start_time) / 1000;


    for(let i = 0; i < ghosts.length; i++) {
        if(ghosts[i].x == pacman.x && ghosts[i].y == pacman.y) {
            score -= 10
            pac_lives--
            if(pac_lives <= 0){ //game over- no more lives
                game_over("Loser!")
                return
            }
            board[pacman.y][pacman.x] = cell_type.empty
            init_characters()
        }
    }

    if (points_remaining == 0 || time_remaining <= 0) {
        if(score < 100){
            game_over("You are better than " + score + " points!")
        }
        else{
            game_over("Winner!!!")
        }
    }
}

var slowdown = 0
function update_ghosts() {
    
    if (slowdown > 0) {
        slowdown--
        return
    }

    for (let i = 0; i < ghosts.length; i++) {
        let ghost = ghosts[i]
        try_move(ghost)
    }

    if (slowdown == 0)    
        slowdown = 4
}

function update_star(){
    if(slowdown > 0 || star.eaten   )
        return
    let moves = [try_move_up, try_move_down, try_move_left, try_move_right]
    let rand_move = Math.floor(Math.floor(Math.random() * 400 + 1)/100)
    moves[rand_move](star)
}

function try_move(ghost) {

    let dx = Math.abs(pacman.x - ghost.x)
    let dy = Math.abs(pacman.y - ghost.y)

    if (dx > dy) {
        if (pacman.x > ghost.x)
            try_move_right(ghost)
        else
            try_move_left(ghost)
    }
    else {
        if (pacman.y > ghost.y)
            try_move_down(ghost)
        else
            try_move_up(ghost)
    }
}


function try_move_up(entity) {
    if (entity.y > 0 && board[entity.y - 1][entity.x] != cell_type.wall)
        entity.y--;
    else {
        let r = Math.random()
        if (r > 0.5) try_move_left(entity)
        else try_move_right(entity)
    }
}

function try_move_down(entity) {
    if (entity.y < board_hight -1 && board[entity.y + 1][entity.x] != cell_type.wall)
        entity.y++;
    else {
        let r = Math.random()
        if (r > 0.5) try_move_left(entity)
        else try_move_right(entity)
    }
}

function try_move_left(entity) {
    if (entity.x > 0 && board[entity.y][entity.x - 1] != cell_type.wall) 
        entity.x--;
    else {
        let r = Math.random()
        if (r > 0.5) try_move_down(entity)
        else try_move_up(entity)
    }
}

function try_move_right(entity) {
    if (entity.x < board_len -1 && board[entity.y][entity.x + 1] != cell_type.wall)
        entity.x++;
    else {
        let r = Math.random()
        if (r > 0.5) try_move_down(entity)
        else try_move_up(entity)
    }
}

function game_over(alert){
    draw();
    window.clearInterval(interval);
    setTimeout(() => {
        window.alert("Total score: " + score + "\n"+ alert);
    }, 100)
}
