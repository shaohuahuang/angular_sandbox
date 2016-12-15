#!/usr/bin/env bash

echo "-----stage all changes"
git add -A
echo "-----commit all changes"
git commit -m "$*"
echo "-----push to fork repo"
git push origin master


