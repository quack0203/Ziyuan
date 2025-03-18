document.addEventListener('DOMContentLoaded', function () {
  const articles = document.querySelectorAll('article.post.featured');
  if (!articles.length) return;
  
  // 這個門檻決定了當文章頂部超過多少距離（例如 -20px）時，
  // 就視為該文章已經接近進入視窗，可以切換成 candidate。
  const threshold = -20;  
  
  // 收集每篇文章中的 header (h2 a)，並確保文章容器為 relative（方便後續 absolute 定位）
  const headers = [];
  articles.forEach(article => {
    const h2Link = article.querySelector('h2 a');
    if (h2Link) {
      h2Link.style.transition = "box-shadow 0.3s ease, background 0.3s ease";
      headers.push({ article: article, header: h2Link });
      article.style.position = 'relative';
    }
  });
  
  // 用 requestAnimationFrame 節流 scroll 事件
  window.addEventListener('scroll', onScroll);
  function onScroll() {
    window.requestAnimationFrame(updateSticky);
  }
  
  function updateSticky() {
    let candidate = null;
    let candidateValue = Infinity; // 存放候選文章的 rect.top 值
    
    // 遍歷每篇文章，根據 getBoundingClientRect().top 判斷哪一篇是候選者
    headers.forEach(obj => {
      const rect = obj.article.getBoundingClientRect();
      // 如果文章已經進入 viewport（或至少達到門檻 threshold）
      if (rect.top >= threshold) {
        if (rect.top < candidateValue) {
          candidate = obj;
          candidateValue = rect.top;
        }
      } else {
        // 若所有文章都還在負值區，選取離 0 最近者
        if (!candidate || (candidateValue < threshold && rect.top > candidateValue)) {
          candidate = obj;
          candidateValue = rect.top;
        }
      }
    });
    
    // 根據 candidate 更新各 header 的定位
    headers.forEach(obj => {
      const articleRect = obj.article.getBoundingClientRect();
      const headerHeight = obj.header.offsetHeight;
      const switchMargin = 20; // 當文章底部距離 header 小於 headerHeight + switchMargin 時，轉換為 absolute
      
      if (obj === candidate) {
        // 如果候選文章的 top 大於 threshold（例如 >= -20），代表它還在進入狀態，顯示原始 relative 位置
        if (articleRect.top >= threshold) {
          obj.header.style.position = 'relative';
          obj.header.style.top = '';
          obj.header.style.left = '';
          obj.header.style.width = '';
          obj.header.style.boxShadow = 'none';
          obj.header.style.background = '';
        } 
        // 當文章已滾出且底部尚未接近 header 時，使用 fixed 定位固定在 viewport 頂部
        else if (articleRect.top < threshold && articleRect.bottom > headerHeight + switchMargin) {
          obj.header.style.position = 'fixed';
          obj.header.style.top = '0px';
          obj.header.style.left = Math.round(articleRect.left) + 'px';
          obj.header.style.width = Math.round(articleRect.width) + 'px';
          
          obj.header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
          obj.header.style.background = '#fff';
        } 
        // 當文章底部接近 header（避免與下一篇文章重疊）時，使用 absolute 定位固定在文章底部
        else if (articleRect.bottom <= headerHeight + switchMargin) {
          // 獲取 footer 的位置
          const footer = document.querySelector("#footer");
          const footerRect = footer.getBoundingClientRect();
      
          // 如果 footer 已經進入視窗（例如 top <= 50），則隱藏 header
          if (footerRect.top <= 50) {
              obj.header.style.display = "none";
          } else {
              obj.header.style.display = "block";
              obj.header.style.position = "fixed";
              obj.header.style.top = "0px";
              obj.header.style.left = Math.round(articleRect.left) + "px";
              obj.header.style.width = Math.round(articleRect.width) + "px";
              obj.header.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
              obj.header.style.background = "#fff";
              obj.header.style.zIndex = "9999";  // 保持最上層
          }
      }
      
      
      } else {
        // 非 candidate 的 header 恢復 relative 定位
        obj.header.style.position = 'relative';
        obj.header.style.top = '';
        obj.header.style.left = '';
        obj.header.style.width = '';
        obj.header.style.boxShadow = 'none';
        obj.header.style.background = '';
      }
    });
  }
  
  // 初始執行一次
  updateSticky();
});
