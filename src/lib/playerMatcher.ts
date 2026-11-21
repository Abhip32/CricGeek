/**
 * Robust cricket player name matcher to resolve headshot images from squads/rosters
 */
export interface MatchedPlayer {
  name: string;
  image?: string | null;
  role?: string;
  captain?: boolean;
  wicketkeeper?: boolean;
  id?: string | null;
}

export function findPlayerInSquads(
  playerName: string,
  squads?: Record<string, any> | null
): MatchedPlayer | null {
  if (!squads || !playerName) return null;

  // Clean the player name
  const raw = playerName
    .replace(/\s*\(c\)/i, '')
    .replace(/\s*†/g, '')
    .replace(/\s*\(wk\)/i, '')
    .replace(/►/g, '')
    .trim();

  const cleanLower = raw.toLowerCase();

  const allPlayers: MatchedPlayer[] = [];

  const addCandidate = (item: any) => {
    if (!item || !item.name) return;
    allPlayers.push({
      name: item.name,
      id: item.id ? String(item.id) : null,
      image: item.image || item.headshot || null,
      role: item.role || item.position || '',
      captain: item.captain || false,
      wicketkeeper: item.wicketkeeper || item.keeper || false,
    });
  };

  Object.values(squads).forEach((list: any) => {
    if (Array.isArray(list)) {
      list.forEach(addCandidate);
    } else if (list && typeof list === 'object') {
      if (Array.isArray(list.playingXI)) list.playingXI.forEach(addCandidate);
      if (Array.isArray(list.bench)) list.bench.forEach(addCandidate);
      if (Array.isArray(list.players)) list.players.forEach(addCandidate);
      if (Array.isArray(list.starters)) list.starters.forEach(addCandidate);
    }
  });

  if (allPlayers.length === 0) return null;

  // 1. Exact match on clean name
  let found = allPlayers.find(
    (p) => (p.name || '').trim().toLowerCase() === cleanLower
  );
  if (found) return found;

  // 2. Match on last name / surname (e.g. "Daryl Mitchell" -> "Mitchell", "JB Ozukum" -> "Ozukum")
  const parts = cleanLower.split(/\s+/).filter(Boolean);
  const lastName = parts[parts.length - 1];

  if (lastName && lastName.length >= 3) {
    found = allPlayers.find((p) => {
      const pLower = (p.name || '').toLowerCase();
      const pParts = pLower.split(/\s+/).filter(Boolean);
      const pLast = pParts[pParts.length - 1];
      return pLast === lastName || pLower.includes(lastName);
    });
    if (found) return found;
  }

  // 3. Fallback: startsWith on last name
  if (lastName && lastName.length >= 3) {
    found = allPlayers.find((p) => (p.name || '').toLowerCase().startsWith(cleanLower.split(/\s+/)[0]));
    if (found) return found;
  }

  return null;
}
