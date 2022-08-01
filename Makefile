test:
	npm run test

test-coverage:
	npm run test

install:
	npm ci

lint:
	npx eslint .

gendiff:
	node ./bin/gendiff.js

publish:
	npm publish --dry-run