export function Scorebox(p5, count) {

    this.count = count;

    this.show = function() {
        p5.text('Score: ' + this.count, 10, 10, 100, 100);
    }

    this.updateScore = function(score) {
        this.count = score;
    }
}