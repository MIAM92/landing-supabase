import Link from 'next/link';
import { Suspense } from 'react';
import { getSupabase } from '@/lib/supabase';

async function CategoriaContenido({ slug }: { slug: string }) {
  const supabase = getSupabase();
  const { data: productos } = await supabase.from('productos').select('*').eq('categoria', slug);

  return (
    <>
      {productos && productos.length > 0 ? (
        productos.map((p: any) => (
          <div key={p.id} className="p-4 border rounded-lg flex justify-between items-center bg-white shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{p.nombre}</h2>
              <p className="text-gray-500 text-sm">{p.origen} • ${p.precio} USD</p>
            </div>
            <Link href={`/productos/${p.slug}`} className="bg-amber-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-800 transition">Ver Grano</Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No se encontraron productos en esta categoría.</p>
      )}
    </>
  );
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/" className="text-amber-700 hover:underline">← Volver al inicio</Link>
      <h1 className="text-3xl font-bold capitalize mt-6 mb-6 text-amber-900">Variedades: {slug}</h1>
      <div className="grid gap-4">
        <Suspense fallback={<p className="text-gray-500">Cargando productos...</p>}>
          <CategoriaContenido slug={slug} />
        </Suspense>
      </div>
    </div>
  );
}