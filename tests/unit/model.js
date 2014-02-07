var iove = require('../../iove');
var expect = require('chai').expect;


describe("Sync tests", function() {

    before(function() {
        this.editor = new iove.InOutVideoEditor({ fps: 25 });
    });

    it("Convert time to frame (fps = 25)", function() {
        expect( this.editor.timeToFrame(0)     ).equals(0);
        expect( this.editor.timeToFrame(0.039) ).equals(0);
        expect( this.editor.timeToFrame(0.04)  ).equals(1);
        expect( this.editor.timeToFrame(0.079) ).equals(1);
        expect( this.editor.timeToFrame(0.08)  ).equals(2);
        expect( this.editor.timeToFrame(0.119) ).equals(2);
        expect( this.editor.timeToFrame(0.12)  ).equals(3);
    });

    it("Convert frame to time (fps = 25)", function() {
        expect( this.editor.frameToTime(0) ).equals(0.000001);
        expect( this.editor.frameToTime(1) ).equals(0.040001);
        expect( this.editor.frameToTime(2) ).equals(0.080001);
        expect( this.editor.frameToTime(3) ).equals(0.120001);
    });

});
