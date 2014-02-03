// http://code.google.com/p/selenium/wiki/WebDriverJs

var webdriver = require('selenium-webdriver');
var By = webdriver.By;

var driver = new webdriver.Builder().
    //usingServer('http://127.0.0.1:4444/wd/hub').
    withCapabilities(webdriver.Capabilities.chrome()).
    build();

var expect = require('chai').expect;

var timeout = 500;


describe('Test In-Out Video Editor', function() {

    before(function(done) {
        driver.get('file:///' + __dirname + '/../../iove.html');
        done();
    });

    describe('Check UI', function() {

        it('Should see the correct title', function(done) {
            driver.getTitle().then(function(title) {
                expect(title).to.have.string('In Out Video Editor');
                done();
            });
        });

        it('Should see the correct video duration', function(done) {
            driver.findElement(By.id('duration')).getText().then(function(text) {
                expect(text).equals('653.791667');
                done();
            });
        });

        it('Should see the correct total frames', function(done) {
            driver.findElement(By.id('totalFrames')).getText().then(function(text) {
                expect(text).equals('15691');
                done();
            });
        });

        it('Should play the video', function(done) {
            driver.findElement(By.id('play')).click().then(function() {
                setTimeout(function() {
                    driver.executeScript("return $('#video')[0].paused").then(function(value) {
                        expect(value).equals(false);
                        done();
                    });
                }, timeout);
            });
        });

        it('Current frame should be above 0', function(done) {
            driver.findElement(By.id('currentFrame')).getText().then(function(value) {
                expect(parseInt(value)).to.be.above(0);
                done();
            });
        });

        it('Current time should be above 0', function(done) {
            driver.findElement(By.id('currentTime')).getText().then(function(value) {
                expect(parseFloat(value)).to.be.above(0);
                done();
            });
        });

        it('Should pause the video', function(done) {
            driver.findElement(By.id('pause')).click().then(function() {
                setTimeout(function() {
                    driver.executeScript("return $('#video')[0].paused").then(function(value) {
                        expect(value).equals(true);
                        done();
                    })
                }, timeout);
            });
        });

        it('Should seek +1 frame', function(done) {
            driver.findElement(By.id('currentFrame')).getText().then(function(value) {
                var currentFrame = value;
                driver.findElement(By.id('plus1')).click().then(function() {
                    setTimeout(function() {
                        driver.findElement(By.id('currentFrame')).getText().then(function(value) {
                            expect(parseInt(value)).equal(parseInt(currentFrame) + 1);
                            done();
                        });
                    }, timeout);
                });
            });
        });

        it('Should seek -10 frames', function(done) {
            driver.findElement(By.id('currentFrame')).getText().then(function(value) {
                var currentFrame = value;
                driver.findElement(By.id('minus10')).click().then(function() {
                    setTimeout(function() {
                        driver.findElement(By.id('currentFrame')).getText().then(function(value) {
                            expect(parseInt(value)).equal(parseInt(currentFrame) - 10);
                            done();
                        });
                    }, timeout);
                });
            });
        });

        it('Should go to frame 2500', function(done) {
            var frame = driver.findElement(By.id('frame'));
            frame.clear();
            frame.sendKeys('2500').then(function() {
                driver.findElement(By.id('goToFrame')).click().then(function() {
                    setTimeout(function() {
                        driver.findElement(By.id('currentFrame')).getText().then(function(value) {
                            expect(value).equal('2500');
                            done();
                        });
                    }, timeout);
                });
            });
        });

        it('Should set begin', function(done) {
            driver.findElement(By.id('setBegin')).click().then(function() {
                setTimeout(function() {
                    driver.findElement(By.id('beginAt')).getText().then(function(value) {
                        expect(value).equal('2500');
                        done();
                    });
                }, timeout);
            });
        });

        it('Should go to frame 11000 on range input', function(done) {
            driver.executeScript("$('#seek-bar').val(11000).trigger('change')").then(function() {
                setTimeout(function() {
                    driver.findElement(By.id('currentFrame')).getText().then(function(value) {
                        expect(value).equal('11000');
                        done();
                    });
                }, timeout);
            })
        });

        it('Should set end', function(done) {
            driver.findElement(By.id('setEnd')).click().then(function() {
                setTimeout(function() {
                    driver.findElement(By.id('endAt')).getText().then(function(value) {
                        expect(value).equal('11000');
                        done();
                    });
                }, timeout);
            });
        });

        it('Should go to begin', function(done) {
            driver.findElement(By.id('goToBegin')).click().then(function() {
                setTimeout(function() {
                    driver.findElement(By.id('currentFrame')).getText().then(function(value) {
                        expect(value).equal('2500');
                        done();
                    });
                }, timeout);
            });
        });

        it('Should go to end', function(done) {
            driver.findElement(By.id('goToEnd')).click().then(function() {
                setTimeout(function() {
                    driver.findElement(By.id('currentFrame')).getText().then(function(value) {
                        expect(value).equal('11000');
                        done();
                    });
                }, timeout);
            });
        });

    });

    after(function(done) {
        driver.quit();
        done();
    });

})

