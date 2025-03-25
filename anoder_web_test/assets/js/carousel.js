document.addEventListener("DOMContentLoaded", function() {
  // 圖片與對應說明
  const images = [
    { path: "assets/carousel/pic1.png", caption: "這是專業領域英文\n檢定通過之證明" },
    { path: "assets/carousel/pic2.png", caption: "這是我乙、丙級證照\n通過之證明" },
    { path: "assets/carousel/pic3.png", caption: "這是我尚未去補考\n但術科通過的證照" }
  ];

  let currentIndex = 0;
  const carouselImg = document.getElementById("carouselImg");
  const carouselCaption = document.getElementById("carouselCaption");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".dot"); // 取得所有小圓點

  // 顯示特定索引的圖片、文字、小圓點
  function showImage(index) {
    carouselImg.src = images[index].path;
    carouselCaption.innerText = images[index].caption;

    // 更新小圓點 active 狀態
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // 初始化先顯示第一張
  showImage(currentIndex);

  // 自動輪播計時器（預設每 5 秒換下一張）
  let carouselTimer = setInterval(nextImage, 5000);

  // 每次手動切換圖片後，重置計時
  function resetTimer() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(nextImage, 5000);
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  nextBtn.addEventListener("click", function() {
    nextImage();
    resetTimer();
  });

  prevBtn.addEventListener("click", function() {
    prevImage();
    resetTimer();
  });

  // 如果想要小圓點也能手動點擊切換
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const targetIndex = parseInt(dot.dataset.index);
      currentIndex = targetIndex;
      showImage(currentIndex);
      resetTimer();
    });
  });
});
