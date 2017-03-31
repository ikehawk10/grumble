# grumble
Grumble Food App

After you've pulled the most current code, navigate to the cloned repo and create a branch with your terminal. This can be accomplished using "git branch BRANCHNAME" where BRANCHNAME is your unique branch name. Please make this as semantic as possible to avoid confusion. Ex. stephenFrontEnd or isaacYelpAjax etc.  

After making a branch you will want to navigate to that branch directory using "git checkout BRANCHNAME". 
This branch only exists on your local machine. Feel free to make commits in this local branch as it won't affect any of the master branch code. If you want to git push this branch to the repo you will have to "set" it first. The command to set a branch is "git push --set-upstream origin BRANCHNAME". 

When you are ready to merge with the master branch you have two options. 


ONE: MERGE LOCALLY FIRST 

Navigate back to the master branch clone using "git checkout master". You can then use "git merge BRANCHNAME" to merge you branch with your local copy. If there are any conflicts you can then go in and make any changes. 

