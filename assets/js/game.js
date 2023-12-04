/* Implementar (NÃO APAGAR!!!)
Gerador de asteroides de tamanho variável
Gerador de asteroides de velocidade variável, de acordo com a dificuldade
Implementar o score
Implementar o game over
Conforme a dificuldade aumentar a velocidade dos asteroides aumenta e gera asteroides maiores
Implementar a função para o jogo ficar mais difícil conforme o score/tempo aumenta

Se voces quiserem mais alguma coisa coloca ai em cima :)
*/

class Spaceship 
{ // classe da nave
    constructor(x, y, width, height, speed) { // construtor da nave
        this.x = x; // posição x da nave
        this.y = y; // posição y da nave
        this.width = width; // largura da nave
        this.height = height; // altura da nave
        this.speed = speed; // velocidade da nave
    }

    moveLeft() { // move a nave para a esquerda
        if (this.x > 0) {
            this.x -= this.speed;
        }
    }

    moveRight(canvasWidth) { // move a nave para a direita
        if (this.x < canvasWidth - this.width) {
            this.x += this.speed;
        }
    }

    draw(context) { // desenha a nave (substituir depois jojo e vector!!!)
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

window.onload = () => {
    const diff = urlParams.get('diff');
}

const canvas = document.getElementById('spaceGame');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const spaceship = new Spaceship(canvas.width / 2, canvas.height - 50, 50, 50, 10); // cria a nave

let asteroids = [];
let score = 0;

function defineDifficulty(diff) // define a dificuldade do jogo
{
    if (diff === 'easy') {
        spaceship.speed = 7;
    } else if (diff === 'medium') {
        spaceship.speed = 5;
    } else if (diff === 'hard') {
        spaceship.speed = 3;
    }
}

function drawAsteroids() // desenha os asteroides (substituir depois jojo e vector!!!)
{ 
    context.fillStyle = 'red';
    for (let asteroid of asteroids) {
        context.fillRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height);
    }
}

function updateGame() 
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    spaceship.draw(context);
    drawAsteroids();

    for (let asteroid of asteroids) {
        asteroid.y += 5;

        if (checkCollision(spaceship, asteroid)) {
            alert('Game Over! Your score: ' + score);
            resetGame();
        }
    }

    asteroids = asteroids.filter(asteroid => asteroid.y <= canvas.height);

    if (Math.random() < 0.15) {
        let asteroid = {
            x: Math.random() * (canvas.width - 30),
            y: -30,
            width: 30,
            height: 30
        };
        asteroids.push(asteroid);
    }

    requestAnimationFrame(updateGame);
}

window.addEventListener('keydown', (pressed) => { // função para mover a nave
    if (pressed.key === 'ArrowLeft') {
        spaceship.moveLeft(); 
    } else if (pressed.key === 'ArrowRight') {
        spaceship.moveRight(canvas.width);
    }
});

function checkCollision(spaceship, asteroids) { // verifica a colisão entre a nave e os asteroides
    return (
        spaceship.x < asteroids.x + asteroids.width &&
        spaceship.x + spaceship.width > asteroids.x &&
        spaceship.y < asteroids.y + asteroids.height &&
        spaceship.y + spaceship.height > asteroids.y
    );
}

function resetGame() 
{
    spaceship.x = canvas.width / 2;
    spaceship.y = canvas.height - 50;
    asteroids = [];
}

updateGame();