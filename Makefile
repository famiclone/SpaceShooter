run:
	parcel ./src/index.html

build:
	rm -rf ./dist && parcel build ./src/index.html

deploy:
	git subtree push --prefix="dist" -b folder-only origin gh-pages