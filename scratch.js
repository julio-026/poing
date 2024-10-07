//variáveis da bolinha
let xbolinha = 300;
let ybolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadexbolinha = 6;
let velocidadeybolinha = 6;

//variáveis do oponente
let xraqueteoponente = 585;
let yraqueteoponente = 150;

//variáveis da raquete
let xraquete = 10;
let yraquete = 150;
let raquetelargura = 10;
let raquetealtura = 90;

//placar do jogo
let MeusPontos = 0;
let PontosDoOponente = 0;

//som do jogo
let raquetada;
let ponto;
let trilha;

let colidiu = false;

function setup() {
  createCanvas(600, 400);
 trilha.loop();
}

function draw() {
  background(0);
  mostrabolinha();
  movimentabolinha();
  verificarcoliborda();
  mostraraquete(xraquete, yraquete);
  movimentaminharaquete();
  verificaColisaoRaquete(xraquete, yraquete);
  verificaColisaoRaquete(xraqueteoponente, yraqueteoponente);
  mostraraquete(xraqueteoponente, yraqueteoponente);
  movimentaminharaqueteOponente();
  incluirPlacar();
  marcaPonto();
}

function mostrabolinha() {
  circle(xbolinha, ybolinha, diametro);
}
function movimentabolinha() {
  xbolinha += velocidadexbolinha;
  ybolinha += velocidadeybolinha;
}
function verificarcoliborda() {
  if (xbolinha + raio > width || xbolinha - raio < 0) {
    velocidadexbolinha *= -1;
  }
  if (ybolinha + raio > height || ybolinha - raio < 0) {
    velocidadeybolinha *= -1;
  }
}
function mostraraquete(x, y) {
  rect(x, y, raquetelargura, raquetealtura);
}
function movimentaminharaquete() {
  if (keyIsDown(UP_ARROW)) {
    yraqueteoponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yraqueteoponente += 10;
  }
}

function verificaColisaoRaquete() {
  if (
    xbolinha + raio > xraqueteoponente &&
    ybolinha + raio < yraqueteoponente + raquetealtura &&
    ybolinha - raio > yraqueteoponente
  ) {
    velocidadexbolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raquetelargura,
    raquetealtura,
    xbolinha,
    ybolinha,
    raio
  );
  if (colidiu) {
    velocidadexbolinha *= -1;
    raquetada.play();
  }
}

function movimentaminharaqueteOponente() {
  if (keyIsDown(87)) {
    yraquete -= 10;
  }
  if (keyIsDown(83)) {
    yraquete += 10;
  }
}

function incluirPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(240, 140, 0);
  rect(150, 10, 40, 20);
  fill(255);
  text(MeusPontos, 170, 26);
  fill(240, 140, 0);
  rect(450, 10, 40, 20);
  fill(255);

  text(PontosDoOponente, 470, 26);
}

function marcaPonto() {
  if (xbolinha > 590) {
    MeusPontos += 1;
     ponto.play();
  }
  if (xbolinha < 10) {
    PontosDoOponente += 1;
     ponto.play();
  }
}

function preload(){
trilha = loadSound ("trilha.mp3");  
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}