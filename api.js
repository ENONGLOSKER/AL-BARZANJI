
document.getElementById('scheduleForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah reload halaman

    // Ambil data dari form
    const nama = document.getElementById('name').value;
    const tanggal = document.getElementById('date').value;
    const alamat = document.getElementById('location').value;

    // Kirim data ke server menggunakan Fetch API
    fetch('https://api-service-jadwal-barzanji.vercel.app/items/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nama: nama,
            tanggal: tanggal,
            alamat: alamat,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Gagal menyimpan data.');
            }
            return response.json();
        })
        .then((data) => {
            alert('Jadwal berhasil disimpan!');
            modal.style.display = 'none'; // Tutup modal
            fetchSchedules(); // Perbarui daftar jadwal
        })
        .catch((error) => {
            console.error(error);
            alert(error.message);
        });
});
