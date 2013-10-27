
var ScribbleModel = Backbone.Model.extend({

    defaults: function() {
        return {
            score: 0
        };
    }
});

var ScribbleView = Backbone.View.extend({

    model: new ScribbleModel(),

    initialize: function(options) {
        this.el = $(".scribble").get(options.number);
    }
});

var Game = Backbone.View.extend({

    initialize: function() {
        this.scribbles = [];

        for(i=0; i<4; i++)
            this.scribbles[i] = new ScribbleView({ number: i});
    }

});

var game = new Game();