// script.js
const faceLayer        = document.getElementById('face-layer');

const previewEarLeft   = document.getElementById('previewEarLeft');
const previewEarRight  = document.getElementById('previewEarRight');
const previewBrowLeft  = document.getElementById('previewBrowLeft');
const previewBrowRight = document.getElementById('previewBrowRight');
const previewEyeLeft   = document.getElementById('previewEyeLeft');
const previewEyeRight  = document.getElementById('previewEyeRight');
const previewNose      = document.getElementById('previewNose');
const previewMouth     = document.getElementById('previewMouth');
const buttons          = document.querySelectorAll('.option-button');
const nextButton       = document.getElementById('nextButton');

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
  if (previewBrowLeft)  previewBrowLeft.src  = savedBrow;
  if (previewBrowRight) previewBrowRight.src = savedBrow;
}

const browSettingsRaw = localStorage.getItem('selectedBrowSettings');
if (browSettingsRaw) {
  try {
    const browSettings = JSON.parse(browSettingsRaw);
    const verticalOffset  = Number(browSettings.verticalOffset) || 0;
    const spacingOffset   = Number(browSettings.spacingOffset)  || 0;
    if (previewBrowLeft) {
      previewBrowLeft.style.top   = `${31.5 + verticalOffset}%`;
      previewBrowLeft.style.right = `${52.5 + spacingOffset}%`;
    }
    if (previewBrowRight) {
      previewBrowRight.style.top  = `${31.5 + verticalOffset}%`;
      previewBrowRight.style.left = `${52.5 + spacingOffset}%`;
    }
  } catch (err) {
    console.error('解析眉毛設定錯誤', err);
  }
}

const savedEye = localStorage.getItem('selectedEye');
if (savedEye) {
  if (previewEyeLeft)  previewEyeLeft.src  = savedEye;
  if (previewEyeRight) previewEyeRight.src = savedEye;
}

