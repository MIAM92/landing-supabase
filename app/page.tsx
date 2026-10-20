import Link from 'next/link';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { supabase } from '../lib/supabase';

async function ContenidoCafes() {
  // Esto obliga a Next.js 15 a volver dinámica la página durante el build
  await headers();
  
  const { data: productos } = await supabase.from('productos').select('*');

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {productos?.map((item) => (
        <div key={item.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col justify-between">
          <div>
            <img src={item.imagen_url} alt={item.nombre} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-xs font-semibold uppercase bg-amber-100 text-amber-800 px-2 py-1 rounded">
                {item.categoria}
              </span>
              <h2 className="text-xl font-bold mt-2 text-gray-800">{item.nombre}</h2>
              <p className="text-sm text-gray-500">{item.origen}</p>
              <p className="text-amber-700 font-bold mt-2">\${item.precio} USD</p>
            </div>
          </div>
          <div className="p-4 pt-0">
            <Link href={`/productos/${item.slug}`} className="block text-center bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition">
              Ver detalles del grano
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto p-6 font-sans">
      <header className="text-center my-12">
        <h1 className="text-4xl font-bold text-amber-900 mb-2">Cafetería de Especialidad</h1>
        <p className="text-gray-600">Explora granos únicos del mundo directo a tu taza.</p>
        <div className="flex justify-center gap-4 mt-6">
          <Link href="/categorias/premium" className="px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition">
            Ver Premium
          </Link>
          <Link href="/categorias/tradicional" className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition">
            Ver Tradicional
          </Link>
        </div>
      </header>

      <Suspense fallback={<div className="text-center p-12 text-amber-800 animate-pulse">Cargando catálogo...</div>}>
        <ContenidoCafes />
      </Suspense>
    </main>
  );
}
