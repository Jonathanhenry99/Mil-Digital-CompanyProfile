# Design References — MIL Digital Website

> Diperbarui 17 Oktober 2026. Dokumen hidup: tambahkan referensi baru di §1.

Dokumen ini mencatat referensi desain yang disukai dan yang dihindari, plus alasannya, supaya keputusan desain tidak bergantung pada ingatan siapa pun. Struktur halaman tetap mengikuti page inventory ([PROJECT_SPEC.md §3](PROJECT_SPEC.md#3-page-inventory)); referensi di sini mengatur **cara** menyajikannya.

---

## 1. Cara memberi tahu style yang disukai

Referensi paling berguna jika menjawab tiga hal: **apa**, **di mana**, **kenapa**.

| Kurang jelas | Jelas |
|---|---|
| "Saya suka website ini." | "Section *Proses* di TT: saat di-scroll, foto ruangan berubah dari kosong ke jadi dan langkah 01–04 menyala bergantian. Saya suka karena ceritanya jalan tanpa harus membaca." |
| "Bikin lebih bagus." | "Terlalu banyak ruang kosong di antara section; buat lebih padat seperti TT." |
| "Formnya kurang menarik." | "Form seperti kertas catatan di TT, field bernomor, bisa dibuka dari tombol mana pun." |

Format singkat yang bisa langsung dikirim:

```
Referensi: <URL / screenshot>
Bagian:    <section atau elemen>
Suka:      <apa yang terjadi / terlihat>
Kenapa:    <rasa yang diinginkan>
Hindari:   <kalau ada>
```

### Kosakata cepat

Pakai kata-kata ini untuk mempersingkat masukan:

| Aspek | Pilihan |
|---|---|
| Kepadatan | lega · **padat** |
| Sudut | membulat · **kotak/tegas** |
| Gerak | ramai · **tenang, satu gerakan per bab** |
| Warna dasar | terang · **gelap hangat** · biru brand |
| Tipografi | satu font · **dua peran (display + teks)** |
| Foto | stok · **asli, besar, sedikit** |
| Scroll | blok terpisah · **bab yang berubah saat di-scroll** |

Pilihan tebal adalah arah yang tercatat dari referensi TT.

---

## 2. Referensi A — Time Travel Design (disukai)

URL: <https://deft-alpaca-be3574.netlify.app> · Screenshot: [docs/references/time-travel/](references/time-travel/)

Satu file statis: HTML + CSS + JS biasa, smooth scroll dengan Lenis. Panjangnya 19 layar, tapi **hanya 8 bab**, dan setiap bab yang panjang selalu "berisi" perubahan saat di-scroll.

### Struktur

| # | Bab | Yang terjadi saat di-scroll | Teknik |
|---|---|---|---|
| 1 | Hero | Foto/video dengan lapisan depan-belakang yang bergeser mengikuti kursor; judul naik per baris | Parallax 3D berlapis; video HD baru dimuat setelah halaman selesai |
| 2 | Studio + Angka | Pernyataan besar di atas foto, lalu **cincin foto berputar** di kiri sementara **angka menyala satu per satu** di kanan (2021 · 24 karya · 3 bln) | Satu bab panjang (4,8 layar); angka yang sedang di tengah layar terang, sisanya redup |
| 3 | Layanan | **Panel layanan menumpuk**: panel berikutnya naik menutupi yang sebelumnya, yang tertutup meredup dan sedikit mengecil | `position: sticky` + redup/scale dari JS |
| 4 | Karya | Carousel "cascade": 1 karya lebar di tengah, tetangganya sempit; caption muncul bertahap; counter 01/06 dan panah | Clip-path + translate; auto-advance, swipe |
| 5 | Proses | **Ruangan kosong berubah jadi ruangan jadi** saat di-scroll; langkah 01–04 menyala bergantian; garis "Sebelum → Sesudah" terisi | 72 frame gambar digambar ke canvas sesuai posisi scroll |
| 6 | Testimoni | Cascade kartu: kutipan + foto proyek | Komponen cascade yang sama |
| 7 | Tim | Daftar nama; hover/scroll mengganti foto di bingkai dan caption | Satu bingkai, banyak foto |
| 8 | Kontak | **Form "Catatan proyek" seperti kertas**: tekstur kertas, penjepit, field bernomor 01)–05), checkbox kotak; dikirim sebagai pesan WhatsApp yang sudah tersusun | Form yang sama juga bisa dibuka sebagai **lembar yang naik dari bawah** dari tombol "Mulai proyek" mana pun, dengan layanan sudah terpilih |

### Detail kecil yang membuatnya terasa rapi

