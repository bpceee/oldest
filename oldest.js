(([_, repo, branch='master']) => {
  fetch(`https://github.com/${repo}/tree/${branch}`)
    .then(res => res.text())
    .then(res => {
      let mainDocument = new DOMParser().parseFromString(res, 'text/html');
      let commitCount = mainDocument.evaluate('//span[@class="d-none d-sm-inline"]//strong', mainDocument.body).iterateNext().innerText;
      commitCount = Number(commitCount.trim().replace(',', ''));
      let commitId = mainDocument.evaluate('//*[@class="f6 Link--secondary text-mono ml-2 d-none d-lg-inline"]', mainDocument.body).iterateNext().getAttribute("href").split('/').pop();
      let url = `https://github.com/${repo}/commits/${branch}?after=${commitId}+${commitCount-10}`;
      window.location = url;
  })
})(window.location.pathname.match(/\/([^\/]+\/[^\/]+)(?:\/(?:tree|commits|blob)\/([^\/]+))?/));
