echo ">>>>>>What is your commit message?"
read COMMIT
git add --all
git commit -m "$COMMIT"
echo "commit complete"