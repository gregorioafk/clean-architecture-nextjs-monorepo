/**
 * DEMO: useRouter para navegación programática
 */
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function NavigationDemo() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="space-y-4">
      {/* Información actual */}
      <div className="bg-gray-900 p-3 rounded text-sm">
        <p className="text-gray-400">
          Pathname: <span className="text-white">{pathname}</span>
        </p>
        <p className="text-gray-400">
          Search: <span className="text-white">{searchParams.toString() || '(vacío)'}</span>
        </p>
      </div>

      {/* Botones de navegación */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => router.push('/learn')}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
        >
          router.push(&apos;/learn&apos;)
        </button>

        <button
          onClick={() => router.back()}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm"
        >
          router.back()
        </button>

        <button
          onClick={() => router.refresh()}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
        >
          router.refresh()
        </button>

        <button
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            params.set('test', Date.now().toString());
            router.push(`${pathname}?${params.toString()}`);
          }}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm"
        >
          Agregar query param
        </button>
      </div>
    </div>
  );
}
