document.addEventListener('DOMContentLoaded', () => {
    // 取得預覽圖層
    const faceLayer = document.getElementById('face-layer');
    const previewEarLeft = document.getElementById('previewEarLeft');
    const previewEarRight = document.getElementById('previewEarRight');
    const previewBrowLeft = document.getElementById('previewBrowLeft');
    const previewBrowRight = document.getElementById('previewBrowRight');
    const previewEyeLeft = document.getElementById('previewEyeLeft');
    const previewEyeRight = document.getElementById('previewEyeRight');

    const sizeSlider = document.getElementById('sizeSlider');
    const spacingSlider = document.getElementById('spacingSlider');
    const heightDecreaseBtn = document.getElementById('height-decrease');
    const heightIncreaseBtn = document.getElementById('height-increase');
    const spacingDecreaseBtn = document.getElementById('spacing-decrease');
    const spacingIncreaseBtn = document.getElementById('spacing-increase');
    const resetButton = document.getElementById('reset-button');

    const defaultBrowTop = 31.5;
    const defaultBrowLeftRight = 52.5;

    const defaultEyeSize = 1.05;
    const defaultEyeSpacing = 0;  // 預設間距設為 0（-20～20 的中間值）

    let eyeSize = defaultEyeSize;
    let eyeSpacing = defaultEyeSpacing;

    // 顯示眉毛
    const savedBrow = localStorage.getItem('selectedBrow');
    if (savedBrow) {
      if (previewBrowLeft) previewBrowLeft.src = savedBrow;
      if (previewBrowRight) previewBrowRight.src = savedBrow;
    }

    // 調整眉毛位置
    const browSettingsRaw = localStorage.getItem('selectedBrowSettings');
    let verticalOffset = 0, spacingOffset = 0;
    if (browSettingsRaw) {
      try {
        const browSettings = JSON.parse(browSettingsRaw);
        verticalOffset = Number(browSettings.verticalOffset) || 0;
        spacingOffset = Number(browSettings.spacingOffset) || 0;
      } catch (err) {
        console.error('解析眉毛設定錯誤', err);
      }
    }
    if (previewBrowLeft) {
      previewBrowLeft.style.top = `${defaultBrowTop + verticalOffset}%`;
      previewBrowLeft.style.right = `${defaultBrowLeftRight + spacingOffset}%`;
    }
    if (previewBrowRight) {
      previewBrowRight.style.top = `${defaultBrowTop + verticalOffset}%`;
      previewBrowRight.style.left = `${defaultBrowLeftRight + spacingOffset}%`;
    }
    const savedFace = localStorage.getItem('selectedFace');
    if (savedFace && faceLayer) {
      faceLayer.src = savedFace;
    }
    // 顯示耳朵
    const savedEar = localStorage.getItem('selectedEar');
    if (savedEar) {
      try {
        const earData = JSON.parse(savedEar);
        previewEarLeft.src = earData.src;
        previewEarRight.src = earData.src;
        previewEarLeft.style.transform = `scale(${earData.scale})`;
        previewEarRight.style.transform = `scale(${earData.scale}) scaleX(-1)`;
        previewEarLeft.style.top = `${earData.height}px`;
        previewEarRight.style.top = `${earData.height}px`;
      } catch (err) {
        console.error('耳朵資料解析錯誤', err);
      }
    }
    const savedEye = localStorage.getItem('selectedEye');
    if (savedEye) {
      if (previewEyeLeft) previewEyeLeft.src = savedEye;
      if (previewEyeRight) previewEyeRight.src = savedEye;
    }
     // 初始化滑桿值
     sizeSlider.value = defaultEyeSize;
     spacingSlider.value = defaultEyeSpacing;
     // 禁止用戶直接操作兩個滑桿，僅使用按鈕控制
     sizeSlider.disabled = true;
     spacingSlider.disabled = true;

    // 更新滑桿背景進度條函式 (共用邏輯)
    const updateSliderBackground = (slider) => {
      const min = Number(slider.min);
      const max = Number(slider.max);
      const val = Number(slider.value);
      const percentage = ((val - min) * 100) / (max - min);
      slider.style.background = `linear-gradient(to right,rgb(0, 0, 0) ${percentage}%, #d3d3d3 ${percentage}%)`;
    };

    // 更新眼睛預覽（左眼原圖，右眼加上鏡射效果）
    const updateEyes = () => {
      if (previewEyeLeft) {
        previewEyeLeft.style.transform = `translateX(${-eyeSpacing}px) scale(${eyeSize}) scaleX(-1)`;
      }
      if (previewEyeRight) {
        previewEyeRight.style.transform = `translateX(${eyeSpacing}px) scale(${eyeSize})`;
      }
    };

    // 更新顯示的滑桿值與背景
    const updateSliders = () => {
      sizeSlider.value = eyeSize;
      spacingSlider.value = eyeSpacing;
      updateSliderBackground(sizeSlider);
      updateSliderBackground(spacingSlider);
    };

    // 調整眼睛大小
    heightDecreaseBtn.addEventListener('click', () => {
      let newValue = parseFloat(sizeSlider.value) - 0.05;
      newValue = Math.max(0.1, newValue);  // 限制最小值
      eyeSize = newValue;
      updateSliders();
      updateEyes();
    });

    heightIncreaseBtn.addEventListener('click', () => {
      let newValue = parseFloat(sizeSlider.value) + 0.05;
      newValue = Math.min(2, newValue);  // 限制最大值
      eyeSize = newValue;
      updateSliders();
      updateEyes();
    });

    // 調整眼睛間距，限制區間設為 -20 ~ 20
    spacingDecreaseBtn.addEventListener('click', () => {
      let newValue = eyeSpacing - 1;
      newValue = Math.max(-20, newValue);
      eyeSpacing = newValue;
      updateSliders();
      updateEyes();
    });

    spacingIncreaseBtn.addEventListener('click', () => {
      let newValue = eyeSpacing + 1;
      newValue = Math.min(20, newValue);
      eyeSpacing = newValue;
      updateSliders();
      updateEyes();
    });

    // 還原按鈕
    if (resetButton) {
      resetButton.addEventListener('click', () => {
        eyeSize = defaultEyeSize;
        eyeSpacing = defaultEyeSpacing;
        updateSliders();
        updateEyes();
      });
    }

    // 下一頁按鈕
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        localStorage.setItem('eyeSize', eyeSize);
        localStorage.setItem('eyeSpacing', eyeSpacing);

        document.body.style.transition = "opacity 0.3s ease-out";
        document.body.style.opacity = 0;
        const nextImg = nextButton.querySelector('.next-image');
        if (nextImg) {
          nextImg.src = 'images/nextgray.png';
        }
        setTimeout(() => {
          window.location.href = 'page9.html';
        }, 300);
      });
    }

    // 初始化一次
    updateSliders();
    updateEyes();
});
