document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const btnCancel = document.getElementById('btnCancel');
    const modalCaptionTitle = document.getElementById('modalCaptionTitle');
    const btnFullFile = document.getElementById('btnFullFile');
    const btnWhatsapp = document.getElementById('btnWhatsapp');
    const btnShare = document.getElementById('btnShare');
    
    // GANTI DENGAN NOMOR WA ANDA (Format: 628xxxxxxx)
    const whatsappNumber = '6285161808524'; 

    function hideModal() {
        modal.classList.remove('is-visible');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300); // Harus sama dengan durasi transisi CSS (0.3s)
    }

    // 1. Tampilkan Modal saat Item Desain Diklik
    document.querySelectorAll('.popup-trigger').forEach(item => {
        item.addEventListener('click', function(event) {
            if (event.target.closest('.design-item')) {
                const imagePath = this.getAttribute('data-file');
                const captionText = this.getAttribute('data-caption'); // Caption pendek

                // Tampilkan judul di action sheet 
                modalCaptionTitle.textContent = `Pilih opsi untuk: ${captionText}`;

                // Opsi 1: Lihat File Penuh
                btnFullFile.href = imagePath;
                
                // Opsi 2: Hubungi WA Designer
                const whatsappMessage = `Halo Designer Makna, saya tertarik dengan karya-karya di portofolio Anda. Bisakah saya mendiskusikan proyek?`;
                const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
                btnWhatsapp.href = whatsappURL;

                // Tampilkan modal dengan animasi
                modal.style.display = "block";
                setTimeout(() => {
                     modal.classList.add('is-visible');
                }, 10);
                
                // Opsi 3: Bagikan Foto
                btnShare.onclick = function() {
                    if (navigator.share) {
                        navigator.share({
                            title: `Karya Desain Makna: ${captionText}`,
                            text: "Lihat karya desain ini!", 
                            url: window.location.href 
                        }).catch(error => console.error('Error sharing', error));
                    } else {
                        // Fallback untuk desktop: salin URL
                        navigator.clipboard.writeText(window.location.href);
                        alert(`URL portofolio sudah disalin. (Bagikan karya: ${captionText})`);
                    }
                    hideModal();
                };
            }
        });
    });

    // 2. Tutup Modal saat tombol Batal diklik
    btnCancel.onclick = hideModal;

    // 3. Tutup Modal saat mengklik di luar modal
    window.onclick = function(event) {
        if (event.target === modal) {
            hideModal();
        }
    }
});
