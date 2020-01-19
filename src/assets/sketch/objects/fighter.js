import test from '../../images/xwing.png'
export function Fighter(p5, height, width) {
    this.x = width/2;
    this.y = height - 60;
    this.radius = 20;
    const img1 = p5.loadImage(test); 
    this.direction = 0;


    this.show = function() {
        p5.image(img1, this.x, this.y, this.radius * 3, this.radius * 3);
    }

    // this.set = function (dir) {
    //     this.direction = dir;
    // } 

    // this.move = function() {
    //     this.x += this.direction * 4;
    // }
}

