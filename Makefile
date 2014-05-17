
test:
	@node_modules/.bin/mocha \
		--harmony \
		--reporter spec

.PHONY: test

