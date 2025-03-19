document.addEventListener('DOMContentLoaded', function () {
  const articles = document.querySelectorAll('article.post.featured');
  if (!articles.length) return;

  const threshold = -20;  // 當文章滾到這個位置時，才會變成候選 sticky header
  const bufferZone = 50;  // **這個值決定了往回拉時 header 會提早多少顯示**
  const headers = [];
  let lastScrollTop = window.scrollY; // 記錄滾動方向

  articles.forEach(article => {
    const h2Link = article.querySelector('h2 a');
    if (h2Link) {
      h2Link.style.transition = "box-shadow 0.3s ease, background 0.3s ease";
      headers.push({ article: article, header: h2Link });
      article.style.position = 'relative';
    }
  });

  window.addEventListener('scroll', onScroll);
  function onScroll() {
    window.requestAnimationFrame(updateSticky);
  }

  function updateSticky() {
    let candidate = null;
    let candidateValue = Infinity;
    let scrollTop = window.scrollY;
    let isScrollingUp = scrollTop < lastScrollTop; // 判斷是否往回滾
    lastScrollTop = scrollTop; // 更新滾動位置

    headers.forEach(obj => {
      const rect = obj.article.getBoundingClientRect();
      if (rect.top >= threshold) {
        if (rect.top < candidateValue) {
          candidate = obj;
          candidateValue = rect.top;
        }
      } else {
        if (!candidate || (candidateValue < threshold && rect.top > candidateValue)) {
          candidate = obj;
          candidateValue = rect.top;
        }
      }
    });

    headers.forEach(obj => {
      const articleRect = obj.article.getBoundingClientRect();
      const headerHeight = obj.header.offsetHeight;
      const switchMargin = 20;

      if (obj === candidate) {
        if (articleRect.top >= threshold) {
          obj.header.style.position = 'relative';
          obj.header.style.top = '';
          obj.header.style.left = '';
          obj.header.style.width = '';
          obj.header.style.boxShadow = 'none';
          obj.header.style.background = "rgb(255, 255, 255)";
        } 
        // **當文章滾出且底部仍遠離其他 header 時，sticky header 固定**
        else if (articleRect.top < threshold && articleRect.bottom > headerHeight + switchMargin) {
          obj.header.style.position = 'fixed';
          obj.header.style.top = '0px';
          obj.header.style.left = Math.round(articleRect.left) + 'px';
          obj.header.style.width = Math.round(articleRect.width) + 'px';
          obj.header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
          obj.header.style.background = "rgba(211, 211, 211, 0.66)";
          obj.header.style.zIndex = "9999";
        } 
        // **當滾動回去時，讓 header 提早顯示**
        else if (isScrollingUp && articleRect.bottom <= headerHeight + bufferZone) {
          obj.header.style.position = "fixed";
          obj.header.style.top = "0px";
          obj.header.style.left = Math.round(articleRect.left) + "px";
          obj.header.style.width = Math.round(articleRect.width) + "px";
          obj.header.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
          obj.header.style.background = "rgba(211, 211, 211, 0.67)";
          obj.header.style.zIndex = "9999";
        }
      } else {
        obj.header.style.position = 'relative';
        obj.header.style.top = '';
        obj.header.style.left = '';
        obj.header.style.width = '';
        obj.header.style.boxShadow = 'none';
        obj.header.style.background = "rgb(255, 255, 255)";
      }
    });
  }

  updateSticky();
});
