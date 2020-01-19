import test from '../../images/battleship.png';
export function Wall(p5, x, y) {

    this.x = x;
    this.y = y;
    this.damage = 0;
    this.destroy = false;
    this.images = [
        test
    ]
    this.img2 = p5.loadImage(this.images[0]); 

    this.show = function() {
        p5.image(this.img2, this.x, this.y, 160, 60 );
    }

    this.takeDamage = function() {
        this.damage < 10 ? this.damage++ : this.destroy = true;
    }
}