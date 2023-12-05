/* Implementar (NÃO APAGAR!!!)
Conforme a dificuldade aumentar a velocidade dos asteroides aumenta e gera asteroides maiores
Implementar a função para o jogo ficar mais difícil conforme o score/tempo aumenta

-- arrumar --
bug hitbox da nave
bug hitbox dos asteroides
bug velocidade dos asteroides
dificuldade do jogo

-- feito --
Implementar o game over
Implementar o score
Gerador de asteroides de tamanho variável
Gerador de asteroides de velocidade variável, de acordo com a dificuldade

Se voces quiserem mais alguma coisa coloca ai em cima :)
*/

// importa os objetos do jogo
import { Spaceship } from './model/Spaceship.js';
import { Asteroid } from './model/Asteroid.js';

window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search); // pega os parâmetros da url
    const diff = urlParams.get('diff'); // pega a dificuldade da url
    defineDifficulty(diff); // define a dificuldade do jogo
};

const canvas = document.getElementById('spaceGame'); // seleciona o canvas no html
const context = canvas.getContext('2d'); // define o contexto do canvas como 2d

// definindo o tamanho do canvas para o tamanho da tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const spaceship = new Spaceship(canvas.width / 2, canvas.height - 50, 50, 50, 10);  // cria a nave

let asteroidsQueue = []; // fila de asteroides
let maxAsteroids; // maximo de asteroides na tela
let asteroidGenSpeed; // velocidade de geração de asteroides
let score = 0; // pontuação do jogo de acordo com a quantidade de asteroides desviados

function defineDifficulty(diff) {
    if (diff === 'easy') {
        asteroidGenSpeed = 0.05; // velocidade inicial fácil reduzida
        maxAsteroids = 50; // quantidade máxima de asteroides na tela
    } else if (diff === 'normal') {
        asteroidGenSpeed = 0.1; // velocidade inicial média reduzida
        maxAsteroids = 60; // quantidade máxima de asteroides na tela
    } else if (diff === 'hard') {
        asteroidGenSpeed = 0.15; // velocidade inicial difícil reduzida
        maxAsteroids = 80; // quantidade máxima de asteroides na tela
    }

    updateGame(diff); // inicia o jogo
}

function drawAsteroids() {
    for (let asteroid of asteroidsQueue) {
        asteroid.draw(context);
    }
}

function writeScore() {
    context.font = "20px Arial";
    context.fillStyle = "white";
    context.fillText("Score: " + score, 10, 30);
}

function updateGame(diff) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    spaceship.draw(context);
    drawAsteroids();
    writeScore(); // escreve a pontuação na tela

    for (let asteroid of asteroidsQueue) {
        asteroid.update();

        if (checkCollision(spaceship, asteroid)) {
            alert('Game Over! Sua pontuação: ' + score);
            resetGame();
        }
    }

    asteroidsQueue = asteroidsQueue.filter(asteroid => {
        if (asteroid.y <= canvas.height) {
            return true;
        } else {
            score++;
            return false;
        }
    });

    if (Math.random() < asteroidGenSpeed && asteroidsQueue.length < maxAsteroids) {
        let size = Math.floor(Math.random() * 50) + 10; // gera um tamanho aleatório entre 10 e 60
        let speed = 7; // velocidade padrão

        // aumenta a velocidade dos asteroides de acordo com a dificuldade
        if (diff == 'normal') { // dificuldade média
            speed = 10;
        } else if (diff == 'hard') { // dificuldade difícil
            speed = 12;
        }

        let asteroid = new Asteroid(Math.random() * (canvas.width - size), -size, size, size, speed);

        asteroidsQueue.push(asteroid);
    }

    asteroidGenSpeed += 0.001; // aumenta a velocidade dos asteroides ao longo do tempo

    asteroidsQueue = asteroidsQueue.filter(asteroid => asteroid.y <= canvas.height);

    requestAnimationFrame(() => updateGame(diff));
}

// verifica a tecla pressionada
window.addEventListener('keydown', (pressed) => {
    if (pressed.key === 'ArrowLeft' || pressed.key === 'a' || pressed.key === 'A') { // movimenta a nave para a esquerda
        spaceship.moveLeft();
    } else if (pressed.key === 'ArrowRight' || pressed.key === 'd' || pressed.key === 'D') { // movimenta a nave para a direita
        spaceship.moveRight(canvas.width);
    }
});

// verifica se houve colisão entre a nave e um asteroide
function checkCollision(spaceship, asteroid) { //boolean
    const spaceshipPadding = 10; // padding da nave

    // calcula o raio da nave
    const spaceshipRadius = (spaceship.width - 2 * spaceshipPadding) / 2; // raio original da nave
    const adjustedSpaceshipRadius = spaceshipRadius * 0.8; // ajusta o raio da nave para ser menor no centro

    const dx = (spaceship.x + spaceshipPadding) + spaceshipRadius - (asteroid.x + asteroid.width / 2);
    const dy = (spaceship.y + spaceshipPadding) + spaceshipRadius - (asteroid.y + asteroid.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < (adjustedSpaceshipRadius + asteroid.width / 2);
}

function resetGame() {
    /* ----- recentraliza a nave ----- */
    spaceship.x = canvas.width / 2;
    spaceship.y = canvas.height - 50;

    /* ----- limpa o vetor de asteroides ----- */
    asteroidsQueue = [];

    /* ----- reseta a pontuação ----- */
    score = 0;
}