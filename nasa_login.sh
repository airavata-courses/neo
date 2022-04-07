#! /bin/sh

touch ~/.netrc

echo "machine urs.earthdata.nasa.gov login $login_id password $login_pw" > ~/.netrc
cp ~/.netrc /.
cp ~/.netrc /data-processor/
gunicorn --bind 0.0.0.0:8087 --capture-output app:app