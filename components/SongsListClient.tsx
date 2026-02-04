'use client';

import { useState, useMemo } from 'react';
import { Track, SortOption } from '@/lib/types';
import { SongCard } from '@/components/SongCard';
import { SearchInput } from '@/components/SearchInput';
import { Filters } from '@/components/Filters';

interface SongsListClientProps {
  tracks: Track[];
  genres: string[];
  moods: string[];
}

export function SongsListClient({ tracks, genres, moods }: SongsListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const [selectedMoods, setSelectedMoods] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const filteredAndSortedTracks = useMemo(() => {
    let filtered = tracks.filter((track) => {
      // Search filter
      const matchesSearch =
        searchQuery === '' ||
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase());

      // Genre filter
      const matchesGenre =
        selectedGenres.size === 0 || selectedGenres.has(track.genre);

      // Mood filter
      const matchesMood = selectedMoods.size === 0 || selectedMoods.has(track.mood);

      return matchesSearch && matchesGenre && matchesMood;
    });

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (sortBy === 'alphabetical') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [tracks, searchQuery, selectedGenres, selectedMoods, sortBy]);

  const handleGenreChange = (genre: string, checked: boolean) => {
    const newGenres = new Set(selectedGenres);
    if (checked) {
      newGenres.add(genre);
    } else {
      newGenres.delete(genre);
    }
    setSelectedGenres(newGenres);
  };

  const handleMoodChange = (mood: string, checked: boolean) => {
    const newMoods = new Set(selectedMoods);
    if (checked) {
      newMoods.add(mood);
    } else {
      newMoods.delete(mood);
    }
    setSelectedMoods(newMoods);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedGenres(new Set());
    setSelectedMoods(new Set());
    setSortBy('newest');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar - Filters */}
      <aside className="lg:col-span-1">
        <div className="sticky top-24">
          <Filters
            genres={genres}
            moods={moods}
            selectedGenres={selectedGenres}
            selectedMoods={selectedMoods}
            sortBy={sortBy}
            onGenreChange={handleGenreChange}
            onMoodChange={handleMoodChange}
            onSortChange={setSortBy}
            onReset={handleReset}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-3">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold">{filteredAndSortedTracks.length}</span> of{' '}
            <span className="font-semibold">{tracks.length}</span> tracks
          </p>
        </div>

        {/* Songs Grid */}
        {filteredAndSortedTracks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedTracks.map((track) => (
              <SongCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <svg
              className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tracks found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Try adjusting your search or filters
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
