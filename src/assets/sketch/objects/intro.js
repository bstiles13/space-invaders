export function Intro(p5, height, width) {
    this.show = function() {
      p5.text('Press SPACEBAR to start', (width / 2) - 80 , height / 2, 200, 100);
    }
}