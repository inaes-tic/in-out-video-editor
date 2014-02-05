// Using Sauce Connect: https://saucelabs.com/docs/connect

var webdriver = require('wd');
var expect = require('chai').expect;


describe('Test In-Out Video Editor', function() {

    var browser;

    before(function(done) {
        browser = webdriver.promiseChainRemote(
            "localhost",
            4445,
            process.env.SAUCE_USERNAME,
            process.env.SAUCE_ACCESS_KEY
        );

        browser.on('status', function(info) {
            console.log(info);
        });
        browser.on('command', function(meth, path, data) {
            console.log(' > ' + meth, path, data || '');
        });

        var options = {
          browserName: 'chrome',
          version: '26',
          platform: 'Linux',
          tags: ["examples"],
          name: "This is an example test with mocha"
        };

        return browser
            .init(options)
            .get('http://localhost:3000/iove-local.html')
            .nodeify(done);
    });

    after(function(done) {
        return browser
            .quit()
            .nodeify(done);
    });

    describe('Check UI', function() {

        it('Should see the correct title', function(done) {
            browser
                .title(function(err, title) {
                    expect(title).equals('In Out Video Editor');
                })
                .nodeify(done);
        });

        it('Should see the correct video duration', function(done) {
            browser
                .elementById('duration')
                .text(function(err, text) {
                    expect(text).equals('5.546667098999023');
                })
                .nodeify(done);
        });

        it('Should see the correct total frames', function(done) {
            browser
                .elementById('totalFrames')
                .text(function(err, text) {
                    expect(text).equals('166');
                })
                .nodeify(done);
        });

        it('Should play the video', function(done) {
            browser
                .elementById('play')
                .click()
                .eval('$("#video")[0].paused', function(err, value) {
                    expect(value).equals(false);
                })
                .nodeify(done);
        });

        it('Current frame should be above 0', function(done) {
            browser
                .elementById('currentFrame')
                .text(function(err, value) {
                    expect(parseInt(value)).to.be.above(0);
                })
                .nodeify(done);
        });

        it('Current time should be above 0', function(done) {
            browser
                .elementById('currentTime')
                .text(function(err, value) {
                    expect(parseFloat(value)).to.be.above(0);
                })
                .nodeify(done);
        });

        it('Should pause the video', function(done) {
            browser
                .elementById('pause')
                .click()
                .eval('$("#video")[0].paused', function(err, value) {
                    expect(value).equals(true);
                })
                .nodeify(done);
        });

        it('Should seek +1 frame', function(done) {
            var currentFrame;
            browser
                .elementById('currentFrame')
                .text(function(err, value) {
                    currentFrame = parseInt(value);
                })
                .elementById('plus1')
                .click()
                .elementById('currentFrame')
                .text(function(err, value) {
                    expect(value).equal(parseInt(currentFrame) + 1);
                })
                .nodeify(done);
        });

        it('Should seek -10 frames', function(done) {
            var currentFrame;
            browser
                .elementById('currentFrame')
                .text(function(err, value) {
                    currentFrame = parseInt(value);
                })
                .elementById('minus10')
                .click()
                .elementById('currentFrame')
                .text(function(err, value) {
                    expect(value).equal(parseInt(currentFrame) - 10);
                })
                .nodeify(done);
        });

        it('Should go to frame 25', function(done) {
            browser
                .elementById('frame')
                .clear()
                .type('25')
                .elementById('goToFrame')
                .click()
                .elementById('currentFrame')
                .text(function(err, value) {
                    expect(value).equal('25');
                })
                .nodeify(done);
        });

        it('Should set begin', function(done) {
            browser
                .elementById('setBegin')
                .click()
                .elementById('beginAt')
                .text(function(err, value) {
                    expect(value).equal('25');
                })
                .nodeify(done);
        });

        it('Should go to frame 150 on range input', function(done) {
            browser
                .eval('$("#seek-bar").val(150).trigger("change")')
                .elementById('currentFrame')
                .text(function(err, value) {
                    expect(value).equal('150');
                })
                .nodeify(done);
        });

        it('Should set end', function(done) {
            browser
                .elementById('setEnd')
                .click()
                .elementById('endAt')
                .text(function(err, value) {
                    expect(value).equal('150');
                })
                .nodeify(done);
        });

        it('Should go to begin', function(done) {
            browser
                .elementById('goToBegin')
                .click()
                .elementById('currentFrame')
                .text(function(err, value) {
                    expect(value).equal('25');
                })
                .nodeify(done);
        });

        it('Should go to end', function(done) {
            browser
                .elementById('goToEnd')
                .click()
                .elementById('currentFrame')
                .text(function(err, value) {
                    expect(value).equal('150');
                })
                .nodeify(done);
        });

    });

})

