document.addEventListener('DOMContentLoaded', function () {
    // 取得預覽圖層元素
    const faceLayer = document.getElementById('face-layer');
    const previewEarLeft = document.getElementById('previewEarLeft');
    const previewEarRight = document.getElementById('previewEarRight');
    const previewBrowLeft = document.getElementById('previewBrowLeft');
    const previewBrowRight = document.getElementById('previewBrowRight');
    const previewEyeLeft = document.getElementById('previewEyeLeft');
    const previewEyeRight = document.getElementById('previewEyeRight');
    const previewNose = document.getElementById('previewNose');
    const previewMouth = document.getElementById('previewMouth');
  
    const buttons = document.querySelectorAll('.option-button');
    const nextButton = document.getElementById('nextButton');
  
    // 載入先前的五官設定
    const savedFace = localStorage.getItem('selectedFace');
    if (savedFace && faceLayer) faceLayer.src = savedFace;
  
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
  
    const eyeSize = localStorage.getItem('eyeSize') || 1;
    const eyeSpacing = localStorage.getItem('eyeSpacing') || 0;
    if (previewEyeLeft) {
      previewEyeLeft.style.transform = `translateX(${-eyeSpacing}px) scale(${eyeSize})scaleX(-1)`;
    }
    if (previewEyeRight) {
      previewEyeRight.style.transform = `translateX(${eyeSpacing}px) scale(${eyeSize}) `;
    }
  
    const savedNose = localStorage.getItem('selectedNose');
    if (savedNose && previewNose) previewNose.src = savedNose;
  
    // 嘴巴：從 localStorage 載入
    const savedMouth = localStorage.getItem('selectedMouth');
    if (savedMouth && previewMouth) {
      previewMouth.src = savedMouth;
    } else if (previewMouth) {
      previewMouth.src = "images/mouth1.png"; // 預設值
    }
  
    // 嘴巴選項：更新預覽與儲存
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const dataMouth = button.getAttribute('data-mouth');
        if (dataMouth) {
          const mouthSrc = "images/" + dataMouth;
          if (previewMouth) previewMouth.src = mouthSrc;
          localStorage.setItem('selectedMouth', mouthSrc);
  
          // 樣式更新
          buttons.forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
        }
      });
    });
  
    // 下一步跳轉（請自行設定頁面）
    if (nextButton) {
      nextButton.addEventListener('click', function () {
        document.body.style.transition = 'opacity 0.3s ease-out';
        document.body.style.opacity = 0;
        setTimeout(function () {
          window.location.href = 'page11.html'; // 可依需求修改
        }, 300);
      });
    }
  });
  