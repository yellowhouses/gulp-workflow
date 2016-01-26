git checkout dev
git push origin dev
git checkout gh-pages
git merge dev --ff
git push origin gh-pages
echo "all pushed!"
git checkout dev