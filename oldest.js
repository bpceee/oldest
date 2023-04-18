(([_, repo]) => {
  const branchElement = document.querySelector("#branch-select-menu > summary > span.css-truncate-target");
  const branch = branchElement ? branchElement.textContent : 'master';
  fetch(`https://github.com/${repo}/tree/${branch}`)
    .then(res => res.text())
    .then(res => {
      const mainDocument = new DOMParser().parseFromString(res, 'text/html');
      let commitCount = mainDocument.evaluate('//span[@class="d-none d-sm-inline"]//strong', mainDocument.body).iterateNext().innerText;
      commitCount = Number(commitCount.trim().replaceAll(',', ''));
      const commitId = mainDocument
        .evaluate('//*[@class="f6 Link--secondary text-mono ml-2 d-none d-lg-inline"]', mainDocument.body)
        .iterateNext()
        .getAttribute("href")
        .split('/')
        .pop();
      const url = `https://github.com/${repo}/commits/${branch}?after=${commitId}+${commitCount-10}`;
      window.location = url;
  })
})(window.location.pathname.match(/\/([^\/]+\/[^\/]+)(?:\/(?:tree|commits|blob)\/([^\/]+))?/));
