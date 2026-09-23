# Pokemon Card Store - Frontend Skill Test - Muhamad Alwan Sholeh 

Proyek ini adalah aplikasi *mini e-commerce* yang dibangun menggunakan **Next.js 16** untuk memenuhi kriteria evaluasi teknis Vontis / Dust Technology. Aplikasi ini mendemonstrasikan konsumsi API, *state management* lokal untuk simulasi keranjang belanja, serta fitur *import* data di sisi *client*.

## 🚀 Teknologi & Arsitektur

*   **Framework:** Next.js 15 (App Router)
*   **Styling:** Tailwind CSS
*   **State Management:** React Context API (Global State)
*   **Data Source:** PokeAPI v2

**Pola Arsitektur (Separation of Concerns):**
Aplikasi ini memisahkan logika pengambilan data dengan interaktivitas. *Server Component* digunakan untuk mengambil data awal secara statis/dinamis dari PokeAPI, kemudian data tersebut di-hidrasi (*hydration*) ke *Client Component* menggunakan Context API. Hal ini memungkinkan operasi CRUD dan *Cart* berjalan dengan latensi mendekati nol di memori *browser*.

---

## 📋 Task Checklist & Penyelesaian Soal

### ☑️ Soal 1: Mini E-Commerce (Pokemon Card Store)
- [x] **API Integration:** Menarik detail Pokémon langsung dari PokeAPI.
- [x] **Product Catalog:** Menampilkan daftar Pokémon dalam bentuk grid katalog e-commerce (gambar, nama, harga, tipe).
- [x] **CRUD Operation:** Simulasi penambahan, pengeditan, dan penghapusan produk langsung di *client-state* (karena PokeAPI bersifat *read-only*).
- [x] **Cart & Checkout:** Implementasi keranjang belanja reaktif dengan kalkulasi total otomatis dan tombol *checkout* menggunakan Global Context.

### ☑️ Soal 2: Problem Solving & AI Prompting
**Studi Kasus:** Data Pokémon berhasil didapatkan, namun gambar gagal ditampilkan.

**Analisis Kemungkinan Penyebab:**
1.  **Unconfigured Image Domain:** Jika menggunakan komponen `<Image>` dari Next.js, domain sumber gambar (misalnya `raw.githubusercontent.com` untuk PokeAPI) belum didaftarkan di dalam file `next.config.js` atau `next.config.mjs`.
2.  **Invalid API Property:** Properti objek dari PokeAPI yang dipanggil tidak sesuai (misalnya memanggil `pokemon.image` padahal struktur aslinya ada di `pokemon.sprites.other['official-artwork'].front_default`).
3.  **Mixed Content / CORS:** API mengembalikan URL gambar dengan protokol `http://` sedangkan aplikasi berjalan di `https://`, atau terjadi pemblokiran CORS dari *server* gambar.

**Prompt AI untuk Debugging:**
> *"Saya sedang membangun aplikasi Next.js (App Router) menggunakan data dari PokeAPI. Data teks seperti nama dan tipe berhasil di-fetch dan dirender, namun komponen `<Image>` bawaan Next.js gagal memuat gambar dan malah menampilkan alt-text atau error di console. URL gambar yang saya dapatkan dari API contohnya adalah `https://raw.githubusercontent.com/.../25.png`. Berikut adalah snippet komponen saya dan file `next.config.js` saya: [PASTE_KODE_DI_SINI]. Bisakah kamu menganalisis apa penyebab gambar gagal dimuat, dan berikan panduan spesifik untuk mengonfigurasi Next.js Image Optimization agar mengizinkan domain dari PokeAPI tersebut?"*

### ☑️ Soal 3: Import Data Feature
- [x] **Template & Import:** Menyediakan fungsionalitas untuk mengunggah file CSV berisikan data produk (nama, harga, deskripsi).
- [x] **Validation & UI:** Menggunakan Web API `FileReader` bawaan *browser* untuk memvalidasi format dan memecah data CSV. Data yang berhasil divalidasi langsung ditambahkan secara dinamis ke dalam katalog dan *state* tanpa memerlukan *endpoint backend* khusus.

---

## 🛠️ Cara Menjalankan Proyek

1. Pastikan Anda memiliki **Node.js** (versi 18+ direkomendasikan).
2. *Clone repository* ini dan masuk ke direktori proyek.
3. Instal semua dependensi:
   ```bash
   npm install
