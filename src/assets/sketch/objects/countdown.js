export function Countdown(p5, level, height, width) {

    this.view = true;
    this.count = 4;

    this.show = function() {
      p5.text("Level " + level, width / 2 - 15, height / 2 - 20, 100, 100);
      p5.text(this.count + 1, width / 2, height / 2, 100, 100);
    }
}