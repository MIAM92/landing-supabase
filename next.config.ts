import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    cacheComponents: true,
  // partialPrefetching: true,

  // ✅ Workaround para evitar que el build se quede colgado en Vercel
  // @ts-expect-error: Propiedad no documentada en los tipos oficiales pero necesaria para Vercel
  onBuildEnd: async () => {
    setTimeout(() => process.exit(0), 0);
  },
};

export default nextConfig;