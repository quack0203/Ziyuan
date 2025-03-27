document.addEventListener('DOMContentLoaded', function(){
    const progressBarsContainer = document.querySelector('.progress-bars');
    const progressTextEl = document.getElementById('progressDesc'); // 取得 <p> 元素
    const prevBtn = document.getElementById('progressPrev');
    const nextBtn = document.getElementById('progressNext');
    
    // 定義多組進度數據，每組的進度條數量可不一樣
    const progressSets = [
      [70, 70],       // 第一組：3 條進度條
      [55, 50, 50, 30],           // 第二組：2 條進度條
      [30,30,20]     // 第三組：4 條進度條
    ];
    
    // 定義對應的描述文字，每組描述可以用 <br> 換行或其他 HTML 標籤
    const progressDescriptions = [
      "因為實習，我會經常碰觸到這兩種程式語言<br/>所以我對這方面的熟知度是有一定的程度<br/>(但我分數不敢打太高就是了👉👈🥺)",
      "在公司裡我有接手一個前人的網站<br/>有關於自動化派工<br/>因為後續要長久維護及更新<br/>所以我在這部分也學會了一些技能",
      "最後，因為我會利用一些Bat檔<br/>來輔助我有關於自動化派工<br/>所以也有大概知了這方面的語言"
    ];

    const progressLabels = [
        ['Python', 'ScriptEnv(Py + HFSS)'],
        ['HTML', 'JavaScript', 'CSS', 'MSSQL'],
        ['BatchScript(腳本語言)','requests(Py)','BeautifulSoup(Py)']
      ];
      
    
    let currentSet = 0;
    let timer;
    
    // 更新進度條與說明文字，先清空進度條容器，再根據陣列生成進度條 DOM
    function updateProgressBars(setIndex) {
      const percentages = progressSets[setIndex];
      progressBarsContainer.innerHTML = ''; // 清空現有進度條
      
      percentages.forEach((percent, index) => {
        // 建立進度項目
        const progressItem = document.createElement('div');
        progressItem.className = 'progress-item';
        
        // 建立左側說明文字（例如 "任務1："）
        const descSpan = document.createElement('span');
        descSpan.className = 'progress-desc';
        descSpan.textContent = progressLabels[setIndex][index] + '：';
        
        // 建立進度條容器
        const barContainer = document.createElement('div');
        barContainer.className = 'progress-bar-container';
        
        // 建立進度條（初始寬度設為 0%，以便後續觸發 transition）
        const barDiv = document.createElement('div');
        barDiv.className = 'progress-bar';
        barDiv.style.width = '0%';
        
        // 建立進度條內的百分比文字
        const labelSpan = document.createElement('span');
        labelSpan.className = 'progress-label';
        labelSpan.textContent = percent + '%';
        
        // 組合結構
        barDiv.appendChild(labelSpan);
        barContainer.appendChild(barDiv);
        progressItem.appendChild(descSpan);
        progressItem.appendChild(barContainer);
        progressBarsContainer.appendChild(progressItem);
        
        // 延遲 50 毫秒後更新寬度觸發 transition
        setTimeout(function(){
          barDiv.style.width = percent + '%';
        }, 50);
      });
      
      // 更新 <p> 內的說明文字（innerHTML 支持 HTML 標籤）
      if(progressTextEl && progressDescriptions[setIndex]) {
        progressTextEl.innerHTML = progressDescriptions[setIndex];
      }
    }
    
    // 重置自動切換計時器，每 5 秒自動切換進度組
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function(){
        currentSet = (currentSet + 1) % progressSets.length;
        updateProgressBars(currentSet);
      }, 10000);
    }
    
    // 綁定按鈕點擊事件
    prevBtn.addEventListener('click', function(){
      currentSet = (currentSet - 1 + progressSets.length) % progressSets.length;
      updateProgressBars(currentSet);
      resetTimer();
    });
    
    nextBtn.addEventListener('click', function(){
      currentSet = (currentSet + 1) % progressSets.length;
      updateProgressBars(currentSet);
      resetTimer();
    });
    
    // 初始化顯示第一組進度條與描述
    updateProgressBars(currentSet);
    resetTimer();
  });
  