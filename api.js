
document.getElementById('scheduleForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Mencegah reload halaman

    // Ambil data dari form
    const nama = document.getElementById('name').value;
    const tanggal = document.getElementById('date').value;
    const alamat = document.getElementById('location').value;

    // Kirim data ke server menggunakan Fetch API
    // https://api-service-jadwal-barzanji.vercel.app/items/
    // http://barzanji.unaux.com/api.php/
    // http://localhost/api/api.php
    fetch('http://elqdev.mooo.com/api/api.php/', {
        method: 'POST',
        headers: {

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

function fetchSchedules() {
    fetch('http://elqdev.mooo.com/api/api.php/')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Gagal memuat data.');
            }
            return response.json();
        })
        .then((schedules) => {
            const items = document.getElementById('items');
            items.innerHTML = ''; // Hapus konten sebelumnya

            schedules.forEach((schedule) => {
                items.innerHTML += `
                    <div class="menu-item">
                        <div class="bagian2" id="bagian2" style="display: flex; justify-content: center; flex-direction: column; align-items: center; gap: 12px; width: 100%; padding: 5PX;">
                            <div style="display: flex; justify-content: start; align-items: center; gap: 12px; width: 100%;">
                                <div class="loc" style="background-color: #61E89C; padding: 3px; border-radius: 8px; box-shadow: 2px 2px 12px #61E89C;">
                                    <img src="img/logobz.png" alt="" style="width: 40px; transform: translateY(2px);">
                                </div>
                                <div class="" style="display: flex; flex-direction: column; justify-content: center; align-items: start;">
                                    <span style="margin-bottom: -14px; margin-top: 22px; font-size: 14px; color: #0A8362;">
                                        Nama Anggota
                                    </span>
                                    <h4 style="font-size: 15px;">${schedule.nama}</h4>
                                </div>
                            </div>

                            <div class="" style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
                                <div style="background-color: rgb(242, 242, 242); display: flex; justify-content: space-around; align-items: center; gap: 12px; width: 100%; border-radius: 12px;">
                                    <h5>
                                        <span
                                            style="font-size: 14px; color: #888; font-weight: 100; line-height: 32px; ">Tanggal</span>
                                        <br>
                                        ${schedule.tanggal}
                                    </h5>
                                    <h5>
                                        <span
                                            style="font-size: 14px; color: #888; font-weight: 100; line-height: 32px; ">Lokasi</span>
                                        <br>
                                        ${schedule.alamat}
                                    </h5>
                                </div>
                                <button onclick="deleteSchedule(${schedule.id})" style="width: 100%; box-shadow: 2px 4px 15px #f8bd7d; background-color: #FEAC56; border: none; padding: 14px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                                    Terlaksana
                                </button>
                            </div>

                        </div>
                    </div>
                `;
            });
        })
        .catch((error) => {
            console.error(error);
            alert(`Tidak ada Internet, data jadwal tidak dapat dimuat (${error.message})`);
        });
}

// Panggil fetchSchedules saat halaman dimuat
window.onload = fetchSchedules;


function deleteSchedule(id) {
    if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
        fetch(`http://elqdev.mooo.com/api/api.php/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Gagal menghapus data.');
                }
                return response.json();
            })
            .then(() => {
                alert('Jadwal berhasil dihapus.');
                fetchSchedules(); // Perbarui daftar jadwal
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    }
}
