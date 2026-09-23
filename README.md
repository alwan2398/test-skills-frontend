# Pokemon Card Store

Proyek ini adalah _mini e-commerce_ yang dibangun menggunakan **Next.js 15 (App Router)** sebagai pemenuhan syarat _technical test_ untuk posisi Frontend Developer.

## 🚀 Teknologi yang Digunakan

- **Framework:** Next.js 15+ (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API (Global State) & `useState` (Local State)
- **Data Source:** [PokeAPI](https://pokeapi.co/)

## 🏗️ Arsitektur Proyek

Proyek ini mengadopsi pola **Modular / Separation of Concerns (SoC)**:

1. **Server-Side Fetching (`app/page.tsx`):** Data ditarik di _Server Component_ untuk menghindari _waterfall request_ di sisi _client_ dan meningkatkan performa render awal (SEO Friendly).
2. **Client-Side Hydration & Interactivity (`components/Views/StoreClient.tsx`):** Data yang di-_fetch_ dari API kemudian dimasukkan ke dalam _Context_, sehingga operasi manipulasi data (CRUD dan _Cart_) terjadi dengan kecepatan tinggi secara lokal di memori _browser_.
3. **Global State Management:** Menggunakan React Context API untuk memastikan sinkronisasi data antara Katalog Produk, Modal Form, dan Keranjang Belanja berjalan mulus tanpa terjadi _prop drilling_ yang berlebihan.

## 🛠️ Cara Menjalankan Proyek (Local Development)

1. Pastikan Anda memiliki **Node.js** terinstal (versi 18.x atau lebih baru).
2. _Clone repository_ ini dan buka terminal di dalam _folder_ proyek.
3. Jalankan perintah instalasi dependensi:
   ```bash
   npm install
   ```
