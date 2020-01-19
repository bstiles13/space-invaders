import test from '../../images/tie.png';
import test2 from '../../images/tie1.png';

export function Enemy(p5, x, y, where, type) {
      this.x = x;
      this.y = y;
      this.radius = 20;
      this.where = where;
      this.index = type;
      this.images = [
            test,
            test2
      ]
      this.img = p5.loadImage(this.images[this.index]);

    this.show = function() {
          p5.image(this.img, this.x, this.y, this.radius * 2, this.radius * 2);

    }

    this.move = function() {
          this.x = this.x + this.where;
    }

    this.reverse = function() {
          this.where = this.where * -1;
          this.y = this.y + 10;
    }
    
    this.hits = function(fighter) {
        var distance = p5.dist(this.x, this.y, fighter.x + fighter.radius, fighter.y + 10);
        if (distance <= fighter.radius + 15) {
            // console.log('hit');
            return true;
        } else {
            return false;
        }
    }

}

