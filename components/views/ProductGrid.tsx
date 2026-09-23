import Image from "next/image";
import { Button } from "@/components/ui/button";

interface PokemonProduct {
  id: string;
  name: string;
  image: string;
  price: number;
}

async function fetchPokemonData(query?: string): Promise<PokemonProduct[]> {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();

    let products = data.results.map(
      (pokemon: { name: string; url: string }, index: number) => {
        // Ekstrak ID dari URL (contoh: https://pokeapi.co/api/v2/pokemon/1/ -> id: 1)
        const id = pokemon.url.split("/").filter(Boolean).pop();

        return {
          id,
          name: pokemon.name,
          // Menggunakan gambar official artwork dari PokeAPI
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          // Generate harga dummy (misal ID 1 * 10000 = Rp 10.000)
          price: Number(id) * 10000 + 50000,
        };
      },
    );

    // Implementasi Search Filter (Jika ada input dari URL Params)
    if (query) {
      products = products.filter((p: PokemonProduct) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return products;
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
}

// Komponen Utama (Server Component)
export default async function ProductGrid({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  // Await searchParams untuk Next.js 15
  const query = await searchParams?.query;
  const products = await fetchPokemonData(query);

  if (products.length === 0) {
    return <div className="text-center py-10">Pokemon tidak ditemukan.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="relative w-32 h-32 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              fill
              loading="eager"
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <h3 className="text-lg font-semibold capitalize mb-1">
            {product.name}
          </h3>

          <p className="text-gray-600 mb-4">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(product.price)}
          </p>

          {/* Tombol Add to Cart untuk requirement Cart & Checkout */}
          <Button className="w-full mt-auto" variant="default">
            Tambah ke Cart
          </Button>
        </div>
      ))}
    </div>
  );
}
