const allLetters = 'abcdefghijklmnopqrstuvwxyz';

// Tạo chữ cái rơi liên tục
function createFallingLetter() {
    const letter = document.createElement('div');
    letter.className = 'trail-letter';
    letter.textContent = allLetters[Math.floor(Math.random() * allLetters.length)];
    
    // Vị trí ngẫu nhiên theo chiều ngang
    const randomX = Math.random() * window.innerWidth;
    letter.style.left = randomX + 'px';
    letter.style.top = '-50px'; // Bắt đầu từ trên cùng
    
    // Thời gian rơi ngẫu nhiên từ 2-4 giây
    const fallDuration = 2 + Math.random() * 2;
    letter.style.animationDuration = fallDuration + 's';
    
    document.body.appendChild(letter);

    setTimeout(() => {
        letter.remove();
    }, fallDuration * 1000);
}
setInterval(createFallingLetter, 30);