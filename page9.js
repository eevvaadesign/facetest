document.addEventListener('DOMContentLoaded', function () {
    // 取得預覽各圖層元素
    const faceLayer = document.getElementById('face-layer');
    const previewEarLeft = document.getElementById('previewEarLeft');
    const previewEarRight = document.getElementById('previewEarRight');
    const previewBrowLeft = document.getElementById('previewBrowLeft');
    const previewBrowRight = document.getElementById('previewBrowRight');
    const previewEyeLeft = document.getElementById('previewEyeLeft');
    const previewEyeRight = document.getElementById('previewEyeRight');
    const previewNose = document.getElementById('previewNose');
  
    const buttons = document.querySelectorAll('.option-button');
    const nextButton = document.getElementById('nextButton');
  
    // 載入先前在 page8 存入 localStorage 的各部件 (臉、耳、眉、眼)
    const savedFace = localStorage.getItem('selectedFace');
    if (savedFace && faceLayer) {
      faceLayer.src = savedFace;
    }
    const savedEar = localStorage.getItem('selectedEar');
    if (savedEar) {
      try {
        const earData = JSON.parse(savedEar);
        if (previewEarLeft) {
          previewEarLeft.src = earData.src;
          previewEarLeft.style.transform = `scale(${earData.scale})`;
          previewEarLeft.style.top = `${earData.height}px`;
        }
        if (previewEarRight) {
          previewEarRight.src = earData.src;
          previewEarRight.style.transform = `scale(${earData.scale}) scaleX(-1)`;
          previewEarRight.style.top = `${earData.height}px`;
        }
      } catch (err) {
        console.error('解析耳朵資料錯誤', err);
      }
    }
    const savedBrow = localStorage.getItem('selectedBrow');
    if (savedBrow) {
      if (previewBrowLeft) previewBrowLeft.src = savedBrow;
      if (previewBrowRight) previewBrowRight.src = savedBrow;
    }
    const browSettingsRaw = localStorage.getItem('selectedBrowSettings');
    if (browSettingsRaw) {
      try {
        const browSettings = JSON.parse(browSettingsRaw);
        const verticalOffset = Number(browSettings.verticalOffset) || 0;
        const spacingOffset = Number(browSettings.spacingOffset) || 0;
        if (previewBrowLeft) {
          previewBrowLeft.style.top = `${31.5 + verticalOffset}%`;
          previewBrowLeft.style.right = `${52.5 + spacingOffset}%`;
        }
        if (previewBrowRight) {
          previewBrowRight.style.top = `${31.5 + verticalOffset}%`;
          previewBrowRight.style.left = `${52.5 + spacingOffset}%`;
        }
      } catch (err) {
        console.error('解析眉毛設定錯誤', err);
      }
    }
    const savedEye = localStorage.getItem('selectedEye');
    if (savedEye) {
      if (previewEyeLeft) previewEyeLeft.src = savedEye;
      if (previewEyeRight) previewEyeRight.src = savedEye;
    }
    // 若有眼睛大小與間距設定 (從 page8)
    const eyeSize = localStorage.getItem('eyeSize') || 1;
    const eyeSpacing = localStorage.getItem('eyeSpacing') || 0;
    if (previewEyeLeft) {
      previewEyeLeft.style.transform = `translateX(${-eyeSpacing}px) scale(${eyeSize})scaleX(-1)`;
    }
    if (previewEyeRight) {
      previewEyeRight.style.transform = `translateX(${eyeSpacing}px) scale(${eyeSize}) `;
    }
  
    // 設定鼻子預設值：若 localStorage 中有選取，則使用；否則預設為 "images/nose (1).png"
    const savedNose = localStorage.getItem('selectedNose');
    if (savedNose && previewNose) {
      previewNose.src = savedNose;
    } else if (previewNose) {
      previewNose.src = "images/nose (1).png";
    }
  
    // 鼻子選項：點選按鈕後更新預覽並存入 localStorage (注意：鼻子圖層不需左右鏡射)
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const dataNose = button.getAttribute('data-nose');
        if (dataNose) {
          const noseSrc = "images/" + dataNose;
          if (previewNose) previewNose.src = noseSrc;
          localStorage.setItem('selectedNose', noseSrc);
  
          // 更新選取樣式
          buttons.forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
        }
      });
    });
  
    // 下一步按鈕：跳轉到下一頁 (可依實際流程修改跳轉目標)
    if (nextButton) {
      nextButton.addEventListener('click', function () {
        document.body.style.transition = 'opacity 0.3s ease-out';
        document.body.style.opacity = 0;
        setTimeout(function () {
          window.location.href = 'page10.html';
        }, 300);
      });
    }
  });
  