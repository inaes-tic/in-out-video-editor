var InOutVideoEditorView = kb.ViewModel.extend({

    constructor: function(model, video) {
        kb.ViewModel.prototype.constructor.apply(this, [model]);
        this.video = video;
        var self = this;

        $(this.video).bind('loadedmetadata', function() {
            self.width(this.videoWidth);
            self.height(this.videoHeight);
            self.duration(this.duration);
            self.totalFrames(self.model().timeToFrame(this.duration));
            self.endAt(self.totalFrames());
        });

        $(this.video).bind('timeupdate', function() {
            self.currentTime(self.video.currentTime);
            self.currentFrame(self.model().timeToFrame(self.currentTime()));
        });
    },

    play: function() {
        this.video.play();
    },

    pause: function() {
        this.video.pause();
        this.currentTime(this.video.currentTime);
        this.currentFrame(this.model().timeToFrame(this.currentTime()));
    },

    offset: function(frames) {
        this.goToFrame(this.currentFrame() + frames);
    },

    setBegin: function() {
        this.beginAt(this.currentFrame());
    },

    setEnd: function() {
        this.endAt(this.currentFrame());
    },

    goToFrame: function(frame) {
        this.video.currentTime = this.model().frameToTime(frame);
    },

    goToBegin: function() {
        this.goToFrame(this.beginAt());
    },

    goToEnd: function() {
        this.goToFrame(this.endAt());
    },

});
