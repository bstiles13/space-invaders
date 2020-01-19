export function GameOver(p5, height, width) {
    this.show = function() {
      p5.text('GAME OVER', width / 2, height / 2, 100, 100);
    }
}