var canvas          = require("./canvas");
var getStorage      = require("./storage").getStorage;
var toTenths        = require("./numstring").toTenths;

var scoreTracker = {

    score: 0,
    multiplier: 1,
    timeRemaining: 0,
    timeBonus: 0,
    total: 0,
    grandTotal: 0,
    hiScore: 0,

    storage: getStorage(),
    hiScores: null
};

scoreTracker.getHiScores = function(scenes) {
    "use strict";

    var hiScores = scenes.map(scene => {
        return [scene.name, scene.defaultScore];
    });

    if (this.storage) {

        if (!this.storage.getItem("hiScores")) {
            this.storage.setItem("hiScores", JSON.stringify(hiScores));
        } else {
            hiScores = JSON.parse(this.storage.getItem("hiScores"));
        }
    } 
    this.hiScores = hiScores;
};

scoreTracker.setHiScore = function(sceneName) {
    "use strict";
    this.hiScore = this.hiScores.find(entry => {
        return entry[0] === sceneName;
    })[1];
};

scoreTracker.timeUpdate = function(delta) {
    "use strict";

    if (this.timeRemaining > 0) {
        this.timeRemaining -= delta / 1000;
    }
};

scoreTracker.displayTime = function() {
    "use strict";

    if (this.timeRemaining <= 0) {
        return "0.0";
    } else {
        return toTenths(this.timeRemaining);
    }
};

scoreTracker.displayMulti = function() {
    "use strict";

    return toTenths(this.multiplier);
};

scoreTracker.scoreInc = function(n) {
    "use strict";

    this.score += n * this.multiplier;
};

scoreTracker.multiUpdate = function(w, b) {
    "use strict";

    // Every method is universal except this one.
    if (w >= b * 3) {
        this.multiplier = 2;
    } else if (w >= b * 2) {
        this.multiplier = 1.5;
    } else if (w >= b) {
        this.multiplier = 1;
    } else {
        this.multiplier = 0.5;
    }
};

scoreTracker.reset = function() {
    "use strict";

    this.score = 0;
    this.multiplier = 1;
    this.timeRemaining = 0;
    this.timeBonus = 0;
    this.total = 0;
};

scoreTracker.setNewHiScore = function(sceneName) {
    "use strict";
    var sceneRef;

    sceneRef = this.hiScores.find(scene => {
        return scene[0] === sceneName;
    });
    sceneRef[1] = this.total;

    if (this.storage) {
        this.updateStorage();
    }
};

scoreTracker.updateStorage = function() {
    "use strict";

    this.storage.removeItem("hiScores");
    this.storage.setItem("hiScores", JSON.stringify(this.hiScores));
};

scoreTracker.tabulate = function(sceneName) {
    "use strict";

    // Total up scores
    this.timeRemaining = toTenths(this.timeRemaining);
    this.timeBonus = this.timeRemaining * 25 * this.multiplier;
    this.total = this.score + this.timeBonus;
    this.grandTotal += this.total;

    if (this.total > this.hiScore) {
        this.setNewHiScore(sceneName);
    }

    // Positioning properties
    this.xC = canvas.width / 2;
    this.yC = canvas.height / 2;
    this.rectW = 336;
    this.rectH = 252;
    this.rectX = this.xC - this.rectW / 2;
    this.rectY = this.yC - this.rectH / 2;
    this.tXL = this.xC - 144;
    this.tXR = this.xC + 144;
    this.tYT = this.yC - 84;
    this.lineHeight = 36;

    this.fields = [
        ["Score", this.score],
        ["Time", this.timeRemaining],
        ["Multiplier", toTenths(this.multiplier)],
        ["Time Bonus", toTenths(this.timeBonus)],
        ["Total", this.total],
        ["Grand Total", this.grandTotal]
    ];
};

scoreTracker.draw = function(color) {
    "use strict";

    var ctx = canvas.ctx;

    ctx.save();

    ctx.fillStyle = color;
    ctx.fillRect(this.rectX, this.rectY, this.rectW, this.rectH);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.strokeRect(this.rectX, this.rectY, this.rectW, this.rectH);

    ctx.font = "24px monospace";
    ctx.fillStyle = "white";

    this.fields.forEach((field, i) => {
        ctx.textAlign = "left";
        ctx.fillText(field[0], this.tXL, this.tYT + i * this.lineHeight);
        ctx.textAlign = "right";
        ctx.fillText(field[1], this.tXR, this.tYT + i * this.lineHeight);
    });

    ctx.restore();
};

module.exports = scoreTracker;
