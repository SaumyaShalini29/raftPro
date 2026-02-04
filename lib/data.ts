export async function getTracks() {
  try {
    const tracks = await import('@/data/tracks.json');
    return tracks.default;
  } catch (error) {
    console.error('Error loading tracks:', error);
    return [];
  }
}

export async function getTrackBySlug(slug: string) {
  const tracks = await getTracks();
  return tracks.find((track: any) => track.slug === slug);
}

export function getUniqueGenres(tracks: any[]) {
  return Array.from(new Set(tracks.map((track: any) => track.genre))).sort();
}

export function getUniqueMoods(tracks: any[]) {
  return Array.from(new Set(tracks.map((track: any) => track.mood))).sort();
}
