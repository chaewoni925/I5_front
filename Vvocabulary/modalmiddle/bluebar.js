document.addEventListener('DOMContentLoaded', function() {
  // 정렬 버튼 활성화
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.onclick = function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });

  // 플래시카드 모달 제어
  const flashcardModal = document.getElementById('flashcardModal');
  const flashcardBtn = document.querySelector('.add-folder-btn');

  // 단어/의미 관련 핸들
  let currentIndex = 0;
  let isMeaningShown = false;
  let words = [];

  // DOM 요소
  const prevBtn = document.getElementById('cardPrevBtn');
  const nextBtn = document.getElementById('cardNextBtn');
  const showMeaningBtn = document.getElementById('showMeaningBtn');
  const flashcardWord = document.querySelector('.flashcard-word');
  const flashcardHalf = document.querySelector('.flashcard-half');
  
  // 상세뜻 표시 영역 준비 (.flashcard-detail)
  let flashcardDetail = document.querySelector('.flashcard-detail');
  if (!flashcardDetail) {
    flashcardDetail = document.createElement('div');
    flashcardDetail.className = 'flashcard-detail';
    flashcardDetail.style.display = "none";
    flashcardWord.after(flashcardDetail);
  }

  // 플래시카드 보기 버튼 클릭 시 모달 오픈
  if (flashcardBtn) {
    flashcardBtn.onclick = function() {
      // .word-grid에서 카드 데이터 읽어오기
      const cardNodes = document.querySelectorAll('.word-card');
      words = Array.from(cardNodes).map(card => {
        return {
          word: card.querySelector('.word-header')?.childNodes[0]?.textContent.trim() || "",
          meaning: card.querySelector('.word-detail')?.childNodes[0]?.textContent.trim() || "",
          detail: card.querySelector('.word-detail')?.innerHTML.split("<br>")[1]?.trim() || ""
        }
      });
      currentIndex = 0;
      isMeaningShown = false;
      renderFlashcard();
      flashcardModal.style.display = "flex";
    };
  }

  // 모달 바깥 클릭 시 닫기
  flashcardModal.addEventListener('mousedown', function(e) {
    if (e.target === flashcardModal) {
      flashcardModal.style.display = "none";
    }
  });

  function renderFlashcard() {
    if (words.length === 0) {
      flashcardWord.textContent = "단어 없음";
      flashcardHalf.style.display = "";
      flashcardDetail.style.display = "none";
      showMeaningBtn.disabled = true;
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }
    showMeaningBtn.disabled = false;

    if (!isMeaningShown) {
      flashcardHalf.style.display = "";
      flashcardWord.textContent = words[currentIndex].word;
      showMeaningBtn.textContent = "의미보기 | SPACE";
      flashcardDetail.style.display = "none";
    } else {
      flashcardHalf.style.display = "none";
      // 단어, 줄, 상세뜻(중앙, 큼) 구조로 구성
      flashcardWord.textContent = words[currentIndex].word;
      flashcardDetail.innerHTML =
        `<hr class="card-divider">
         <div class="meaning-content">${words[currentIndex].meaning}</div>`;
      flashcardDetail.style.display = "";
      showMeaningBtn.textContent = "단어보기 | SPACE";
    }
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === words.length - 1);
  }

  if (showMeaningBtn) {
    showMeaningBtn.onclick = function() {
      if(words.length === 0) return;
      isMeaningShown = !isMeaningShown;
      renderFlashcard();
    };

    // SPACE 키로 의미보기 토글
    window.addEventListener('keydown', function(e) {
      if (flashcardModal.style.display === "flex" && (e.code === "Space" || e.key === " ")) {
        e.preventDefault();
        showMeaningBtn.click();
      }
    });
  }

  if (prevBtn) {
    prevBtn.onclick = function() {
      if (currentIndex > 0) {
        currentIndex--;
        isMeaningShown = false;
        renderFlashcard();
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = function() {
      if (currentIndex < words.length - 1) {
        currentIndex++;
        isMeaningShown = false;
        renderFlashcard();
      }
    };
  }
});