const eyeSize    = localStorage.getItem('eyeSize')    || 1;
const eyeSpacing = localStorage.getItem('eyeSpacing') || 0;
if (previewEyeLeft) {
  previewEyeLeft.style.transform = `translateX(${-eyeSpacing}px) scale(${eyeSize}) scaleX(-1)`;
}
if (previewEyeRight) {
  previewEyeRight.style.transform = `translateX(${ eyeSpacing}px) scale(${eyeSize})`;
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
// 1. 定義臉型 → 標語對照
const sloganMap = {
  '菱形臉': '策略舞者',
  '圓臉':   '和悅司令',
  '甲字臉': '鋼鐵守護',
  '由字臉': '穩健築基',
  '方臉':   '果敢先鋒',
  '長方臉': '遠略先知',
  '申字臉': '衝動謀士',
  '鵝蛋臉': '柔情煉金'
};
const faceTypeDescMap = {
  '菱形臉': '運籌帷幄，決勝千里',
  '圓臉':   '笑迎四方，聚福納吉',
  '甲字臉': '剛毅護眾，無懼難關',
  '由字臉': '沉著如山，厚德載物',
  '方臉':   '雷厲風行，一往無前',
  '長方臉': '目光如炬，未雨綢繆',
  '申字臉': '熱血縱橫，化危為機',
  '鵝蛋臉': '細膩溫潤，化難為易'
};

document.addEventListener('DOMContentLoaded', () => {
  // 讀 localStorage 裡的臉型名稱
  const faceType = localStorage.getItem('selectedFaceType');
  
  // 找對應標語和描述
  const slogan = sloganMap[faceType] || '無標語';
  const desc   = faceTypeDescMap[faceType] || '無描述';
  
  // 顯示在 .slogan 裡
  const sloganEl = document.querySelector('.slogan');
  if (sloganEl) sloganEl.textContent = slogan;
  
  // 顯示在 #face-description 裡
  const faceDescEl = document.getElementById('face-description');
  if (faceDescEl) faceDescEl.textContent = desc;
});

//2.耳型
const stored = JSON.parse(localStorage.getItem('selectedEar'));
const index = parseInt(localStorage.getItem('selectedEarIndex'), 10);
const { scale, height, src } = stored;

// １. 耳型對應（易經面相推論）
const earTypeMap = {
  1: '思想型耳：深沉理性，沉穩如山，心思縝密，善於謀劃',
  2: '實踐型耳：穩健踏實，勤勞持重，以行動累積功業',
  3: '招風耳：直率外向，如風散逸，善於交際，人緣亨通'
};

// ２. 耳朵大小判斷
//    預設 scale = 1.0
let sizeText = '';
if (scale > 1) {
  sizeText = '大耳：擁有大志豪情，心胸寬廣，福祿豐厚';
} else if (scale < 1) {
  sizeText = '小耳：謹慎細膩，內斂守成，隱忍踏實';
} else {
  sizeText = '中和耳：平和敦厚，吉祥中庸';
}

// ３. 耳位高低判斷
//    預設 height = 10
let heightText = '';
if (height > 10) {
  heightText = '高位耳：頭腦靈活，目光遠大，求知慾強';
} else if (height < 10) {
  heightText = '低位耳：根基穩固，安分守己，實事求是';
} else {
  heightText = '中位耳：不偏不倚，平衡穩健';
}

// 組合最終描述
const description = [
  earTypeMap[index] || '',
  sizeText,
  heightText
].join('，');

// 將文字插入頁面
document.getElementById('ear-description').textContent = description;

document.addEventListener('DOMContentLoaded', () => {
  const ids = ['opt1', 'opt2', 'opt3'];

  ids.forEach(id => {
    const key = 'count_' + id;
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, '0');
    }
  });

  function renderAllProgress() {
    const counts = ids.map(id => parseInt(localStorage.getItem('count_' + id), 10));
    const total  = counts.reduce((a, b) => a + b, 0) || 1;
  
    ids.forEach((id, idx) => {
      const pct = Math.round(counts[idx] / total * 100);
      const btn = document.getElementById(id); // 👈 這行之前漏了
      const bar = document.createElement('div');
      bar.className = 'progress-bar';
      bar.innerHTML = `<div class="fill">${pct}%</div>`;
  
      // 隱藏按鈕但保留空間
      btn.style.display = 'none';
  
      // 插入進度條在按鈕前
      btn.parentNode.insertBefore(bar, btn);
  
      requestAnimationFrame(() => {
        bar.querySelector('.fill').style.width = pct + '%';
      });
    });
  }
  
  ids.forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
      const key = 'count_' + id;
      let c = parseInt(localStorage.getItem(key), 10) + 1;
      localStorage.setItem(key, c.toString());
      renderAllProgress();
    });
  });
});


// 先從 localStorage 取出並解析，若沒東西就給預設
const {
  browIndex = 1,        // 若沒存過就預設用 1
  verticalOffset = 0,   // 預設 0
  spacingOffset = 0     // 預設 0
} = JSON.parse(localStorage.getItem('selectedBrowData')) || {};
  
// １. 眉型對應（易經面相推論）
const browTypeMap = {
  1: '眉峰俐落精緻，心思細膩、觀察入微，行事果斷不拖泥帶水；常以巧思化繁為簡，適合策劃與溝通角色。',
  2: '眉骨分明，個性剛毅、意志堅定；不畏艱難，勇於挑戰，自帶領袖氣質，善於做出關鍵決策。',
  3: '眉形粗獷，膽識過人、氣勢凌人；凡事敢衝敢拼，常能憑一腔熱血帶動團隊，遇危難時穩如磐石。',
  4: '眉線柔和而彎，溫柔圓滑、善察言觀色；擅長傾聽與情感交流，人際關係融洽，適合協調、調解工作。',
  5: '弧度均衡，隨和親切、人緣極佳；待人誠懇自然，讓人如沐春風，社交場合中充滿好感與信任。',
  6: '眉形豪放，直爽豪邁、重情重義；說到做到、禮義分明，朋友眾多，常為人解圍出力。',
  7: '眉形筆直，心性穩定、做事有條理；思路清晰、紀律嚴謹，適合專業技術或管理崗位，行事井然有序。',
  8: '眉勢厚實，固執衝動、自我意識強；主見鮮明、勇於表達，不容易妥協，但需留意情緒管理。',
  9: '眉尾下垂，心軟憐憫、易受情感左右；富同理心，對弱勢與弱者多有憐惜，但須防止過度敏感導致不必要的煩憂。'
};

