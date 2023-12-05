/* Implementar (NÃO APAGAR!!!)
Gerador de asteroides de tamanho variável
Gerador de asteroides de velocidade variável, de acordo com a dificuldade
Implementar o game over
Conforme a dificuldade aumentar a velocidade dos asteroides aumenta e gera asteroides maiores
Implementar a função para o jogo ficar mais difícil conforme o score/tempo aumenta

(quanto maior o número, mais dificil o jogo fica)
inicio facil = 0.15
inicio medio = 0.25
inicio dificil = 0.35

-- feito --
Implementar o score

Se voces quiserem mais alguma coisa coloca ai em cima :)
*/

// importa os objetos do jogo
import { Spaceship } from './Spaceship.js';
import { Asteroid } from './Asteroid.js';

window.onload = () => {
    const diff = urlParams.get('diff');
    defineDifficulty(diff);
}

const canvas = document.getElementById('spaceGame'); // seleciona o canvas no html
const context = canvas.getContext('2d'); // define o contexto do canvas como 2d

// definindo o tamanho do canvas para o tamanho da tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const spaceship = new Spaceship(canvas.width / 2, canvas.height - 50, 50, 50, 10); 

let asteroids = [];
let score = 0; // pontuação do jogo de acordo com a quantidade de asteroides desviados

function defineDifficulty(diff) 
{
    if (diff === 'easy') {
        spaceship.speed = 10;
    } else if (diff === 'medium') {
        spaceship.speed = 7;
    } else if (diff === 'hard') {
        spaceship.speed = 5;
    }
}

function drawAsteroids() 
{ 
    for (let asteroid of asteroids) {
        asteroid.draw(context);
    }
}

function updateGame() 
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    spaceship.draw(context);
    drawAsteroids();

    for (let asteroid of asteroids) {
        asteroid.update();

        if (checkCollision(spaceship, asteroid)) {
            alert('Game Over! Your score: ' + score);
            resetGame();
        }
    }

    asteroids = asteroids.filter(asteroid => {
        if (asteroid.y <= canvas.height) {
            return true;
        } else {
            score++; 
            return false;
        }
    });

    if (Math.random() < 0.15) {
        let size = Math.floor(Math.random() * 50) + 10; // gera um tamanho aleatório entre 10 e 60
        let speed = 7; // velocidade padrão

        // aumenta a velocidade dos asteroides de acordo com a dificuldade
        if (spaceship.speed === 7) { // dificuldade média
            speed = 10;
        } else if (spaceship.speed === 5) { // dificuldade difícil
            speed = 12;
        }

        let asteroid = new Asteroid(Math.random() * (canvas.width - size), -size, size, size, speed);
        asteroids.push(asteroid); 
    }

    requestAnimationFrame(updateGame);
}

// verifica a tecla pressionada
window.addEventListener('keydown', (pressed) => { 
    if (pressed.key === 'ArrowLeft' || pressed.key === 'a' || pressed.key === 'A') { // movimenta a nave para a esquerda 
        spaceship.moveLeft(); 
    } else if (pressed.key === 'ArrowRight' || pressed.key === 'd' || pressed.key === 'D') { // movimenta a nave para a direita
        spaceship.moveRight(canvas.width); 
    }
});

function checkCollision(spaceship, asteroids) { //boolean
    return ( // verifica se houve colisão entre nave e asteroide
        spaceship.x < asteroids.x + asteroids.width &&
        spaceship.x + spaceship.width > asteroids.x &&
        spaceship.y < asteroids.y + asteroids.height &&
        spaceship.y + spaceship.height > asteroids.y
    );
}

function resetGame() 
{
    /* ----- recentraliza a nave ----- */
    spaceship.x = canvas.width / 2;
    spaceship.y = canvas.height - 50;

    /* ----- limpa o vetor de asteroides ----- */
    asteroids = [];
}

updateGame();