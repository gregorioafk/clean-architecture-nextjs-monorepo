/**
 * LECCIÓN 12: MIDDLEWARE Y AUTENTICACIÓN
 *
 * Middleware intercepta requests antes de que lleguen a las rutas.
 */

import Link from 'next/link';

export default function MiddlewarePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">12. Middleware & Auth</h1>

      {/* ¿Qué es Middleware? */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🛡️ ¿Qué es Middleware?</h2>
        <p className="text-gray-300 mb-4">
          Middleware es código que se ejecuta ANTES de que una request llegue a tu ruta.
          Corre en el Edge Runtime (más rápido, pero con limitaciones).
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// middleware.ts (en la raíz del proyecto)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Se ejecuta para cada request que matchee el config
  console.log('Request a:', request.nextUrl.pathname);

  return NextResponse.next(); // Continúa normalmente
}

// Configura qué rutas usar middleware
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};`}
        </pre>
      </section>

      {/* Casos de uso */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">⚙️ Casos de Uso Comunes</h2>

        <div className="space-y-4">
          {/* Autenticación */}
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-yellow-400 font-medium mb-2">🔐 1. Autenticación</h3>
            <pre className="text-sm overflow-x-auto">
{`export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  // Rutas protegidas
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Redirige a login si no hay token
      return NextResponse.redirect(
        new URL('/login', request.url)
      );
    }
  }

  // Evita que usuarios logueados vean login
  if (request.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(
      new URL('/dashboard', request.url)
    );
  }

  return NextResponse.next();
}`}
            </pre>
          </div>

          {/* Internacionalización */}
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-green-400 font-medium mb-2">🌐 2. Internacionalización (i18n)</h3>
            <pre className="text-sm overflow-x-auto">
{`const locales = ['en', 'es', 'fr'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica si ya tiene locale
  const hasLocale = locales.some(
    locale => pathname.startsWith(\`/\${locale}/\`) || pathname === \`/\${locale}\`
  );

  if (!hasLocale) {
    // Detecta locale del header Accept-Language
    const acceptLang = request.headers.get('accept-language');
    const detectedLocale = acceptLang?.split(',')[0].split('-')[0] || defaultLocale;
    const locale = locales.includes(detectedLocale) ? detectedLocale : defaultLocale;

    // Redirige con locale
    return NextResponse.redirect(
      new URL(\`/\${locale}\${pathname}\`, request.url)
    );
  }
}`}
            </pre>
          </div>

          {/* Headers */}
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-purple-400 font-medium mb-2">📋 3. Headers Personalizados</h3>
            <pre className="text-sm overflow-x-auto">
{`export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Añade headers de seguridad
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Header personalizado
  response.headers.set('X-Request-Id', crypto.randomUUID());

  return response;
}`}
            </pre>
          </div>

          {/* Rate Limiting */}
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-red-400 font-medium mb-2">⏱️ 4. Rate Limiting Simple</h3>
            <pre className="text-sm overflow-x-auto">
{`// Usando cookies para rate limiting simple (no producción)
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const requests = request.cookies.get(\`rate-\${ip}\`)?.value || '0';

    if (parseInt(requests) > 100) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    const response = NextResponse.next();
    response.cookies.set(\`rate-\${ip}\`, String(parseInt(requests) + 1), {
      maxAge: 60, // Reset cada minuto
    });

    return response;
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Matcher Config */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">🎯 Configuración del Matcher</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Diferentes formas de configurar qué rutas usar middleware

export const config = {
  matcher: [
    // 1. String exacto
    '/dashboard',

    // 2. Wildcard - todas las subrutas
    '/dashboard/:path*',

    // 3. Parámetro único
    '/users/:id',

    // 4. Regex (debe empezar con /)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',

    // 5. Múltiples patrones
    '/admin/:path*',
    '/api/protected/:path*',
  ],
};

// También puedes usar condicionales en el middleware
export function middleware(request: NextRequest) {
  // Skip para assets estáticos
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('.') // archivos con extensión
  ) {
    return NextResponse.next();
  }

  // Tu lógica aquí
}`}
        </pre>
      </section>

      {/* Autenticación Completa */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">🔒 Patrón de Auth Completo</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas públicas (no requieren auth)
const publicRoutes = ['/', '/login', '/register', '/about'];

// Rutas de auth (redirigir si ya está logueado)
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtiene el token de las cookies
  const token = request.cookies.get('session')?.value;

  // Verifica si es ruta pública
  const isPublicRoute = publicRoutes.some(route =>
    pathname === route || pathname.startsWith(\`\${route}/\`)
  );

  const isAuthRoute = authRoutes.includes(pathname);

  // Si no hay token y no es ruta pública -> login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si hay token y es ruta de auth -> dashboard
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Opcional: Validar token con tu backend
  if (token) {
    try {
      // const isValid = await verifyToken(token);
      // if (!isValid) throw new Error();
    } catch {
      // Token inválido -> elimina y redirige a login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};`}
        </pre>
      </section>

      {/* Limitaciones */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4">⚠️ Limitaciones del Edge Runtime</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-red-400 font-medium mb-2">❌ NO disponible</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Node.js APIs (fs, path, etc.)</li>
              <li>• Bases de datos con drivers Node</li>
              <li>• Librerías que usen Node APIs</li>
              <li>• eval() y new Function()</li>
              <li>• Buffers grandes (&gt;25MB respuesta)</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-green-400 font-medium mb-2">✅ SÍ disponible</h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• fetch() y Web APIs</li>
              <li>• Crypto (crypto.subtle)</li>
              <li>• TextEncoder/Decoder</li>
              <li>• Headers, Request, Response</li>
              <li>• Edge-compatible DBs (Planetscale, Neon)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Auth con NextAuth */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-pink-400 mb-4">📦 Con NextAuth.js (Auth.js)</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Si usas NextAuth.js v5+, el middleware es más simple:

import { auth } from './auth'; // Tu configuración de auth

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// O usando el wrapper de NextAuth directamente:
export { auth as middleware } from './auth';`}
        </pre>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/08-intercepting-routes" className="text-gray-400 hover:text-white">
          ← Intercepting Routes
        </Link>
        <Link href="/learn/09-optimization" className="text-blue-400 hover:underline">
          Siguiente: Optimización →
        </Link>
      </div>
    </div>
  );
}
