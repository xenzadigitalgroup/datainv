document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const idPelanggan = document.getElementById('id_pelanggan').value;
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxf6mHgxyvTV9FrADYQKAovF3MaymRxsI3ru2xRCuTZsZwErOo0lmYLbmFAgkIVl6vF9A/exec';  // Pastikan URL ini benar

    // Tampilkan progress bar dan reset hasil
    document.getElementById('result').style.display = 'none';
    document.getElementById('progressBarContainer').style.display = 'block';
    updateProgressBar(0);
    
    fetch(`${scriptURL}?idPelanggan=${encodeURIComponent(idPelanggan)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('nama').innerText = data.nama;
            document.getElementById('totalDana').innerText = formatRupiah(data.totalDana);
            document.getElementById('keuntungan').innerText = formatRupiah(data.keuntungan);
            document.getElementById('result').style.display = 'block';
            document.getElementById('progressBarContainer').style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('progressBarContainer').style.display = 'none';
        });

    // Simulasi progress bar untuk demonstrasi
    let progress = 0;
    const interval = setInterval(() => {
        if (progress >= 90) {
            clearInterval(interval);
        } else {
            progress += 10;
            updateProgressBar(progress);
        }
    }, 200);
});

function updateProgressBar(percent) {
    const progressBarFill = document.getElementById('progressBarFill');
    progressBarFill.style.width = percent + '%';
    progressBarFill.innerText = percent + '%';
}

function formatRupiah(angka) {
    const numberString = angka.toString();
    const sisa = numberString.length % 3;
    let rupiah = numberString.substr(0, sisa);
    const ribuan = numberString.substr(sisa).match(/\d{3}/g);
    
    if (ribuan) {
        const separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    
    return 'Rp' + rupiah;
}
