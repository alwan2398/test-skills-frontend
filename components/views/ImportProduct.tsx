"use client";
import { useState, useRef } from "react";
import { useStore, Product } from "@/lib/store";

export default function ImportProduct() {
  const { addProduct } = useStore();
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Fitur Download Template CSV
  const handleDownloadTemplate = () => {
    const csvContent =
      "data:text/csv;charset=utf-8,name,price,type\nPikachu,50000,Electric\nBulbasaur,45000,Grass";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "template_pokemon.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2 & 3. Fitur Import, Baca File, dan Validasi
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi Format File
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setError("Error: Format file wajib .csv");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const rows = text
        .split("\n")
        .map((row) => row.trim())
        .filter((row) => row);
      if (rows.length < 2) {
        setError("Error: File CSV kosong atau tidak memiliki data.");
        return;
      }

      // Validasi Header
      const headers = rows[0].toLowerCase().split(",");
      if (
        !headers.includes("name") ||
        !headers.includes("price") ||
        !headers.includes("type")
      ) {
        setError(
          "Error: Format header salah. Wajib mengandung kolom: name, price, type.",
        );
        return;
      }

      let importedCount = 0;
      for (let i = 1; i < rows.length; i++) {
        const cols = rows[i].split(",");
        if (cols.length >= 3) {
          const rawPrice = Number(cols[headers.indexOf("price")]);

          // Validasi tipe data harga
          if (isNaN(rawPrice)) {
            continue; // Skip baris yang harganya bukan angka
          }

          const newProduct: Product = {
            id: `imported-${Date.now()}-${i}`,
            name: cols[headers.indexOf("name")],
            price: rawPrice,
            type: cols[headers.indexOf("type")],
            // Fallback image untuk data import
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
          };

          addProduct(newProduct);
          importedCount++;
        }
      }

      alert(`Sukses! ${importedCount} produk berhasil di-import.`);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input
    };

    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow border mb-6 flex flex-col md:flex-row items-center gap-4 justify-between">
      <div>
        <h3 className="font-bold text-lg">Import Data Produk</h3>
        <p className="text-sm text-gray-500">
          Upload file CSV untuk menambah produk massal.
        </p>
        {error && (
          <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleDownloadTemplate}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50 transition"
        >
          Download Template
        </button>

        <label className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition cursor-pointer">
          Upload CSV
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
