test:
	npm run test

test-coverage:
	npm run test

install:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run