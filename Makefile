run:
	npx parcel ./src/index.html

build:
	rm -rf ./dist && npx parcel build --public-url '/SpaceShooter' ./src/index.html

deploy: build
	git subtree push --prefix="dist" -b folder-only origin gh-pages