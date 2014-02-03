(function(exports, Backbone) {

    exports.InOutVideoEditor = Backbone.Model.extend({

        defaults: {
            src: "",
            fps: 24,
            duration: 0,
            width: 0,
            height: 0,
            totalFrames: 0,
            currentFrame: 0,
            currentTime: 0,
            beginAt: 0,
            endAt: 0,
        },

        timeToFrame: function(time) {
            return Math.floor(time * this.get('fps'));
        },

        frameToTime: function(frame) {
            return frame / this.get('fps');
        },

    });

})(
    typeof exports === 'undefined' ? this['iove']={} : exports,
    typeof Backbone === 'undefined' ? require('backbone') : Backbone
);
