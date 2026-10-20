# Catálogo de Café de Especialidad - Landing Page

Esta es una landing page completamente funcional y responsive construida para demostrar el dominio de aplicaciones modernas basadas en componentes de servidor, rutas dinámicas y backend serverless.

## 📝 Descripción del Proyecto
El sitio web consiste en un catálogo de cafés de especialidad de origen exclusivo (como Geisha Panamá o Bourbon Rosado de El Salvador). Consume los datos en tiempo real desde una base de datos en la nube y cuenta con dos arquitecturas de rutas dinámicas:
- `/categorias/[slug]`: Filtra y agrupa los productos según su clasificación (Premium, Tradicional).
- `/productos/[slug]`: Muestra la vista detallada, origen, descripción e imágenes de cada producto de manera individual.

## 🛠️ Tecnologías Utilizadas
- **Next.js 15+** (App Router & Server Components)
- **Supabase** (PostgreSQL Database & Row Level Security)
- **Tailwind CSS** (Diseño adaptable y estilos)
- **Vercel** (Despliegue y producción)

## 🚀 Instrucciones de Instalación Local

Siga estos pasos para ejecutar el proyecto en su entorno local:

1. **Clonar el repositorio:**
    ```bash
    git clone https://github.com
    cd landing-supabase
    ```

2. **Instalar las dependencias:**
    ```bash
    npm install
    ```

3. **Configurar las variables de entorno:**
    Cree un archivo llamado `.env.local` en la raíz del proyecto y configure sus credenciales de Supabase (ver sección abajo).

4. **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Abra [http://localhost:3000](http://localhost:3000) en su navegador para ver el resultado.

## 🔑 Variables de Entorno Necesarias

Para que la aplicación se conecte correctamente a la base de datos, configure las siguientes variables en su archivo `.env.local` local o en la sección de Environment Variables de Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_publica_aqui
```
*Nota: Las credenciales reales no han sido expuestas en este repositorio por motivos de seguridad (configuradas en el archivo `.gitignore`).*
