import Link from 'next/link';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getSupabase } from '../lib/supabase';

// ✅ Componente "hoja" que SOLO lee cookies. Su único trabajo es este.
async function CookieReader() {
  await cookies();
  return null; // No renderiza nada visual
}

async function ContenidoCafes() {
  const supabase = getSupabase();
  const { data: productos } = await supabase.from('productos').select('*');

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4">
      {/* ✅ Envolvemos el lector de cookies en su PROPIO Suspense, lo más cerca posible */}
      <Suspense fallback={<div className="col-span-full text-center p-4 text-sm text-gray-500">Verificando sesión...</div>}>
        <CookieReader />
      </Suspense>

      {productos?.map((item: any) => (
        <div key={item.id} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex flex-col h-full">
          <div className="w-full h-56 relative bg-gray-100 shrink-0">
            <img src={item.imagen_url} alt={item.nombre} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 flex flex-col flex-grow justify-between text-left">
            <div>
              <span className="text-xs font-semibold uppercase bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                {item.categoria}
              </span>
              <h2 className="text-xl font-bold mt-3 text-gray-800 line-clamp-2">{item.nombre}</h2>
              <p className="text-sm text-gray-500 mt-1">{item.origen}</p>
              <p className="text-gray-600 mt-3 text-sm line-clamp-3">{item.descripcion}</p>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <span className="text-amber-700 font-bold text-xl">${item.precio} <span className="text-sm font-normal text-gray-500">USD</span></span>
              <Link href={`/productos/${item.slug}`} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                Ver detalles
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto p-6 font-sans">
      <header className="text-center my-16">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">Cafetería de Especialidad</h1>
        <p className="text-lg text-gray-600">Explora granos únicos del mundo directo a tu taza.</p>
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/categorias/premium" className="px-6 py-3 bg-amber-700 text-white font-medium rounded-md hover:bg-amber-800 transition shadow-md">Ver Premium</Link>
          <Link href="/categorias/tradicional" className="px-6 py-3 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 transition shadow-md">Ver Tradicional</Link>
        </div>
      </header>
      <Suspense fallback={<div className="text-center p-12 text-amber-800 animate-pulse font-medium">Cargando catálogo...</div>}>
        <ContenidoCafes />
      </Suspense>
    </main>
  );
}