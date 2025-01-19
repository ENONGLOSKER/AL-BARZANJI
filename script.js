// funsi modal
function showModal() {
    document.getElementById("myModal").style.display = "block";
}

function hideModal() {
    document.getElementById("myModal").style.display = "none";
}

// Fungsi untuk menampilkan tombol scroll
var scrolling = false;
function toggleScroll() {
    const scrollIcon = document.getElementById('scroll-icon');
    if (scrolling) {
        window.clearInterval(scrolling);
        scrolling = false;
        scrollIcon.src = "img/icon-play.png"; // Ganti ikon ke play
    } else {
        scrolling = window.setInterval(function () {
            window.scrollBy(0, 1); // Ubah ke 1 untuk scrolling lebih halus
        }, 140); // Ubah ke 50ms untuk memperlambat scrolling
        scrollIcon.src = "img/icon-pause.png"; // Ganti ikon ke paus
    }
}


// Fungsi untuk mengubah ukuran huruf
function changeFontSize(increment) {
    const menuItems = document.querySelectorAll('.menu-item p');
    menuItems.forEach(item => {
        const currentSize = window.getComputedStyle(item, null).getPropertyValue('font-size');
        const newSize = parseFloat(currentSize) + increment; // Tambah atau kurangi ukuran
        item.style.fontSize = newSize + 'px'; // Set ukuran baru
    });
}

// Event listener untuk tombol min
document.getElementById('min').addEventListener('click', function () {
    changeFontSize(-1); // Kecilkan ukuran huruf 1px
});

// Event listener untuk tombol plus
document.getElementById('plus').addEventListener('click', function () {
    changeFontSize(1); // Tambah ukuran huruf 1px
});