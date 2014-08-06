
test:
	@node_modules/.bin/mocha \
		--harmony \
		--reporter spec

bench:
	@node --harmony support/bench.js

.PHONY: test bench

