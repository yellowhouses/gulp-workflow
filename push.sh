git checkout dev
git push origin dev
git checkout master
git merge dev
git push origin master
git checkout gh-pages
git merge dev
git push origin gh-pages
echo "all pushed!"
git checkout dev