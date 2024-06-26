#!/usr/bin/env sh

# abort on errors
set -e

# build
bun run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push --force git@github.com:TuberculeP/Simple-Horloge.git master:gh-pages

cd -