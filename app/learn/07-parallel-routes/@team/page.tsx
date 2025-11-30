/**
 * SLOT: @team
 *
 * Este componente se renderiza en el slot "team" del layout.
 * Simula una carga de 2.5 segundos.
 */

async function getTeam() {
  await new Promise((r) => setTimeout(r, 2500));
  return [
    { id: 1, name: 'Ana García', role: 'Developer' },
    { id: 2, name: 'Carlos López', role: 'Designer' },
    { id: 3, name: 'María Torres', role: 'PM' },
  ];
}

export default async function TeamSlot() {
  const team = await getTeam();

  return (
    <div className="space-y-3">
      {team.map((member) => (
        <div key={member.id} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm">
            {member.name[0]}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{member.name}</p>
            <p className="text-gray-500 text-xs">{member.role}</p>
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-500 pt-2">
        ✅ Cargado después de 2.5s
      </p>
    </div>
  );
}
