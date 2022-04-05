#! /bin/sh

touch ~/.netrc

echo "machine urs.earthdata.nasa.gov login $login_id password $login_pw" > ~/.netrc