// 眉型描述
const browTypeText = browTypeMap[browIndex] || '';

// 垂直位置判斷（6–8 字＋面相學看法）
let verticalText = '';
if (verticalOffset > 0) {
  // 眉毛偏高，顯示人心胸寬廣、樂觀進取
  verticalText = '看得開，包容萬象，';
} else if (verticalOffset < 0) {
  // 眉毛偏低，反映人易糾結、心結難解
  verticalText = '看不開，心結難解，';
} else {
  // 眉毛居中，性情平和，做事踏實
  verticalText = '平和穩，安定踏實，';
}

// 間距判斷（6–8 字＋面相學看法）
let spacingText = '';
if (spacingOffset > 0) {
  // 眉間距寬，重視情義，親情深厚
  spacingText = '重親情，情深義重。';
} else if (spacingOffset < 0) {
  // 眉間距窄，自我獨立，冷暖自知
  spacingText = '淡親情，冷暖自知。';
} else {
  // 眉間適中，親情和諧、人際融洽
  spacingText = '親情和，溫暖融洽。';
}
// **把眉型文字也加到陣列裡**
const browDescription = [
  browTypeText,
  verticalText,
  spacingText
].filter(Boolean).join('');

// 插入到頁面
document.getElementById('brow-description').textContent = browDescription;
function getEyeData() {
  return JSON.parse(localStorage.getItem('selectedEyeData')) || {
    eyeIndex: 1,
    sizeOffset: 0,
    spacingOffset: 0
  };
}
// 動態取 localStorage 眼睛資料
function getEyeData() {
  return JSON.parse(localStorage.getItem('selectedEyeData')) || {
    eyeIndex: 1,
    sizeOffset: 0,
    spacingOffset: 0
  };
}
// 儲存眼睛設定
function saveEyeData() {
  const prev = JSON.parse(localStorage.getItem('selectedEyeData')) || { eyeIndex: 1 };
  localStorage.setItem('selectedEyeData', JSON.stringify({
    eyeIndex: prev.eyeIndex,
    sizeOffset: sizeSlider.valueAsNumber,
    spacingOffset: spacingSlider.valueAsNumber
  }));
}
function getEyeDescription(size, spacing) {
  let sizeText = '';
  if (size > 1)   sizeText = '感情細膩敏銳，易受外界牽動';
  else if (size < 1) sizeText = '內斂審慎多慮，觀察入微';
  else            sizeText = '性情平和穩重，思路清明';

  let spacingText = '';
  if (spacing > 0) spacingText = '，主見稍弱易受人擺布。';
  else if (spacing < 0) spacingText = '，心眼極重凡事難輕信他人。';
  else spacingText = '，進退有度處世安穩。';

  return sizeText + spacingText;
}
// 6. 頁面載入時還原＆組描述
document.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('selectedEyeData') || '{}');
  const { eyeIndex, eyeSize, eyeSpacing } = saved;
  if (!eyeIndex) return;

  // 還原圖
  const eyeSrc = document.querySelector(`.option-button[data-eye]:nth-child(${eyeIndex})`)
                     .getAttribute('data-eye');
  if (previewEyeLeft)  previewEyeLeft.src  = `images/${eyeSrc}`;
  if (previewEyeRight) previewEyeRight.src = `images/${eyeSrc}`;

  // 還原 transform
  updateSliders();  // 你的函式
  updateEyes();

  // 組合文字
  const typeText   = eyeTypeMap[eyeIndex]       || '';
  const sizeText   = getEyeSizeText(eyeSize)    || '';
  const spaceText  = getEyeSpacingText(eyeSpacing) || '';

  const eyeDesc = [ typeText, sizeText, spaceText ].join('，');
  document.getElementById('eye-description').textContent = eyeDesc;
});
// 動態取 localStorage 鼻子資料
function getNoseData() {
  return JSON.parse(localStorage.getItem('selectedNoseData')) || { noseIndex: 1 };
}
// 儲存鼻子設定
function saveNoseData(index) {
  localStorage.setItem('selectedNoseData', JSON.stringify({ noseIndex: index }));
}
// 動態取 localStorage 嘴巴資料
function getMouthData() {
  return JSON.parse(localStorage.getItem('selectedMouthData')) || { mouthIndex: 1 };
}
// 儲存嘴巴設定
function saveMouthData(index) {
  localStorage.setItem('selectedMouthData', JSON.stringify({ mouthIndex: index }));
}

