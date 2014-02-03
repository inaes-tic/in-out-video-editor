export MOCHA=node_modules/mocha/bin/mocha

all: npm video chromedriver

setup: npm video chromedriver

video: videos/ed_1024.ogv

videos/ed_1024.ogv:
	@echo 'Downloading video for testing...'
	@curl -o videos/ed_1024.ogv --location \
	      https://archive.org/download/ElephantsDream/ed_1024.ogv
	@echo 'Done.'

chromedriver: bin/chromedriver

bin/chromedriver:
	@echo 'Downloading Chrome driver...'
	@curl -o bin/chromedriver.zip \
	      http://chromedriver.storage.googleapis.com/2.8/chromedriver_linux32.zip
	@echo 'Done.'
	@echo 'Unzipping chromedriver...'
	@cd bin/; unzip chromedriver.zip; rm chromedriver.zip; cd -
	@echo 'Done.'

test: npm video chromedriver unitary_test functional_test

npm:
	@npm install

unitary_test:
	@echo "Running unitary tests..."
	@LOG_LEVEL=error ${MOCHA} --timeout 10000 tests/unit/model.js

functional_test:
	@echo "Running functional tests..."
	@PATH=bin:${PATH} LOG_LEVEL=error ${MOCHA} --timeout 10000 tests/func/ui.js

clean:
	@rm bin/chromedriver*
	@rm videos/ed_1024.ogv
	@rm -r node_modules

.PHONY: clean npm video chromedriver unitary_test functional_test
