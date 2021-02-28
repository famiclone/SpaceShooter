run:
	npx parcel ./src/index.html

build:
	rm -rf ./dist && npx parcel  build --no-cache --no-content-hash --no-source-maps --public-url '/SpaceShooter'./src/index.html

deploy: build
	git subtree push --prefix="dist"  origin gh-pages