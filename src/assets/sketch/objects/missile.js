export function Missile(p5, x, y, focus) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.toggleEnemy = false;
    this.toggleWall = false;

    this.show = function() {
        p5.fill(0, 255, 255);
        p5.rect(this.x, this.y, 3, this.radius);
    }

    this.move = function() {
        this.y = this.y - 5;
        this.x = this.x + focus/3;
    }

    this.killEnemy = function() {
        this.toggleEnemy = true;
    }

    this.killWall = function() {
        this.toggleWall = true;
    }

    this.hits = function(enemy) {
        var distance = p5.dist(this.x, this.y, enemy.x + enemy.radius, enemy.y);
        if (distance <= this.radius) {
            return true;
        } else {
            return false;
        }
    }

    this.hitsWall = function(wall) {
        var distance = p5.dist(this.x, this.y, wall.x + 75, wall.y - 40);
        if (distance <= this.radius + 70) {
            return true;
        } else {
            return false;
        }
    }
}