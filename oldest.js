(([_, repo, branchInUrl]) => {
  // GitHub now renders repository pages with React. The branch, latest commit and
  // commit count are in the page's embedded JSON, not in the old markup.
  const page = branchInUrl ? `https://github.com/${repo}/tree/${branchInUrl}` : `https://github.com/${repo}`;
  fetch(page)
    .then(res => res.text())
    .then(res => {
      const field = pattern => {
        const match = res.match(pattern);
        if (!match) throw new Error(`oldest: ${pattern} not found on ${page}`);
        return match[1];
      };
      const branch = JSON.parse(`"${field(/"refInfo":\{"name":"((?:[^"\\]|\\.)*)"/)}"`);
      const commitId = field(/"currentOid":"([0-9a-f]{40})"/);
      const commitCount = Number(field(/"commitCount":"([\d,]+)"/).replaceAll(',', ''));
      const url = `https://github.com/${repo}/commits/${branch}?after=${commitId}+${Math.max(commitCount - 10, 0)}`;
      window.location = url;
  })
})(window.location.pathname.match(/\/([^\/]+\/[^\/]+)(?:\/(?:tree|commits|blob)\/([^\/]+))?/));
