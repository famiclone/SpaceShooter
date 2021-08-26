run:
	npx concurrently "tsc -w &&" "browser-sync start -s ./dist"

git-clean:
	git rm -r --cached .

clean:
	rm -rf dist

build: clean
	tsc 

deploy: build
	git subtree push --prefix="dist"  origin gh-pages