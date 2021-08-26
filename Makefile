run:
	npx browser-sync start -s ./dist

parcel-clean:
	rm -rf ./dist .cache

git-clean:
	git rm -r --cached .

clean: parcel-clean
	echo "✅ Cleaned"

build: clean
	npx parcel build --no-cache --public-url '/SpaceShooter' ./src/index.html

deploy: build
	git subtree push --prefix="dist"  origin gh-pages