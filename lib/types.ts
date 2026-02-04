export type Genre = 'Indie' | 'Pop' | 'Rock' | 'Lo-fi' | 'Folk' | 'Alternative';
export type Mood = 'Chill' | 'Sad' | 'Energetic' | 'Focus';

export interface Track {
  id: number;
  title: string;
  slug: string;
  artist: string;
  genre: Genre;
  mood: Mood;
  releaseYear: number;
  coverImage: string;
  externalLink: string;
}

export type SortOption = 'newest' | 'alphabetical';
