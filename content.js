function highlightPRStatus() {
  var pullRequests = [].slice.call(document.querySelectorAll('.js-issue-row'), 0);
  pullRequests.forEach(function (pr) {
    var text = pr.querySelector('.opened-by + span span > a')
    if (!!text) {
      var textContent = text.textContent.trim();
      var d = pr.querySelector('.opened-by + span span > a');
      if (textContent == 'Changes requested') {
        d.classList.add('changes-requested');
        d.classList.remove('muted-link');
      } else if (textContent == 'Approved') {
        d.classList.add('approved');
        d.classList.remove('muted-link');
      } else if (textContent == 'Review required') {
        d.classList.add('review-requested');
        d.classList.remove('muted-link');
      }
    }
  });
}

var observer = new MutationObserver(function(mutations) {
  var needsRemoval = false;
  mutations.forEach(function(mutation) {
    Array.prototype.slice.call(mutation.addedNodes).forEach(function(node) {
      if (node instanceof Element && (node.querySelector('.js-issue-row') || node.classList.contains('js-issue-row'))) {
        needsRemoval = true;
      }
    });
  });

  if (needsRemoval) {
    highlightPRStatus();
  }
});

var container = document.getElementById('js-repo-pjax-container');
observer.observe(container, {childList: true, subtree: true});

highlightPRStatus();
