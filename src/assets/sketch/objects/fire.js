import test from '../../images/fire.png';
export function Fire(p5, x, y) {

    this.x = Math.floor(Math.random() * ((x + 120) - (x - 0) + 1)) + (x - 0);
    this.y = Math.floor(Math.random() * ((y + 27) - (y + 5))) + (y + 5);
    this.width = 40;
    this.height = 20;
    this.img5 = p5.loadImage(test); 

    this.show = function() {
        p5.image(this.img5, this.x, this.y, this.width, this.height);
    }

    this.proximity = function(wall) {
        var distance = p5.dist(this.x, this.y, wall.x + 50, wall.y + 20);
        if (distance <= 150) {
            return true;
        } else {
            return false;
        }
    }
}