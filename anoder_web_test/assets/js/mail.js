document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", function(event) {
      const errorMessage = document.getElementById("error-message");
      errorMessage.style.display = "none";
      
      let hasError = false;
      
      // 取得各欄位參考（全部皆為 textarea）
      const nameField = document.getElementById("name");
      const emailField = document.getElementById("email");
      const messageField = document.getElementById("message");
      
      // 移除舊有錯誤提示
      nameField.classList.remove("error");
      emailField.classList.remove("error");
      messageField.classList.remove("error");
      
      // 檢查欄位是否為空白（trim() 會移除前後空白）
      if (nameField.value.trim() === "") {
        nameField.classList.add("error");
        hasError = true;
      }
      if (emailField.value.trim() === "") {
        emailField.classList.add("error");
        hasError = true;
      }
      if (messageField.value.trim() === "") {
        messageField.classList.add("error");
        hasError = true;
      }
      
      // 若有錯誤，阻止表單送出、顯示錯誤訊息並跳出警告視窗
      if (hasError) {
        event.preventDefault();
        errorMessage.style.display = "block";
        window.alert("請填寫所有必填欄位！");
      }
    });
  });
  