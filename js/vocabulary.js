
document.addEventListener("DOMContentLoaded", () => {

    // 정렬 버튼들
    const sortButtons = document.querySelectorAll(".sort-btn");

    sortButtons.forEach(button => {
        button.addEventListener("click", () => {
            // (1) 버튼에서 'active' 클래스 제거
            sortButtons.forEach(btn => btn.classList.remove("active"));
            
            // (2) 지금 클릭한 버튼에만 'active' 클래스 추가
            button.classList.add("active");
            
        });
    });


    // '플래시 카드로 보기' 버튼
    const flashcardButton = document.querySelector(".view-toggle-btn");

    if (flashcardButton) {
        flashcardButton.addEventListener("click", () => {
            
        });
    }

});