run:
	npx parcel ./src/index.html

clean:
	git rm -r --cached . && rm -rf ./dist .cache

build: clean
	npx parcel build --public-url '/SpaceShooter' ./src/index.html

deploy: build
	git subtree push --prefix="dist"  origin gh-pages