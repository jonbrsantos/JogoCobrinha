let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let tamanho;
tamanho = 512 / box;
let snake = [];
snake[0] = {
    x: 3 * box,
    y: 3 * box
};
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15+1)*box,
    y: Math.floor(Math.random() * 15+1)*box
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0, tamanho * box, tamanho * box);
}

function criarCobrinha(){
    for (i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        if (i == 0) context.fillStyle = "darkgreen";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarFrutinha(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){
    if (event.keyCode == 37 && direction !="right") direction = "left";
    if (event.keyCode == 38 && direction !="down") direction = "up";
    if (event.keyCode == 39 && direction !="left") direction = "right";
    if (event.keyCode == 40 && direction !="up") direction = "down";
}

function GameOver(){
    context.fillStyle = "black";
    
    //G
    context.fillRect(112, 132, 64, 16);
    context.fillRect(112, 148, 16, 64);
    context.fillRect(144, 164, 32, 16);
    context.fillRect(128, 196, 48, 16);
    context.fillRect(160, 180, 16, 16);

    //A
    context.fillRect(192, 132, 48, 16);
    context.fillRect(192, 148, 16, 64);
    context.fillRect(224, 148, 16, 64);
    context.fillRect(208, 164, 16, 16);
    
    //M
    context.fillRect(256, 132, 16, 80);
    context.fillRect(272, 148, 16, 16);
    context.fillRect(288, 164, 16, 16);
    context.fillRect(304, 148, 16, 16);    
    context.fillRect(320, 132, 16, 80);

    //E
    context.fillRect(352, 132, 16, 80);
    context.fillRect(368, 132, 32, 16);
    context.fillRect(368, 164, 16, 16);
    context.fillRect(368, 196, 32, 16);

    //O
    context.fillRect(128, 228, 16, 80);
    context.fillRect(144, 228, 16, 16);
    context.fillRect(144, 292, 16, 16);
    context.fillRect(160, 228, 16, 80);

    //V
    context.fillRect(192, 228, 16, 64);
    context.fillRect(208, 292, 16, 16);
    context.fillRect(224, 228, 16, 64);

    //E
    context.fillRect(256, 228, 16, 80);
    context.fillRect(272, 228, 32, 16);
    context.fillRect(272, 260, 16, 16);
    context.fillRect(272, 292, 32, 16);

    //R
    context.fillRect(320, 228, 16, 80);
    context.fillRect(336, 228, 16, 16);
    context.fillRect(352, 228, 16, 48);
    context.fillRect(336, 260, 16, 32);
    context.fillRect(352, 292, 16, 16);
}

function novoJogo(){
    for (i = 1 ; i < snake.length; i) {
        snake.pop();
    }
    snake[0] = {
        x: 3 * box,
        y: 3 * box
    };
    direction = "right";
    fimDeJogo = false;

    clearInterval(jogo);
    jogo = setInterval(iniciarJogo, 100);
}

function borda(){

    for (i = 1 ; i < snake.length; i) {
        snake.pop();
    }
    let borda = document.getElementById("snake").style.border;
    if (borda === "transparent"){
        document.getElementById("snake").style.border = "solid";
        document.getElementById("borda").style.opacity = 1.0;
    } else{
        document.getElementById("snake").style.border = "transparent";
        document.getElementById("borda").style.opacity = 0.5;
    }
}

function iniciarJogo(){
    for(i = 1 ; i < snake.length ; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            fimDeJogo = true;
            //alert('GameOver');
        }
    }

    criarBG();
    criarCobrinha();
    criarFrutinha();
    if (fimDeJogo == true){ GameOver()};

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    let borda = document.getElementById("snake").style.border;
    if (borda === "transparent"){
        if (snakeX > ((tamanho-1)) * box) snakeX = 0;
        if (snakeY > ((tamanho-1)) * box) snakeY = 0;
        if (snakeX < 0 * box) snakeX = (tamanho-1) * box;
        if (snakeY < 0 * box) snakeY = (tamanho-1) * box;
    } else{
        if (snakeX > ((tamanho-1)) * box) fimDeJogo = true;
        if (snakeY > ((tamanho-1)) * box) fimDeJogo = true;
        if (snakeX < 0 * box) fimDeJogo = true;
        if (snakeY < 0 * box) fimDeJogo = true;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (snakeX != food.x || snakeY != food.y){
        snake.pop();
    } else{
        food.x = Math.floor(Math.random() * (tamanho-1))*box;
        food.y = Math.floor(Math.random() * (tamanho-1))*box;
        document.getElementById("pontos").innerHTML = ("Pontos:" + snake.length);

        if (velocidade > 30) velocidade = 100 - 3*snake.length;
        clearInterval(jogo);
        jogo = setInterval(iniciarJogo, velocidade);
    }

    snake.unshift(newHead);

}

document.getElementById("snake").style.border = "transparent";
let velocidade = 100;
let fimDeJogo = false
jogo = setInterval(iniciarJogo, velocidade);