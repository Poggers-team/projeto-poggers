const canvas = document.getElementById('gameCanvas'); // seleciona o canvas no html
const context = canvas.getContext('2d'); // configuração do contexto 2D

// configuração do tamanho do canvas para o jogo rodar na tela inteira
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let spaceship = { // editar depois utilizando a imagem da nave vector aé e jojo pintuda
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 50,
    height: 50,
    speed: 5
};

let asteroids = []; // vetor de asteroides ()
let score = 0;

function drawSpaceship() { // editar depois utilizando a imagem da nave e remove a funcition
    context.fillStyle = 'blue';
    context.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function drawAsteroids() 
{ // editar depois utilizando a imagem dos asteroides e remove a funcition
    context.fillStyle = 'red';
    for (let asteroid of asteroids) {
        context.fillRect(asteroid.x, asteroid.y, asteroid.width, asteroid.height);
    }
}

/* gpt me mandou esse código, quando editarem me mandem msg no zap
const spaceshipImage = new Image();
spaceshipImage.src = 'caminho/para/sua/imagem-da-nave.png';

const asteroidImage = new Image();
asteroidImage.src = 'caminho/para/sua/imagem-do-asteroide.png';

function drawSpaceship() {
  ctx.drawImage(spaceshipImage, spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function drawAsteroids() {
  for (let asteroid of asteroids) {
    ctx.drawImage(asteroidImage, asteroid.x, asteroid.y, asteroid.width, asteroid.height);
  }
}

let imagesLoaded = 0;

spaceshipImage.onload = imageLoaded;
asteroidImage.onload = imageLoaded;

function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === 2) {
    // Inicie o jogo somente quando ambas as imagens estiverem carregadas
    updateGame();
  }
}

*/

function updateGame() 
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawSpaceship();
    drawAsteroids();

    // manda os asteroides para baixo
    for (let asteroid of asteroids) {
        asteroid.y += 2;

        // verifica a colisão entre o asteroide e a nave
        if (spaceship.x < asteroid.x + asteroid.width &&
        spaceship.x + spaceship.width > asteroid.x &&
        spaceship.y < asteroid.y + asteroid.height &&
        spaceship.y + spaceship.height > asteroid.y) 
        {
            alert('Game Over! Your score: ' + score);
            resetGame();
        }
    }

    // Remove asteroids that are out of the canvas
    asteroids = asteroids.filter(asteroid => asteroid.y <= canvas.height);

    // gera novos asteroides aleatoriamente
    if (Math.random() < 0.02) 
    {
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

// event listener para o movimento da nave
window.addEventListener('keydown', function (pressed) {
    if (pressed.key === 'ArrowLeft' && spaceship.x > 0) {
        spaceship.x -= spaceship.speed;
    } else if (pressed.key === 'ArrowRight' && spaceship.x < canvas.width - spaceship.width) {
        spaceship.x += spaceship.speed;
    }
});

function resetGame() { // resetar o jogo
    spaceship.x = canvas.width / 2;
    spaceship.y = canvas.height - 50;
    asteroids = [];
    score = 0;
}

updateGame();