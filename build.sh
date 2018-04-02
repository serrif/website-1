#!/bin/bash
cd $HOME/build-websites/kaboom-website/
rm Gemfile.lock
bundle install
if jekyll build --destination $HOME/html/kaboom.pw/; then
	cd $HOME/html/kaboom.pw/
	rm -rf *.br
	rm -rf *.gz
	for file in `find . -type f -name '*'`; do
		$HOME/build-websites/zopfli $file
		$HOME/build-websites/brotli $file
	done
fi
