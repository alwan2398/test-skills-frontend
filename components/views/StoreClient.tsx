"use client";
import { useState } from "react";
import { useStore, Product } from "@/lib/store";
import Image from "next/image";
import ImportProduct from "./ImportProduct";

export default function StoreClient() {
  const {
    products,
    cart,
    addProduct,
    updateProduct,
    deleteProduct,
    addToCart,
    removeFromCart,
    checkout,
    cartTotal,
  } = useStore();

  // State untuk form Modal (Tambah/Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleOpenForm = (product?: Product) => {
    setFormData(
      product || {
        name: "",
        type: "",
        price: 0,
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      },
    );
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      updateProduct(formData as Product);
    } else {
      addProduct(formData as Product);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* --- KIRI: KATALOG PRODUK --- */}
      <div className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Pokemon Store</h1>
          <button
            onClick={() => handleOpenForm()}
            className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            + Tambah Produk
          </button>
        </div>

        <ImportProduct />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-xl shadow border hover:shadow-lg transition flex flex-col"
            >
              <div className="relative w-full h-32 bg-gray-100 rounded-md mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                  sizes="200px"
                />
              </div>
              <h3 className="font-bold text-lg capitalize">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-1">Tipe: {product.type}</p>
              <p className="font-semibold text-blue-600 mb-4">
                Rp {product.price.toLocaleString("id-ID")}
              </p>

              <div className="mt-auto space-y-2">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenForm(product)}
                    className="w-full border border-gray-300 py-1 rounded text-sm hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="w-full border border-red-200 text-red-600 py-1 rounded text-sm hover:bg-red-50"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- KANAN: CART & CHECKOUT --- */}
      <div className="w-full md:w-80 bg-white border-l shadow-xl p-6 flex flex-col sticky top-0 h-screen">
        <h2 className="text-2xl font-bold mb-6">Keranjang 🛒</h2>

        <div className="flex-1 overflow-y-auto space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">Keranjang kosong</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <h4 className="font-semibold capitalize">{item.name}</h4>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xl hover:text-red-700"
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>Rp {cartTotal.toLocaleString("id-ID")}</span>
          </div>
          <button
            onClick={checkout}
            className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800"
          >
            Checkout Sekarang
          </button>
        </div>
      </div>

      {/* --- MODAL FORM CRUD --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {formData.id ? "Edit" : "Tambah"} Produk
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Nama Pokemon
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Tipe (ex: Fire, Water)
                </label>
                <input
                  required
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Harga (Rp)</label>
                <input
                  required
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 py-2 rounded"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
