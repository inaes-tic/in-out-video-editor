HTML5 In Out Video Editor
=========================

Setup
-----

Get the npm packages, the video sample and the chrome driver for testing

```bash
make
```

Testing
-------

Run unitary tests

```bash
mocha -t 10000 tests/unit/model.js
```

Run functional test

```bash
#shell 1
node server.js
```

```bash
#shell 2
java -jar Sauce-Connect.jar $SAUCE_USERNAME $SAUCE_ACCESS_KEY
```

```bash
#shell 3
mocha -t 50000 tests/func/sauce.js
```

Basic usage
-----------

```javascript
var editor = new iove.InOutVideoEditor({
    src: 'videos/ed_1024.ogv',
    fps: 24
});
```

Complete example
----------------

Look at iove.html file
