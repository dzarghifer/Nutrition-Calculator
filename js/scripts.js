function validate() {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const age = parseInt(document.getElementById("age").value);

  let isValid = true;
  let errorMessage = "";

  // Validasi tinggi badan
  if (isNaN(height) || height <= 0) {
    errorMessage += "Tinggi badan harus diisi dengan angka yang valid.\n";
    isValid = false;
  } else if (height < 100 || height > 250) {
    errorMessage += "Tinggi badan harus antara 100-250 cm\n";
    isValid = false;
  }

  // Validasi berat badan
  if (isNaN(weight) || weight <= 0) {
    errorMessage += "Berat badan harus diisi dengan angka yang valid.\n";
    isValid = false;
  } else if (weight < 30 || weight > 200) {
    errorMessage += "Berat badan harus antara 30-200 kg\n";
    isValid = false;
  }

  // Validasi usia
  if (isNaN(age) || age <= 0) {
    errorMessage += "Usia harus diisi dengan angka yang valid.\n";
    isValid = false;
  } else if (age < 15 || age > 80) {
    errorMessage += "Usia harus antara 15-80 tahun\n";
    isValid = false;
  }

  if (!isValid) {
    alert(errorMessage);
    return false;
  }

  return true;
}

function calculateResults() {
  // Jalankan validasi terlebih dahulu
  if (!validate()) {
    return; // Hentikan kalkulasi jika validasi gagal
  }

  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const age = parseInt(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const activityFactor = parseFloat(document.getElementById("activity").value);
  const stressFactor = parseFloat(document.getElementById("stress").value);

  // Hitung IMT
  const bmi = weight / (((height / 100) * height) / 100);
  let bmiStatus;
  if (bmi < 18.5) {
    bmiStatus = "Berat badan kurang (underweight)";
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    bmiStatus = "Berat badan normal";
  } else if (bmi >= 23 && bmi <= 24.9) {
    bmiStatus = "Kelebihan berat badan (overweight) dengan risiko";
  } else if (bmi >= 25 && bmi <= 29.9) {
    bmiStatus = "Obesitas I";
  } else {
    bmiStatus = "Obesitas II";
  }

  // Hitung BMR
  let bmr;
  if (gender === "male") {
    bmr = 66 + 13.7 * weight + 5 * height - 6.8 * age;
  } else {
    bmr = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
  }

  // Hitung BMR dengan faktor aktivitas dan faktor stres
  const totalBmr = bmr * activityFactor * stressFactor;

  // Hitung BBI
  const bbi = height - 100 - 0.1 * (height - 100);

  // Tampilkan hasil dan saran yang lebih detail
  const resultDiv = document.getElementById("result");
  let suggestion = "";

  if (bmi < 18.5) {
    suggestion = `
            <div style="font-size: 18px;">
            <strong>Rekomendasi untuk meningkatkan berat badan secara sehat:</strong>
            <ul>
                <li>Hindari Hoax dan Suplemen Ajaib.</li>
                    Alih-alih membeli suplemen ajaib nan mahal, lebik baik hemat uang Anda untuk makanan yang kaya zat gizi dan lezat.
                <li>Fokus pada Kualitas, Bukan Sekedar Kuantitas</li>
                    Mengonsumsi makanan tinggi gula dan natrium seperti minuman kemasan, es krim, permen, 
                    dan keripik bukanlah cara yang tepat menambah berat badan. Secara kuantitas, berat badan Anda bertambah, 
                    tetapi secara kualitas sangatlah tidak tepat. Untuk penambahan berat badan yang aman, 
                    Anda memerlukan zat gizi dari semua kelompok makanan yang beranekaragam. Gunakan konsep isi piringku.
                <li>Makanlah sesuai kemampuan dan kebiasaan</li>
                    Jika Anda tidak terbiasa makan dalam jumlah besar, maka makanlah dengan frekuensi lima sampai enam kali sehari. 
                    Minumlah air yang cukup sebelum dan sesudah makan, tetapi tidak saat makan. Ini membantu menyisakan lebih banyak ruang untuk makanan.
                <li>Konsultasi dengan Ahli Gizi</li>
                    Lakukan konsultasi personal dengan ahli gizi teregistrasi (nutrisionis/dietisien) untuk membantu Anda membuat perencanaan 
                    makan sesuai kebutuhan gizi dan kebiasaan makan sehari-hari.<br>
                        source:<a href="https://yankes.kemkes.go.id/view_artikel/733/tips-sukses-menaikkan-berat-badan" target="_blank">
                        <em>Direktorat Jenderal Pelayanan Kesahatan</em></a>
            </ul>
            </div>
        `;
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    suggestion = `
            <div style="font-size: 18px;">
            <strong>Gizi seimbang terdiri dari 4 pilar,</strong> yang pada dasarnya merupakan upaya untuk menyeimbangkan antara zat gizi yang keluar
             dan zat gizi yang masuk dengan mengontrol berat badan secara teratur. Adapun 4 pilar gizi seimbang tersebut, yaitu:
            <ul>
                <li>Konsumsi makanan dengan beraneka ragam</li>
                    Dianjurkan untuk mengonsumsi beraneka ragam makanan dan beraneka ragam warna. Sebagai contoh karbohidrat nasi, mie, umbi-umbian, dan tepung-tepungan. 
                    Sumber protein ikan, daging ayam, daging sapi, telur, tahu, tempe dan kacang-kacangan. Sumber vitamin penuhi dari sayur dan buah-buahan yang 
                    beraneka ragam warna masing-masing sekitar 2-3 porsi buah per hari dan 3-4 porsi sayur per hari.
                <li>Pola hidup aktif dan berolahraga</li>
                    Aktivitas fisik merupakan upaya  tubuh dalam menyeimbangkan keluar dan masuknya zat gizi, terutama sumber energi utama dalam tubuh. 
                    Selain itu, aktivitas fisik juga dapat memperlancar sistem metabolisme tubuh, tak terkecuali metabolisme zat gizi.
                <li>Menerapkan pola hidup bersih dan sehat</li>
                    sehat adalah keadaan sehat baik secara fisik, mental, spiritual, maupun sosial yang memungkinkan setiap orang untuk hidup produktif secara sosial dan ekonomis.
                     Dengan menerapkan pola hidup bersih dan sehat (PHBS), kita dapat menghindarkan dari penyakit infeksi.
                <li>Menjaga berat badan ideal</li>
                    Salah satu indikator yang menunjukkan bahwa telah terjadi keseimbangan gizi di dalam tubuh adalah memiliki berat badan yang normal dalam Indeks Masa Tubuh (IMT).<br>
                        source:<a href="https://yankes.kemkes.go.id/view_artikel/179/pilar-utama-dalam-prinsip-gizi-seimbang" target="_blank">
                        <em>Direktorat Jenderal Pelayanan Kesahatan</em></a>
            </ul>
            </div>
        `;
  } else if (bmi >= 23 && bmi <= 24.9) {
    suggestion = `
            <div style="font-size: 18px;">
            <strong>Rekomendasi untuk menurunkan berat badan secara sehat: </strong>
            <ul>
                <li>Mengatur pola makan sehat dan bergizi, dengan mengonsumsi aneka ragam pangan, cara pengolahan pangan dan jadwal makan yang tepat.</li>  
                <li>Tidak mengonsumsi gula, garam, lemak berlebih, perbanyak konsumsi buah dan sayur. Minimal 5 porsi perhari atau setara 450gr/hari (2/3 sayur, 1/3 buah).</li>  
                <li>Melakukan aktivitas fisik atau latihan fisik.</li>  
                <li>Tidak mengonsumsi rokok dan alkohol.</li>  
                <li>Jaga berat badan ideal.</li>  
                <li>Lakukan Aktivitas Fisik.</li>  
                <li>Konsumsi Gizi Seimbang.</li>  
                <li>Atur Pola Tidur/Istirahat.</li>  
                <li>Memenuhi angka kecukupan gizi, karena jika tidak terpenuhi kebutuhan sehari akan berakibat tubuh menjadi lemas.</li>  
                <li>Kurangi konsumsi GGL (Garam Gula Lemak) dengan anjuran batas maksimal harian: 1 sendok teh garam, 4 sendok makan gula, 5 sendok makan lemak.</li>  
                <li>Mencukupi kebutuhan air putih sekitar 8 gelas per hari.</li><br>
                        source:<a href="https://yankes.kemkes.go.id/view_artikel/3109/cara-sehat-turunkan-berat-badan" target="_blank">
                        <em>Direktorat Jenderal Pelayanan Kesahatan</em></a><br>
                        source:<a href="https://p2ptm.kemkes.go.id/infographic-p2ptm/obesitas/yuk-cegah-berat-badan-berlebih" target="_blank">
                        <em>P2PTM</em></a>
            </ul>
            </div>
        `;
  } else if (bmi >= 25 && bmi <= 29.9) {
    suggestion = `
            <div style="font-size: 18px;">
            <strong>Rekomendasi untuk menurunkan berat badan secara sehat: </strong>
            <ul>
                <li>Mengetahui berat badan dan lingkar pinggang ideal, serta timbang berat badan setiap 1 minggu sekali secara rutin.</li>  
                <li>Mengurangi asupan makanan cepat saji dan makanan atau minuman yang mengandung gula.</li>  
                <li>Memperbanyak asupan sayur dan buah-buahan.</li>  
                <li>Mengonsumsi makanan bergizi lengkap dan seimbang dengan indeks glikemik rendah.</li>  
                <li>Minum air putih dalam jumlah yang cukup.</li>  
                <li>Berolahraga dengan intensitas sedang, seperti bersepeda dan berenang, setidaknya selama 30 menit sehari atau 150 menit per minggu.</li>  
                <li>Mencukupi waktu tidur dan istirahat.</li>  
                <li>Mengelola stres dengan baik, seperti mengikuti yoga atau meditasi.</li>
            </ul>
            <b>Rekomendasi untuk mengatur pola makan:</b>
            <ul>
                <li>Utamakan konsumsi protein rendah lemak, seperti: tahu, tempe, ikan, daging ayam tanpa kulit.</li>  
                <li>Jadikan buah utuh sebagai makanan selingan.</li>  
                <li>Perbanyak konsumsi sayur yang diolah dengan cara direbus atau ditumis.</li>  
                <li>Hindari buah yang berenergi tinggi seperti durian, mangga, sawo, cempedak, pisang, srikaya, dan alpukat.</li>  
                <li>Pengaturan makan menggunakan piring model T, dengan mengonsumsi sayur dua kali lipat dari jumlah makanan sumber karbohidrat dan jumlah protein yang setara dengan jumlah makanan sumber karbohidrat.</li>  
                source:<a href="https://bkombandung.kemkes.go.id/obesitas-juga-perlu-diatur-loh/" target="_blank">
                <em>BKOM bandung kemkes</em></a><br>
                source:<a href="https://p2ptm.kemkes.go.id/infographic-p2ptm/obesitas/apa-yang-harus-dilakukan-bila-anda-mengalami-obesitas-2 " target="_blank">
                <em>P2PTM</em></a><br>
                source:<a href="https://yankes.kemkes.go.id/view_artikel/429/obesitas " target="_blank">
                <em>Direktorat Jenderal Pelayanan Kesahatan</em></a>
            </ul>
            </div>      
            `;
  } else {
    suggestion = `
            <div style="font-size: 18px;">
            <strong>Rekomendasi untuk menurunkan berat badan secara sehat: </strong>
            <ul>
                <li>Mengetahui berat badan dan lingkar pinggang ideal, serta timbang berat badan setiap 1 minggu sekali secara rutin.</li>  
                <li>Mengurangi asupan makanan cepat saji dan makanan atau minuman yang mengandung gula.</li>  
                <li>Memperbanyak asupan sayur dan buah-buahan.</li>  
                <li>Mengonsumsi makanan bergizi lengkap dan seimbang dengan indeks glikemik rendah.</li>  
                <li>Minum air putih dalam jumlah yang cukup.</li>  
                <li>Berolahraga dengan intensitas sedang, seperti bersepeda dan berenang, setidaknya selama 30 menit sehari atau 150 menit per minggu.</li>  
                <li>Mencukupi waktu tidur dan istirahat.</li>  
                <li>Mengelola stres dengan baik, seperti mengikuti yoga atau meditasi.</li>
            </ul>
            <b>Rekomendasi untuk mengatur pola makan:</b>
            <ul>
                <li>Utamakan konsumsi protein rendah lemak, seperti: tahu, tempe, ikan, daging ayam tanpa kulit.</li>  
                <li>Jadikan buah utuh sebagai makanan selingan.</li>  
                <li>Perbanyak konsumsi sayur yang diolah dengan cara direbus atau ditumis.</li>  
                <li>Hindari buah yang berenergi tinggi seperti durian, mangga, sawo, cempedak, pisang, srikaya, dan alpukat.</li>  
                <li>Pengaturan makan menggunakan piring model T, dengan mengonsumsi sayur dua kali lipat dari jumlah makanan sumber karbohidrat dan jumlah protein yang setara dengan jumlah makanan sumber karbohidrat.</li>  
                source:<a href="https://bkombandung.kemkes.go.id/obesitas-juga-perlu-diatur-loh/" target="_blank">
                <em>BKOM bandung kemkes</em></a><br>
                source:<a href="https://p2ptm.kemkes.go.id/infographic-p2ptm/obesitas/apa-yang-harus-dilakukan-bila-anda-mengalami-obesitas-2 " target="_blank">
                <em>P2PTM</em></a><br>
                source:<a href="https://yankes.kemkes.go.id/view_artikel/429/obesitas " target="_blank">
                <em>Direktorat Jenderal Pelayanan Kesahatan</em></a>
            </ul>
            </div>
        `;
  }

  resultDiv.innerHTML = `
        <table class="hasil">
            <tr>
                <th colspan=2>Hasil Kalkulasi :</th>
            <tr>
                <td>Indeks Massa Tubuh (IMT)</td>
                <td>: ${bmi.toFixed(2)} Kg/M<sup>2</sup> - ${bmiStatus}</td>
            </tr>
            <tr>
                <td>Basal Metabolic Rate (BMR)</td>
                <td>: ${bmr.toFixed(2)} kalori/hari</td>
            </tr>
            <tr>
                <td>Kebutuhan Kalori Total</td>
                <td>: ${totalBmr.toFixed(2)} kalori/hari</td>
            </tr>
            <tr>
                <td>Berat Badan Ideal (BBI)</td>
                <td>: ${bbi.toFixed(2)} kg</td>
            </tr>
        </table>
        <h3>Saran dan Rekomendasi:</h3>
        <div class="saran">${suggestion}</div>
    `;
}