// 地圖對應描述
const eyeTypeMap = {
  1: '丹鳳眼，目光銳利如刀，氣質高貴端莊；善於洞察人心，常能在複雜局勢中找到關鍵所在。',
  2: '杏眼，眉間柔和流暢，溫潤柔和、親切可人；為人和善，善解人意，是團隊中的安定之源。',
  3: '荔枝眼，雙眸靈動富於表情，想像力豐富；藝術氣質濃厚，能從細節中捕捉美好。',
  4: '細長眼，眼神深邃沉穩，冷靜理性；具備出色洞察力與分析能力，適合策略規劃角色。',
  5: '上斜眼，豪氣沖天、激情澎湃；不服輸的個性驅使你勇往直前，領導力與魅力並存。',
  6: '下垂眼，眼神柔和含蓄，富於同理心；適合輔助與關懷他人，能在情感連結中表現出色。'
};

const noseTypeMap = {
  1: '蒜頭鼻，鼻翼厚實飽滿，象徵福祿雙全；做事扎實可靠，易獲得長輩與貴人相助。',
  2: '鷹鉤鼻，鼻梁挺直分明，代表堅定意志；具備遠見卓識，常能在關鍵時刻做出正確判斷。',
  3: '直鼻，鼻樑端正秀氣，氣質儒雅；心思細膩，有邏輯性，擅長專業研究與深度思考。',
  4: '塌鼻，鼻樑平直柔和，性格溫厚；待人寬容，是團隊中的穩定力量。'
};
const mouthTypeMap = {
  1: '薄唇，上下均勻，行事中庸；善於協調各方，擁有良好的口才與溝通能力。',
  2: '厚唇，唇形飽滿圓潤；情感豐富且深沉，對朋友與家人義氣深重。',
  3: '上厚下薄，表面熱情奔放，內心冷靜克制；善於平衡情感與理智，魅力十足。',
  4: '上薄下厚，唇形柔和下垂；溫柔體貼，善解人意，是他人傾訴的對象。',
  5: '嘴角上揚，笑意常駐；樂觀開朗，能為周遭帶來歡樂與正能量。'
};

function getEyeDescription(size, spacing) {
  const { eyeIndex } = getEyeData();
  const eyeTypeText = eyeTypeMap[eyeIndex] || '未知眼型';

  let sizeText = '';
  if (size > 1)       sizeText = '感情細膩敏銳，易受外界牽動';
  else if (size < 1)  sizeText = '內斂審慎多慮，觀察入微';
  else                sizeText = '性情平和穩重，思路清明';

  let spacingText = '';
  if (spacing > 0)      spacingText = '，主見稍弱易受人擺布。';
  else if (spacing < 0) spacingText = '，心眼極重凡事難輕信他人。';
  else                  spacingText = '，進退有度處世安穩。';

  return eyeTypeText  + sizeText + spacingText;
}

function getNoseDescription() {
  const { noseIndex } = getNoseData();
  return noseTypeMap[noseIndex] || '';
}
function getMouthDescription() {
  const { mouthIndex } = getMouthData();
  return mouthTypeMap[mouthIndex] || '';
}

// 插入描述至頁面
window.addEventListener('DOMContentLoaded', ()=>{
  const eyeDescEl   = document.getElementById('eye-description');
  const noseDescEl  = document.getElementById('nose-description');
  const mouthDescEl = document.getElementById('mouth-description');

  if(eyeDescEl)   eyeDescEl.textContent   = getEyeDescription();
  if(noseDescEl)  noseDescEl.textContent  = getNoseDescription();
  if(mouthDescEl) mouthDescEl.textContent = getMouthDescription();
});
