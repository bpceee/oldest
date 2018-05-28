(([_, repo, branch='master']) => {
  fetch(`https://github.com/${repo}/tree/${branch}`)
    .then(res => res.text())
    .then(res => {
      let mainDocument = new DOMParser().parseFromString(res, 'text/html');
      let commitCount = mainDocument.evaluate('//li[@class="commits"]//span', mainDocument.body).iterateNext().innerText;
      commitCount = Number(commitCount.trim().replace(',', ''));
      let commitId = mainDocument.evaluate('//*[@class="commit-tease commit-loader"]', mainDocument.body).iterateNext().getAttribute("src").split('/').pop();
      let url = `https://github.com/${repo}/commits/${branch}?after=${commitId}+${commitCount-10}`;
      window.location = url;
    })
})(window.location.pathname.match(/\/([^\/]+\/[^\/]+)(?:\/(?:tree|commits)\/(.+))?/));