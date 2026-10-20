import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';

async function ProductoContenido({ slug }: { slug: string }) {
  const supabase = getSupabase();
  const { data: producto } = await supabase.from('productos').select('*').eq('slug', slug).single();

  if (!producto) return notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 bg-white p-6 rounded-2xl border shadow-sm">
      <img src={producto.imagen_url} alt={producto.nombre} className="rounded-xl object-cover w-full h-72" />
      <div className="flex flex-col justify-between">
        <div>
          <span className="text-xs font-bold uppercase bg-amber-100 text-amber-800 px-2 py-1 rounded">{producto.categoria}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{producto.nombre}</h1>
          <p className="text-gray-500 italic text-sm">{producto.origen}</p>
          <p className="text-gray-700 mt-4 leading-relaxed">{producto.descripcion}</p>
        </div>
        <div className="mt-6 pt-4 border-t flex items-center justify-between">
          <span className="text-2xl font-bold text-amber-900">${producto.precio} USD</span>
          <button className="bg-amber-800 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-amber-900 transition">Comprar grano</button>
        </div>
      </div>
    </div>
  );
}

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="max-w-3xl mx-auto p-6 my-12">
      <Link href="/" className="text-amber-700 hover:underline">← Volver al catálogo</Link>
      <Suspense fallback={<p className="text-gray-500">Cargando producto...</p>}>
        <ProductoContenido slug={slug} />
      </Suspense>
    </div>
  );
}