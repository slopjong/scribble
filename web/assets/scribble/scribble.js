
var ScoreModel = Backbone.Model.extend({

    defaults: function() {
        return {
            score: 0
        };
    },

    setScore: function(score) {
        this.set({score: score});
        console.log('Score is now ' + this.get('score'));
    },

    addScore: function(score) {
        this.setScore(this.get('score') + score);
    },

    resetScore: function() {
        this.set({score: 0});
    }

});

var ScribbleView = Backbone.View.extend({

    id: null,
    enabled: false,

    model: new ScoreModel(),

    initialize: function(options) {
        this.id = options.number;
        this.el = $(".scribble").eq(this.id);
        this.image = $("img", this.el);
        this.el.on('click', options.game.scribbleClick(this));
    },

    addScore: function(score) {
        this.model.addScore(score);
    },

    resetScore: function() {
        this.model.resetScore();
    },

    getScore: function() {
        console.log(this.model);
        return this.model.get('score');
    },

    setImageUrl: function(text) {
        this.image.attr('src', 'http://placehold.it/300x300&text=' + text);
    },

    enable: function() {
        this.enabled = true;
        this.setImageUrl('Click here');
    },

    disable: function() {
        this.enabled = false;
    }

});

var Game = Backbone.View.extend({

    model: new ScoreModel(),
    scoreLabel: $('#score'),

    initialize: function() {
        this.scribbles = [];

        for(i=0; i<4; i++)
            this.scribbles[i] = new ScribbleView({
                number: i,
                game: this
            });

        this.scribbles[0].enable();
    },

    scribbleClick: function(scribble) {

        var game = this;

        return function(event) {
            if(scribble.enabled) {
                var current = scribble.id;
                var next = current + 1;

                game.scribbles[current].disable();

                if(next < game.scribbles.length)
                    game.scribbles[next].enable();

                game.scribbles[current].addScore(100);

                game.updateScore();
            }
        };
    },

    updateScore: function() {
        var score = 0;
        for(i=0; i < this.scribbles.length; i++) {
            score += this.scribbles[i].getScore();
        }

        this.scoreLabel.text(score);
    }

});

var game = new Game();