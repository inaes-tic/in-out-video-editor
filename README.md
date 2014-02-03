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

Run unitary and functional tests

```bash
make test
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
