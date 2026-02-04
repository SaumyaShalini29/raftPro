'use client';

import { ChangeEvent } from 'react';
import { Genre, Mood, SortOption } from '@/lib/types';

interface FiltersProps {
  genres: string[];
  moods: string[];
  selectedGenres: Set<string>;
  selectedMoods: Set<string>;
  sortBy: SortOption;
  onGenreChange: (genre: string, checked: boolean) => void;
  onMoodChange: (mood: string, checked: boolean) => void;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
}

export function Filters({
  genres,
  moods,
  selectedGenres,
  selectedMoods,
  sortBy,
  onGenreChange,
  onMoodChange,
  onSortChange,
  onReset,
}: FiltersProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-slate-700">
      {/* Filters Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </h2>
        {(selectedGenres.size > 0 || selectedMoods.size > 0) && (
          <button
            onClick={onReset}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Genre Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Genre
        </h3>
        <div className="space-y-2">
          {genres.map((genre) => (
            <label key={genre} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGenres.has(genre)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onGenreChange(genre, e.target.checked)
                }
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:focus:ring-blue-400 cursor-pointer"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{genre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Mood Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Mood
        </h3>
        <div className="space-y-2">
          {moods.map((mood) => (
            <label key={mood} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedMoods.has(mood)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onMoodChange(mood, e.target.checked)
                }
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:focus:ring-blue-400 cursor-pointer"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{mood}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Sort By
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="newest"
              checked={sortBy === 'newest'}
              onChange={() => onSortChange('newest')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:focus:ring-blue-400 cursor-pointer"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Newest First
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="alphabetical"
              checked={sortBy === 'alphabetical'}
              onChange={() => onSortChange('alphabetical')}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:focus:ring-blue-400 cursor-pointer"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Alphabetical (A–Z)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
