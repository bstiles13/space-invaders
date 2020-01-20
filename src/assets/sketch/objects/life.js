export function Life(p5, height, width) {

    this.show = function(lives) {
        p5.text('Lives: ' + lives, width - 60, 10, 100, 100);
    }
}