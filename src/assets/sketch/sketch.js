import { get } from 'lodash';

import {
  Star,
  Countdown,
  Fighter,
  Scorebox,
  Life,
  GameOver,
  Enemy,
  Wall,
  Missile,
  Volley,
  Fire
} from './objects/index';
import { Intro } from './objects/intro';

import shootSound from '../media/shootsound.mp3';
import explodeSound from '../media/explode.mp3';
import r2Sound from '../media/r2.mp3';
import distantExplosion from '../media/muffled.mp3';

/* eslint-disable  no-unused-expressions */

export function sketch(p, handleWin, handleLoss) {
  let playing = false;
  let stopGame = false;
  let lives = 3;
  let edge = false;
  let score = 0;
  let missileCooldown = false;
  let leftPressed = false;
  let rightPressed = false;
  let enemyFire;
  let countdownInterval;
  let level = 1;
  let levels = [
    {
      speed: 0.5,
      interval: 1000
    },
    {
      speed: 0.9,
      interval: 900
    },
    {
      speed: 1.1,
      interval: 800
    },
    {
      speed: 1.3,
      interval: 700
    },
    {
      speed: 1.5,
      interval: 600
    },
    {
      speed: 1.7,
      interval: 500
    },
    {
      speed: 1.9,
      interval: 400
    },
    {
      speed: 2.1,
      interval: 300
    },
    {
      speed: 2.3,
      interval: 200
    },
    {
      speed: 3,
      interval: 100
    }
  ]

  //Canvas Components
  let countdown;
  let life;
  let scorebox;
  let fighter;
  let volley;
  let fire;
  let stars = [];
  let enemies = [];
  let walls = [];
  let missiles = [];
  let volleyArray = [];
  let fires = [];
  let gameOver = {};
  let intro = {}
  let shootingSound;
  let explosionSound;
  let droidSound;
  let distantExplosionSound;
  let width = 780;
  let height = 580;

  p.preload = () => {
    shootingSound = p.loadSound(shootSound);
    explosionSound = p.loadSound(explodeSound);
    droidSound = p.loadSound(r2Sound);
    distantExplosionSound = p.loadSound(distantExplosion);
  }

  p.setup = () => {
    p.createCanvas(width, height);
    startGameSetup();
  }

  p.draw = () => {
    stopGame ? p.noLoop() : true;
    p.background(0);
    p.textSize(15);
    p.fill(255, 254, 247);

    if (lives <= 0) {
      endGame(2000, handleLoss)
    }

    if (enemies.length <= 0 && (level + 1) > levels.length) {
      endGame(0, handleWin);
    }
    
    if (enemies.length <= 0) {
      handleNextLevel();
    }

    drawGameObjects(moveGameObjects)
  }

  function handleNextLevel() {
    missiles = [];
    fires = [];
    volley = [];
    volleyArray = [];
    level++;
    clearInterval(countdownInterval);
    clearInterval(enemyFire);
    startGameSetup();
  }

  function startGameSetup() {
    for (let i = 0; i < 100; i++) {
      stars[i] = new Star(p, height, width);
    }

    countdown = new Countdown(p, level, height, width);
    fighter = new Fighter(p, height, width);
    scorebox = new Scorebox(p, score, height, width);
    life = new Life(p, height, width);
    gameOver = new GameOver(p, height, width);
    intro = new Intro(p, height, width);

    for (let i = 0; i < 33; i++) {
      const enemySpeed = get(levels, [level - 1, 'speed'], 0);
      if (i < 11) {
        enemies[i] = new Enemy(p, i * 50 + 80, 40, enemySpeed, 1, height, width);
      } else if (i < 22) {
        enemies[i] = new Enemy(p, (i - 11) * 50 + 80, 100, enemySpeed, 0, height, width);
      } else if (i < 33) {
        enemies[i] = new Enemy(p, (i - 22) * 50 + 80, 160, enemySpeed, 0, height, width);
      }
    }

    for (let i = 0; i < 3; i++) {
      walls[i] = new Wall(p, i * 240 + 80, height - 200, height, width);
    }

    initCountdown();

    const enemyFireInterval = get(levels, [level - 1, 'interval'], 0);
    enemyFire = setInterval(function () {
      lives > 0 && countdown.count <= 0 && playing ? letItVolley() : false;
    }, enemyFireInterval);
  }

  function drawGameObjects(func) {
    edge = false;

    for (let i = 0; i < stars.length; i++) {
      stars[i].show();
    }

    if (!playing) {
      intro.show();
    }
    if (countdown.view && playing) {
      countdown.show();
    };
    scorebox.show();
    life.show(lives);
    fighter.show();

    for (let i = 0; i < enemies.length; i++) {
      enemies[i].show();
    }

    for (let i = 0; i < walls.length; i++) {
      walls[i].show();
    }

    func && countdown.view === false && playing ? func() : false;
  }


  function moveGameObjects() {
    if (leftPressed) {
      fighter.x = fighter.x - 4;
    }

    if (rightPressed) {
      fighter.x = fighter.x + 4;
    }

    for (let i = 0; i < enemies.length; i++) {
      enemies[i].move();
      if (enemies[i].x + (enemies[i].radius * 2) >= width || enemies[i].x <= 0) {
        edge = true;
      }
      if (enemies[i].hits(fighter)) {
        lives--;
      }
    }

    if (edge) {
      for (let i = 0; i < enemies.length; i++) {
        enemies[i].reverse();
      }
    }

    for (let i = 0; i < missiles.length; i++) {
      missiles[i].show();
      missiles[i].move();
      for (let z = enemies.length - 1; z >= 0; z--) {
        if (missiles[i].hits(enemies[z])) {
          distantExplosionSound.play();
          missiles[i].killEnemy();
          enemies.splice(z, 1);
          score += 20;
          scorebox.updateScore(score);
        }
      }
      for (let z = walls.length - 1; z >= 0; z--) {
        if (missiles[i].hitsWall(walls[z])) {
          missiles[i].killWall();
        }
      }
    }

    for (let i = 0; i < missiles.length; i++) {
      if (missiles[i].toggleEnemy === true) {
        if (i % 2 === 0) {
          missiles.splice(i, 2);
        } else {
          missiles.splice(i - 1, 1);
        }
      }
    }

    for (let i = 0; i < missiles.length; i++) {
      if (missiles[i].toggleWall === true) {
        missiles.splice(i, 1);
      }
    }

    for (let i = 0; i < volleyArray.length; i++) {
      volleyArray[i].show();
      volleyArray[i].move();
      if (volleyArray[i].hits(fighter)) {
        volleyArray[i].kill();
        lives > 1 ? explosionSound.play() : droidSound.play();
        lives--;
      }
      for (let z = walls.length - 1; z >= 0; z--) {
        if (volleyArray[i].hitsWall(walls[z])) {
          distantExplosionSound.play();
          walls[z].takeDamage();
          fire = new Fire(p, walls[z].x, walls[z].y, height, width);
          fires.push(fire);
          volleyArray[i].kill();
        }
      }
    }

    for (let i = 0; i < walls.length; i++) {
      if (walls[i].destroy === true) {
        for (let z = fires.length - 1; z >= 0; z--) {
          if (fires[z].proximity(walls[i])) {
            fires.splice(z, 1);
          }
        }
        walls.splice(i, 1);
      }
    }

    for (let i = 0; i < volleyArray.length; i++) {
      if (volleyArray[i].toggle === true) {
        volleyArray.splice(i, 1);
      }
    }

    for (let i = 0; i < fires.length; i++) {
      fires[i].show();
    }
  }

  p.keyReleased = ({ keyCode }) => {
    if (keyCode == 37) {
      leftPressed = false;
    }
    else if (keyCode == 39) {
      rightPressed = false;
    }
  }

  p.keyPressed = ({ keyCode }) => {
    switch (keyCode) {
      case 37:
        leftPressed = true;
        break;
      case 39:
        rightPressed = true;
        break;
      case 32:
        if (!playing) {
          playing = true;
        } else {
          if (!missileCooldown && countdown.count <= 0) {
            let missile = new Missile(p, fighter.x + 0, fighter.y, 1, height, width);
            missiles.push(missile);
            missile = new Missile(p, fighter.x + 55, fighter.y, -1, height, width);
            missiles.push(missile);
            shootingSound.play();
            setTimeout(function () {
              missile = new Missile(p, fighter.x + 0, fighter.y, 1, height, width);
              missiles.push(missile);
              missile = new Missile(p, fighter.x + 55, fighter.y, -1, height, width);
              missiles.push(missile);
              shootingSound.play();
            }, 150);
            missileCooldown = true;
            cooldown();
          }
        }
        break;
    }
  }

  function endGame(timeout, callback) {
    setTimeout(() => {
      stopGame = true;
      gameOver.show();
      missiles = [];
      fires = [];
      volley = [];
      volleyArray = [];
      shootingSound.disconnect();
      explosionSound.disconnect();
      droidSound.disconnect();
      distantExplosionSound.disconnect();
      distantExplosionSound.disconnect();
      callback && callback(score);
    }, timeout || 1000)
  }

  p.remove = () => {
    endGame(0);
  }

  function letItVolley() {
    if (enemies.length > 0 && countdown.count <= 0) {
      let random = parseInt(Math.floor(Math.random() * (enemies.length)));
      volley = new Volley(p, enemies[random].x + enemies[random].radius, enemies[random].y + 5, height, width);
      volleyArray.push(volley);
    }
  }

  function initCountdown() {
    countdownInterval = setInterval(function () {
      if (!countdown) return;
      if (playing) {
        if (countdown.count > 0) {
          countdown.count--;
        } else {
          countdown.view = false;
        }
      }
    }, 1000);
  }

  function cooldown() {
    setTimeout(function () {
      missileCooldown = false;
    }, 1000);
  }
};
