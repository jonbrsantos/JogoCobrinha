let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
context.font = "250px monaco";

const myFont = new FontFace('monaco', 'url("./monaco.ttf")');

myFont.load().then((font) => {
  document.fonts.add(font);
  console.log('Font loaded');
});

let tam = document.getElementById("tamanho").value;
let box = 36;
let tamanho;
tamanho = 504 / box;
let snake = [];
snake[0] = {
    x: 3 * box,
    y: 3 * box,
    direction: "right"
};
let direction = "right";

let food = {
    x: Math.floor(Math.random() * tamanho)*box,
    y: Math.floor(Math.random() * tamanho)*box
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
    context.beginPath();
    context.arc(food.x+box/2, food.y+box/2, box/2, 0, 2 * Math.PI);
    context.fill();
}

document.addEventListener('keydown', update);

function update(event){
    switch (event.keyCode) {
        case 37:
            if (direction !="right") direction = "left";
            break;
        case 38:
            if(direction !="down") direction = "up";
            break;
        case 39:
            if(direction !="left") direction = "right";
            break;
        case 40:
            if(direction !="up") direction = "down";
            break
    }
    // if (event.keyCode == 37 && direction !="right") direction = "left";
    // if (event.keyCode == 38 && direction !="down") direction = "up";
    // if (event.keyCode == 39 && direction !="left") direction = "right";
    // if (event.keyCode == 40 && direction !="up") direction = "down";
}

function GameOver(){
    context.font = "250px monaco";    
    context.fillStyle = "black";
    context.fillText("GAME",80,200);
    context.fillText("OVER",80,340);
}

function novoJogo(){
    for (i = 1 ; i < snake.length; i) {
        snake.pop();
    }
    snake[0] = {
        x: 3 * box,
        y: 3 * box,
        direction: "right"
    };
    direction = "right";
    fimDeJogo = false;

    tam = document.getElementById("tamanho").value;
    switch (tam){
        case "p":
            box = 36;
            break;
        case "m":
            box = 24;
            break;
        case "g":
            box = 14;
            break;
    }
    tamanho = 504 / box;
    
    food = {
        x: Math.floor(Math.random() * tamanho)*box,
        y: Math.floor(Math.random() * tamanho)*box
    }
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
let fimDeJogo = false;
jogo = setInterval(iniciarJogo, velocidade);