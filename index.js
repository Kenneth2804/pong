// Seleccionar el elemento canvas
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

// Objeto de la pelota
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 4,
  dx: 4,
  dy: 4,
};

// Objeto de las paletas
const paddleWidth = 10;
const paddleHeight = 70;

const player = {
  x: 50,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 8,
  score: 0,
};

const computer = {
  x: canvas.width - paddleWidth - 50,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 4,
  score: 0,
};

// Dibujar la pelota
function drawBall() {
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  context.fillStyle = "#fff";
  context.fill();
  context.closePath();
}

// Dibujar las paletas
function drawPaddle(x, y, width, height) {
  context.fillStyle = "#fff";
  context.fillRect(x, y, width, height);
}

// Actualizar la posición de la pelota
function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Rebotar en las paredes superior e inferior
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.dy *= -1;
  }

  // Rebotar en las paletas
  if (
    ball.x - ball.radius < player.x + player.width &&
    ball.y + ball.radius > player.y &&
    ball.y - ball.radius < player.y + player.height
  ) {
    ball.dx *= -1;
  }

  if (
    ball.x + ball.radius > computer.x &&
    ball.y + ball.radius > computer.y &&
    ball.y - ball.radius < computer.y + computer.height
  ) {
    ball.dx *= -1;
  }

  // Verificar si el jugador anota
  if (ball.x + ball.radius > canvas.width) {
    player.score++;
    resetGame();
  }

  // Verificar si la computadora anota
  if (ball.x - ball.radius < 0) {
    computer.score++;
    resetGame();
  }
}

// Actualizar la posición de las paletas del jugador y la computadora
function updatePaddles() {
  if (player.upPressed && player.y > 0) {
    player.y -= player.dy;
  } else if (player.downPressed && player.y + player.height < canvas.height) {
    player.y += player.dy;
  }

  // Movimiento de la paleta de la computadora
  if (ball.y < computer.y + computer.height / 2) {
    computer.y -= computer.dy;
  }

  if (ball.y > computer.y + computer.height / 2) {
    computer.y += computer.dy;
  }
}

// Limpiar el canvas
function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

// Dibujar todo en el canvas
function draw() {
  clearCanvas();
  drawBall();
  drawPaddle(player.x, player.y, player.width, player.height);
  drawPaddle(computer.x, computer.y, computer.width, computer.height);
  drawScore();
}

// Dibujar la puntuación
function drawScore() {
  context.font = "16px Arial";
  context.fillStyle = "#fff";
  context.fillText(`Player: ${player.score}`, 20, 30);
  context.fillText(`Computer: ${computer.score}`, canvas.width - 120, 30);
}

// Reiniciar el juego
function resetGame() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.dx = -ball.dx;
  ball.dy = Math.random() < 0.5 ? -ball.speed : ball.speed;
}

// Función principal del juego
function gameLoop() {
  updateBall();
  updatePaddles();
  draw();
}

// Control de la paleta del jugador mediante el teclado
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    player.upPressed = true;
  } else if (event.key === "ArrowDown") {
    player.downPressed = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowUp") {
    player.upPressed = false;
  } else if (event.key === "ArrowDown") {
    player.downPressed = false;
  }
});

// Bucle principal del juego
function startGame() {
  setInterval(gameLoop, 16);
}

// Iniciar el juego
startGame();
