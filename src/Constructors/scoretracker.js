var scoreTracker = {

    score: 0,
    multiplier: 1,
    timeRemaining, 0,
    timeBonus: 0,
    total: 0,
    grandTotal: 0
};

scoreTracker.scoreIncM = function(n) {
    this.score += n * this.multiplier;
};

scoreTracker.multiUpdate = function(n) {

    if (n >= 96) {
        this.multiplier = 2;
    } else if (n >= 72) {
        this.multiplier = 1.5;
    } else if (n >= 48) {
        this.multiplier = 1;
    } else {
        this.multiplier = 0.5;
    }
};

scoreTracker.reset = function() {
    this.score = 0;
    this.multiplier = 1;
    this.timeRemaining = 0;
    this.timeBonus = 0;
    this.total = 0;
};

scoreTracker.tabulate = function(time) {
    this.timeRemaining = time;
    this.timeBonus = time * 10 * 25 * this.multiplier;
    this.total = this.score + this.timeBonus;
    this.grandTotal += this.total;
};

module.exports = scoreTracker;
