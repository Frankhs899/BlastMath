// lienzo y su contexto
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variables del juego
let score;
let correctAnswer;
let gameLoop;
let gameState;
let cannon;
let bullets;
let enemies;
let question;
let options;
let explosions;

// Cargar imagen de la nave espacial
const enemyImage = new Image();
enemyImage.src = 'assets/alien.svg'; // Ruta de imagen nave espacial

// Cargar imagen del cañon
const cannonImage = new Image();
cannonImage.src = 'assets/war_tank.svg'; // Ruta imagen cañon

// Colores
const colors = {
    background: '#000', // Azul claro.
    bullet: '#FFFF00', // Amarillo.
    text: '#FFFFFF', // Blanco.
    platform: '#FFA500', // Naranja.
    explosion: '#FF69B4' // Rosa.
};

// Inicialización del juego
function init() {
    score = 0;
    correctAnswer = 0;
    gameState = 'playing';
    cannon = { x: canvas.width / 2, y: canvas.height - 50, width: 100, height: 70, speed: 20 };
    bullets = [];
    enemies = [];
    question = '';
    options = [];
    explosions = [];

    generateQuestion();
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, 1000 / 60);  // 60 FPS
    showInstructions();
}

// Mostrar instrucciones
function showInstructions() {
    document.getElementById('instructions').style.display = 'block';
    setTimeout(() => {
        document.getElementById('instructions').style.display = 'none';
    }, 3000);
}

// Generación de preguntas
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 9) + 2;
    const num2 = Math.floor(Math.random() * 9) + 2;
    correctAnswer = num1 * num2;
    question = `${num1} x ${num2}`;

    options = [correctAnswer];
    while (options.length < 4) {
        const wrongAnswer = Math.floor(Math.random() * 81) + 4;
        if (!options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }
    shuffleOptions(options);

    enemies = options.map((option, index) => ({
        x: (index + 1) * (canvas.width / 5),
        y: 50,
        width: 160,
        height: 90,
        value: option,
        speed: 0.5 + score * 0.1
    }));
}

// Mezclar opciones
function shuffleOptions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Actualizar el juego
function update() {
    if (gameState === 'playing') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground();
        drawCannon();
        drawBullets();
        drawEnemies();
        drawExplosions();
        drawQuestion();
        drawScore();
        checkCollisions();
        moveEnemies();
    }
}

// Dibujar fondo
function drawBackground() {
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Plataforma
    ctx.fillStyle = colors.platform;
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
}

// Dibujar cañón
function drawCannon() {
    ctx.drawImage(cannonImage, cannon.x - cannon.width / 2, cannon.y - cannon.height / 2, cannon.width, cannon.height);
}

// Dibujar balas
function drawBullets() {
    ctx.fillStyle = colors.bullet;
    bullets.forEach(bullet => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
        ctx.fill();
        bullet.y -= 10;
    });
    bullets = bullets.filter(bullet => bullet.y > 0);
}

// Dibujar enemigos
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.drawImage(enemyImage, enemy.x - enemy.width / 2, enemy.y - enemy.height / 2, enemy.width, enemy.height);
        ctx.fillStyle = colors.text;
        ctx.font = '20px "Press Start 2P"';
        ctx.textAlign = 'center';
        ctx.fillText(enemy.value, enemy.x, enemy.y + enemy.height / 2 + 20);
    });
}

// Dibujar explosiones
function drawExplosions() {
    explosions.forEach((explosion, index) => {
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 152, 0, ${explosion.opacity})`;
        ctx.fill();
        explosion.radius += 2;
        explosion.opacity -= 0.05;
        if (explosion.opacity <= 0) {
            explosions.splice(index, 1);
        }
    });
}

// Dibujar pregunta
function drawQuestion() {
    ctx.fillStyle = colors.text;
    ctx.font = '24px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText(question, canvas.width / 2, 30);
}

// Dibujar puntuación
function drawScore() {
    ctx.fillStyle = colors.text;
    ctx.font = '20px "Press Start 2P"';
    ctx.textAlign = 'left';
    ctx.fillText(`Puntuación: ${score}`, 10, 30);
}

// Verificar colisiones
function checkCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x > enemy.x - enemy.width / 2 &&
                bullet.x < enemy.x + enemy.width / 2 &&
                bullet.y > enemy.y - enemy.height / 2 &&
                bullet.y < enemy.y + enemy.height / 2) {
                // Colisión detectada
                bullets.splice(bulletIndex, 1);
                if (enemy.value === correctAnswer) {
                    // Respuesta correcta
                    score++;
                    explosions.push({ x: enemy.x, y: enemy.y, radius: 10, opacity: 1 });
                    generateQuestion();
                } else {
                    // Respuesta incorrecta
                    gameOver();
                }
            }
        });
    });

    enemies.forEach(enemy => {
        if (enemy.y + enemy.height / 2 > canvas.height - 20) {
            gameOver();
        }
    });
}

// Mover enemigos
function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.y += enemy.speed;
    });
}

// Fin del juego
function gameOver() {
    gameState = 'over';
    clearInterval(gameLoop);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colors.text;
    ctx.font = '48px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('Juego Terminado', canvas.width / 2, canvas.height / 2 - 50);
    ctx.font = '24px "Press Start 2P"';
    ctx.fillText(`Puntuación final: ${score}`, canvas.width / 2, canvas.height / 2 + 50);
    ctx.fillText('Presiona R para reiniciar', canvas.width / 2, canvas.height / 2 + 100);
}

// Controles del jugador
document.addEventListener('keydown', (e) => {
    if (gameState === 'playing') {
        switch (e.key.toLowerCase()) {
            case 'a':
                cannon.x = Math.max(cannon.width / 2, cannon.x - cannon.speed);
                break;
            case 'd':
                cannon.x = Math.min(canvas.width - cannon.width / 2, cannon.x + cannon.speed);
                break;
            case ' ':
                bullets.push({ x: cannon.x, y: cannon.y - cannon.height / 2 });
                break;
            case 'enter':
                gameState = 'paused';
                clearInterval(gameLoop);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = colors.text;
                ctx.font = '48px "Press Start 2P"';
                ctx.textAlign = 'center';
                ctx.fillText('Juego Pausado', canvas.width / 2, canvas.height / 2);
                ctx.font = '24px "Press Start 2P"';
                ctx.fillText('Presiona ENTER para continuar', canvas.width / 2, canvas.height / 2 + 50);
                break;
            case 'escape':
                gameOver();
                break;
        }
    } else if (gameState === 'paused' && e.key.toLowerCase() === 'enter') {
        gameState = 'playing';
        gameLoop = setInterval(update, 1000 / 60);
    } else if (e.key.toLowerCase() === 'r') {
        init();
    }
});

// Iniciar el juego
init();