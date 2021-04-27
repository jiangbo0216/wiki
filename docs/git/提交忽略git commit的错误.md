# 提交忽略git commit的错误

Catch this condition beforehand by checking the exit code of git diff?

For example (in shell):

git add -A
git diff-index --quiet HEAD || git commit -m 'bla'
EDIT: Fixed git diff command according to Holger's comment.
