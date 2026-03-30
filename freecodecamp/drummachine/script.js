// Lấy tất cả các nút drum-pad và màn hình hiển thị
const drumPads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');

// Hàm xử lý chung khi một pad được kích hoạt (click hoặc phím)
function playPad(pad) {
    // Tìm thẻ audio con bên trong pad đó
    const audio = pad.querySelector('.clip');
    
    // Tua lại từ đầu và phát âm thanh
    audio.currentTime = 0;
    audio.play();
    
    // Cập nhật màn hình #display bằng id của pad (ví dụ: "Heater-1")
    // Thay thế dấu gạch ngang bằng dấu cách cho đẹp mắt
    display.innerText = pad.id.replace(/-/g, ' ');
    
    // Thêm class 'active' để tạo hiệu ứng lún nút
    pad.classList.add('active');
    
    // Gỡ class 'active' sau 100ms để nút nảy lên
    setTimeout(() => {
        pad.classList.remove('active');
    }, 100);
}

// 1. Xử lý sự kiện CLICK chuột
drumPads.forEach(pad => {
    pad.addEventListener('click', function() {
        playPad(this);
    });
});

// 2. Xử lý sự kiện NHẤN PHÍM
document.addEventListener('keydown', function(event) {
    // Lấy ký tự phím được nhấn và in hoa lên (q -> Q)
    const key = event.key.toUpperCase();
    
    // Tìm thẻ audio có id trùng với phím vừa nhấn
    const audio = document.getElementById(key);
    
    // Nếu tìm thấy thẻ audio, tức là người dùng đã bấm đúng các phím Q,W,E...
    if (audio) {
        // Tìm thẻ div .drum-pad chứa thẻ audio đó
        const parentPad = audio.parentElement;
        // Gọi hàm phát âm thanh
        playPad(parentPad);
    }
});