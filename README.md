OLDEST
====
A bookmarklet to quickly get you to the oldest commit page of a repo.

### Overview

Being able to quickly navigate to the oldest commit page in a repo is quite helpful. Go ahead and drag this bookmarklet <a href="javascript:(function()%7B((%5B_%2C%20repo%2C%20branch%3D'master'%5D)%20%3D%3E%20%7Bfetch(%60https%3A%2F%2Fgithub.com%2F%24%7Brepo%7D%2Ftree%2F%24%7Bbranch%7D%60).then(res%20%3D%3E%20res.text()).then(res%20%3D%3E%20%7Blet%20mainDocument%20%3D%20new%20DOMParser().parseFromString(res%2C%20'text%2Fhtml')%3Blet%20commitCount%20%3D%20mainDocument.evaluate('%2F%2Fli%5B%40class%3D%22commits%22%5D%2F%2Fspan'%2C%20mainDocument.body).iterateNext().innerText%3BcommitCount%20%3D%20Number(commitCount.trim().replace('%2C'%2C%20''))%3Blet%20commitId%20%3D%20mainDocument.evaluate('%2F%2F*%5B%40class%3D%22commit-tease%20commit-loader%22%5D'%2C%20mainDocument.body).iterateNext().getAttribute(%22src%22).split('%2F').pop()%3Blet%20url%20%3D%20%60https%3A%2F%2Fgithub.com%2F%24%7Brepo%7D%2Fcommits%2F%24%7Bbranch%7D%3Fafter%3D%24%7BcommitId%7D%2B%24%7BcommitCount-10%7D%60%3Bwindow.location%20%3D%20url%3B%7D)%7D)(window.location.pathname.match(%2F%5C%2F(%5B%5E%5C%2F%5D%2B%5C%2F%5B%5E%5C%2F%5D%2B)(%3F%3A%5C%2F(%3F%3Atree%7Ccommits)%5C%2F(.%2B))%3F%2F))%7D)()">OLDEST</a> onto your bookmark bar and click it whenever you'd like to go to the first commit of a repo.


#### About
Inspired by [INIT](https://github.com/FarhadG/init). However there is a limitation on api.github.com calls, so this bookmarklet parses the main page to get the commitID and count.

Use https://mrcoles.com/bookmarklet/ as a bookmarklet creator