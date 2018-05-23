(([_, repo, branch='master']) => {
  return fetch('https://api.github.com/repos/' + repo + '/commits?sha=' + branch)
    // the link header has additional urls for paging
    .then(res => Promise.all([res.headers.get('link'), res.json()]))
    .then(([link, commits]) => {
      if (!link) {
        return;
      } 
      // the link contains two urls in the form 
      // <https://github.com/...>; rel=blah, <https://github.com/...>; rel=thelastpage
      // split the url out of the string
      let pageurl = link.split(',')[1].split(';')[0].slice(2, -1);
      let totalPage = Number(pageurl.split('page=').pop());
      let firstCommitId = commits[0].sha;
      var afterNum = (totalPage - 1) * 30;

      var url = `https://github.com/${repo}/commits/${branch}?after=${firstCommitId}+${afterNum}`;
      window.location = url;
    })
})(window.location.pathname.match(/\/([^\/]+\/[^\/]+)(?:\/(?:tree|commits)\/(.+))?/));