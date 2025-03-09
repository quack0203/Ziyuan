document.addEventListener("DOMContentLoaded", function () {
    let idleTimer;
    const flipCircle = document.getElementById("flip-circle");

    function startIdleTimer() {
        idleTimer = setTimeout(() => {
            flipCircle.classList.add("flipped"); // 執行翻轉
            setTimeout(() => {
                flipCircle.classList.remove("flipped"); // 翻回來
            }, 2000);
        }, 3000); // 閒置 3 秒翻轉
    }

    function resetTimer() {
        clearTimeout(idleTimer);
        startIdleTimer();
    }

    // 監聽使用者互動，重置計時器
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keydown", resetTimer);
    document.addEventListener("scroll", resetTimer);

    // 初始化計時器
    startIdleTimer();
});
