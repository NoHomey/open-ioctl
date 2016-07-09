__npm_bin__ = ./node_modules/.bin

all: clean
	$(__npm_bin__)/tsc --declaration

install:
	npm install
	$(__npm_bin__)/typings install

clean:
	rm -f index.js index.d.ts

reset: clean
	 rm -fR typings node_modules