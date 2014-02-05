export MOCHA=node_modules/mocha/bin/mocha

all: npm chromedriver

setup: npm chromedriver

chromedriver: bin/chromedriver

bin/chromedriver:
	@echo 'Downloading Chrome driver...'
	@curl -o bin/chromedriver.zip \
	      http://chromedriver.storage.googleapis.com/2.8/chromedriver_linux32.zip
	@echo 'Done.'
	@echo 'Unzipping chromedriver...'
	@cd bin/; unzip chromedriver.zip; rm chromedriver.zip; cd -
	@echo 'Done.'

test: npm chromedriver unitary_test functional_test

npm:
	@npm install

unitary_test:
	@echo "Running unitary tests..."
	@LOG_LEVEL=error ${MOCHA} --timeout 10000 tests/unit/model.js

functional_test:
	@echo "Running functional tests..."
	@PATH=bin:${PATH} LOG_LEVEL=error ${MOCHA} --timeout 50000 tests/func/sauce.js

clean:
	@rm bin/chromedriver*
	@rm -r node_modules

.PHONY: clean npm chromedriver unitary_test functional_test
