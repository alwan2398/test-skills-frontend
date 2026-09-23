import StoreClient from "@/components/views/StoreClient";
import { StoreProvider } from "@/lib/store";

// Fetch API di sisi Server
async function getInitialPokemon() {
  try {
    // Ambil list awal (limit 12 agar cepat dirender)
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
    const data = await res.json();

    // Fetch detail untuk masing-masing pokemon (mendapatkan tipe dan gambar)
    const detailedProducts = await Promise.all(
      data.results.map(async (p: any) => {
        const detailRes = await fetch(p.url);
        const detail = await detailRes.json();

        return {
          id: detail.id.toString(),
          name: detail.name,
          image: detail.sprites.other["official-artwork"].front_default,
          type: detail.types.map((t: any) => t.type.name).join(", "),
          price: detail.base_experience * 500, // Dummy harga berdasarkan base_experience
        };
      }),
    );
    return detailedProducts;
  } catch (error) {
    console.error("Gagal fetch data:", error);
    return [];
  }
}

export default async function HomePage() {
  const initialData = await getInitialPokemon();

  return (
    // Membungkus UI dengan Provider agar semua komponen anak bisa akses Global State
    <StoreProvider initialProducts={initialData}>
      <StoreClient />
    </StoreProvider>
  );
}
