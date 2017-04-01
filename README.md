# grumble
Grumble Food App

After you've pulled the most current code, navigate to the cloned repo and create a branch with your terminal. This can be accomplished using <b>git branch BRANCHNAME</b> where BRANCHNAME is your unique branch name. Please make this as semantic as possible to avoid confusion. Ex. stephenFrontEnd or isaacYelpAjax etc.  

After making a branch you will want to navigate to that branch directory using <b>git checkout BRANCHNAME</b>. 
This branch only exists on your local machine. Feel free to make commits in this local branch as it won't affect any of the master branch code. If you want to git push this branch to the repo you will have to "set" it first. The command to set a branch is <b>git push --set-upstream origin BRANCHNAME</b>. You can push changes to your branch once it has been set using <b>git push origin BRANCHNAME</b>. 

When you are ready to merge with the master branch you have two options:


ONE: MERGE LOCALLY FIRST 

Navigate back to the master branch clone using <b>git checkout master"]</b>. You can then use <b>git merge BRANCHNAME</b> to merge your branch with your local copy of the master. If there are any conflicts you can then go in and make any changes. Once any conflicts are resolved you can then git add, commit, and push to the origin master. 


TWO: CREATE A PULL REQUEST IN GITHUB

If your changes have been pushed to github you can go into the repo and navigate to your branch via the dropdown menu. Then create a pull request in github. In the pull requests section your request will appear. Since you are a collaborator you have the power to merge the changes yourself but if you'd rather someone take a look at them first you are welcome to do that as well. Click on the merge button to see if there are any conflicts. If not you can confirm the merge, overwriting the master branch. You will also have the option to delete your branch which you can do to keep the repo tidy. 