- **Warna latar bergeser halus** antar bab dalam satu keluarga warna (#121211 → #0D0D0C), tanpa potongan keras.
- **Nav**: jam studio live dengan ikon jam analog ("Jakarta 22.44"), garis bawah di menu bab yang sedang dibaca, nav sembunyi saat scroll turun.
- **Tombol kotak 52px** (tanpa radius), label 14 tebal, panah yang bergeser keluar-masuk saat hover, tombol sedikit mengecil saat ditekan.
- **Dua peran tipografi**: *display* (Cabinet Grotesk, tebal, rapat) untuk semua judul, dan *text* (Satoshi) untuk sisanya. Label 13px; tidak ada font mono.
- **Garis tipis yang tergambar** dari kiri ke kanan saat masuk layar.
- **Angka**: count-up sekali, lalu "menyala" hanya saat berada di tengah layar.
- **Skala spasi tetap** (4/8/12/16/24/32/48/64/96/128) dan padding section `clamp(88px, 11vw, 168px)`; gutter kecil `clamp(20px, 4vw, 48px)`, jadi konten terasa padat.
- **Caption carousel** muncul berurutan (stagger 70ms) setelah slide berhenti.
- Semua animasi punya versi **reduced motion**, dan konten tetap terlihat tanpa JS.

### Token

`--bg #121211` · `--paper #F2F0E9` · `--on-dark #F2F0E9 / #AAA7A0 / #72706A` · `--line rgba(242,240,233,.16)` · ease `cubic-bezier(.22,1,.36,1)` · max-width 1440px.

---

## 3. Referensi B — MGDverse (kompetitor, agency sejenis)

URL: <https://mgdverse.com> · WordPress + Elementor.

| Section | Isi |
|---|---|
| Hero | 3 angka: 10+ tahun, 500+ klien sejak 2016, 74B+ budget per kuartal; "Ready to transform your digital presence?" |
| About | Satu paragraf + Read more |
| Service | 2 layanan: Digital Marketing Consultant, Creative Performance |
| Trusted by | Grid logo 500+ brand (fashion, beauty, mom & baby) |
| Partner | Partner platform yang "powering our strategy" |
| Workspace | "Where the magic happens": foto studio live shopping dan ruang kerja |
| Team | "Meet the minds": 70+ orang |
| Insight | 4 artikel terbaru |

**Diambil:** semua klaim dibuktikan dengan angka di bagian paling atas, ada badge partner platform, foto ruang kerja dan tim asli, serta pilihan bahasa EN/ID.
**Tidak diambil:** layout template Elementor, blok yang diduplikasi per breakpoint, dan minimnya interaksi.

---

## 4. Penilaian homepage MIL saat ini

| | Status |
|---|---|
| **Sudah unggul dari MGD** | Interaksi (wheel, journey film, galeri), CMS untuk konten utama, form → Leads, data dan foto asli, performa (halaman statis) |
| **Masih di bawah TT** | (1) **13 blok** dengan topik yang sering berganti, TT hanya 8 bab. (2) Ada bagian **tanpa konteks**: journey film 3,2 layar padahal videonya belum ada, dan galeri lengkung berisi foto stok. (3) Belum ada **bab "proses"** yang berubah saat di-scroll. (4) Form kontak masih kartu standar dan tidak bisa dibuka dari CTA. (5) Detail kecil belum konsisten: tombol pill campur kotak, label mono, potongan warna keras antar section. |

Panjang total hampir sama (MIL 19,7 layar, TT 19,3 layar). Yang perlu dipangkas adalah **jumlah pergantian topik dan bagian kosong**, bukan panjangnya.

---

## 5. Homepage v2 (dibangun 17 Okt 2026)

Status: **sudah diimplementasikan.** Tabel di bawah adalah rencana awalnya; perbedaan dari implementasi:
- Journey film tidak lagi berupa section terpisah. Video dari CMS (Homepage → Journey film → Video) diputar di **hero** setelah halaman selesai dimuat.
- Welcoming animation sekarang per bab, tanpa "lembaran" bertepi keras: garis yang tergambar, judul naik per kata, dan koreografi khas tiap bab. Warna latar bergeser halus antar bab (`data-ground`).
- **Brief MIL** mengikuti detail kertas TT: tanpa garis pemisah baris, garis tinta di bawah isian, kotak centang kecil, textarea bergaris, penjepit kertas, dan kaki kertas "MIL / BDG".

### Rencana awal

Mengikuti inventory, dengan cara penyajian ala TT. Latar **gelap hangat dulu**; aksen tetap biru MIL. Token sudah terpisah, jadi pindah ke biru nanti cukup ganti di satu tempat.

| # | Bab (inventory) | Penyajian | Aset animasi |
|---|---|---|---|
| 1 | Hero | Foto tim + judul; pin dipersingkat | Partikel "Signal" dipertahankan, lebih halus |
| 2 | Stats (+ statement MIL) | Satu bab: pernyataan "We help brands grow…", lalu angka menyala satu per satu dengan cincin foto karya/tim di kiri; badge Meta | **Baru**: photo wheel + stat spotlight |
| 3 | Portofolio | Marquee logo (band singkat) | Marquee tetap |
| 4 | Case study | Work wheel | Wheel tetap |
| 5 | Our services | Panel menumpuk (sticky stack); CTA tiap panel membuka brief dengan layanan terpilih | **Ganti** panel hover → stack |
| 6 | Why MIL & values | Bab **proses** yang berubah saat di-scroll: Assessment → Strategize → Execute → Monitor, visual dashboard terbentuk; values sebagai baris ringkas | **Baru**: process scrub (kelak dari video Higgsfield) |
| 7 | Team | Daftar orang/fungsi, foto berganti di satu bingkai | **Ganti** layout team |
| 8 | Testimonials | Satu kutipan besar (baru 1 testimoni asli) | — |
| 9 | Articles & reports | Galeri yang melebar saat hover | Tetap |
| 10 | Contact-us form | **"Brief MIL"** bergaya kertas, field bernomor; bisa dibuka sebagai lembar dari semua tombol "Book a Consultation"; simpan ke Leads **dan** buka WhatsApp | **Baru** |

**Dikeluarkan dari homepage:**
- **Galeri lengkung**: dipindah ke halaman Creative Solution setelah ada foto karya asli.
- **Journey film**: hanya tampil jika video sudah diunggah di CMS.
