#!/bin/sh
cd $HOME/build/kaboom.pw/
rm Gemfile.lock
bundle install
if bundle exec jekyll build --destination $HOME/html/kaboom.pw/; then
	cd $HOME/html/kaboom.pw/
	rm -rf *.br
	rm -rf *.gz
	for file in `find . -type f -name '*'`; do
		$HOME/build/zopfli $file
		$HOME/build/brotli $file
	done
fi
