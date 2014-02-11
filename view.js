var InOutVideoEditorView = kb.ViewModel.extend({

    constructor: function(model, video) {
        kb.ViewModel.prototype.constructor.apply(this, [model]);
        this.video = video;
        var self = this;

        $(this.video)
            .bind('loadedmetadata', function() {
                self.width(this.videoWidth);
                self.height(this.videoHeight);
                self.duration(this.duration);
                self.totalFrames(self.model().timeToFrame(this.duration));
                self.endAt(self.totalFrames());
            })
            .bind('timeupdate', function() {
                if ( ! self.video.paused ) {
                    self.currentTime(self.video.currentTime);
                }
                self.currentFrame(self.model().timeToFrame(self.currentTime()));
            });
    },

    applyKeyBindings: function() {
        var self = this;

        $(this.video)
            .attr('tabindex', '0')
            .focus(function() { self.keys = ''; })
            .click(function() { this.focus(); });

        $(document).keydown(function(e) {
            if (e.srcElement.id != self.video.id) {
                return;
            }

            var keyCode = e.which;
            var key = String.fromCharCode(keyCode);
            var shiftKey = e.shiftKey;
            var ctrlKey = e.ctrlKey;
            var altKey = e.altKey;
            var spaceKey = (keyCode == 32);
            var arrowLeftKey = (keyCode == 37);
            var arrowRightKey = (keyCode == 39);
            var squareBracketLeft = (keyCode == 219);
            var squareBracketRight = (keyCode == 221);

            if ( ! isNaN(key) ) { // is number
                self.keys += key;
            } else {
                if (self.keys) {
                    if (key == 'G') {
                        self.goToFrame(parseInt(self.keys));
                    }
                    self.keys = '';
                }
            }
            self.currentFrame(self.model().timeToFrame(self.currentTime()));
            if (spaceKey) {
                if (self.video.paused) {
                    self.play();
                } else {
                    self.pause();
                }
            }
            if (arrowRightKey && !shiftKey) {
                self.offset(1);
            }
            if (arrowRightKey && shiftKey) {
                self.offset(10);
            }
            if (arrowLeftKey && !shiftKey) {
                self.offset(-1);
            }
            if (arrowLeftKey && shiftKey) {
                self.offset(-10);
            }
            if (squareBracketLeft) {
                self.setBegin();
            }
            if (squareBracketRight) {
                self.setEnd();
            }
            if (arrowLeftKey && ctrlKey) {
                if (self.currentFrame() <= self.beginAt()) {
                    self.goToFrame(1);
                } else {
                    if (self.currentFrame() <= self.endAt()) {
                        self.goToBegin();
                    } else {
                        self.goToEnd();
                    }
                }
            }
            if (arrowRightKey && ctrlKey) {
                if (self.currentFrame() >= self.endAt()) {
                    self.goToFrame(self.totalFrames());
                } else {
                    if (self.currentFrame() >= self.beginAt()) {
                        self.goToEnd();
                    } else {
                        self.goToBegin();
                    }
                }
            }

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
        this.currentTime(this.model().frameToTime(frame))
        this.video.currentTime = this.currentTime();
    },

    goToBegin: function() {
        this.goToFrame(this.beginAt());
    },

    goToEnd: function() {
        this.goToFrame(this.endAt());
    },

});
