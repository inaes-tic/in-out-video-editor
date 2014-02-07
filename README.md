HTML5 In Out Video Editor
=========================

Setup
-----

Get the npm packages and the Sauce Labs Connect server

```bash
make
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

Tests
-----

A Sauce Labs account is required to run the functional tests.
Create an Sauce Labs account and export the following env variables:

```bash
export SAUCE_USERNAME=[your-username]
export SAUCE_ACCESS_KEY=[your-sauce-access-key]
```

Run all tests (unitary and functional)

```bash
make test
```

Run only unitary tests

```bash
make unitary_test
```

Run only functional tests

```bash
make functional_test
```

