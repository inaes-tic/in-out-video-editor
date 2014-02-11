export MOCHA=node_modules/mocha/bin/mocha

all: npm sauce_connect

setup: npm sauce_connect

sauce_connect: bin/Sauce-Connect.jar

bin/Sauce-Connect.jar:
	@echo 'Downloading Sauce Connect...'
	@curl -o bin/Sauce-Connect-latest.zip \
	      http://saucelabs.com/downloads/Sauce-Connect-latest.zip
	@echo 'Done.'
	@echo 'Unzipping Sauce Connect...'
	@cd bin/; unzip Sauce-Connect-latest.zip; rm Sauce-Connect-latest.zip; cd -
	@echo 'Done.'

test: npm sauce_connect unitary_test functional_test

npm:
	@npm install

unitary_test:
	@echo "Running unitary tests..."
	@LOG_LEVEL=error ${MOCHA} --timeout 10000 tests/unit/model.js

functional_test:
	@echo "Running funcional tests..."
	@bin/run-func-tests

serve:
	@echo "Starting server..."
	@node server &

clean:
	@rm -f bin/Sauce-Connect.jar
	@rm -f bin/NOTICE.txt
	@rm -f bin/license.html
	@rm -rf node_modules

.PHONY: clean npm sauce_connect unitary_test functional_test
