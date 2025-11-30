/**
 * SLOT: @analytics
 *
 * Este componente se renderiza en el slot "analytics" del layout.
 * Simula una carga de 1.5 segundos.
 */

async function getAnalytics() {
  await new Promise((r) => setTimeout(r, 1500));
  return {
    visitors: 12453,
    pageViews: 45678,
    bounceRate: '32%',
  };
}

export default async function AnalyticsSlot() {
  const data = await getAnalytics();

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-400">Visitantes</span>
        <span className="text-white font-medium">{data.visitors.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Page Views</span>
        <span className="text-white font-medium">{data.pageViews.toLocaleString()}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Bounce Rate</span>
        <span className="text-white font-medium">{data.bounceRate}</span>
      </div>
      <p className="text-xs text-gray-500 pt-2">
        ✅ Cargado después de 1.5s
      </p>
    </div>
  );
}
