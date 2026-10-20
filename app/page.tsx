import Link from 'next/link';
import { Suspense } from 'react';
import { supabase } from '../lib/supabase';

async function ContenidoCafes() {
  const { data: productos } = await supabase.from('productos').select('*');

  return (
    <section className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {productos?.map((item) => (
        <div key={item.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white flex flex-col sm:flex-row p-4 gap-6 items-center w-full">
          {/* Imagen a la izquierda */}
          <div className="w-full sm:w-48 h-48 flex-shrink-0">
            <img src={item.imagen_url} alt={item.nombre} className="w-full h-full object-cover rounded-lg" />
          </div>
          
          {/* Información a la derecha */}
          <div className="flex flex-col justify-between flex-grow w-full text-left">
            <div>
              <span className="text-xs font-semibold uppercase bg-amber-100 text-amber-800 px-2 py-1 rounded">
                {item.categoria}
              </span>
              <h2 className="text-2xl font-bold mt-2 text-gray-800">{item.nombre}</h2>
              <p className="text-sm text-gray-500 mt-1">{item.origen}</p>
              <p className="text-gray-600 mt-2 text-sm max-w-xl">{item.descripcion}</p>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
              <span className="text-amber-700 font-bold text-xl">\${item.precio} USD</span>
              <Link href={`/productos/${item.slug}`} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition">
                Ver detalles del grano
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
