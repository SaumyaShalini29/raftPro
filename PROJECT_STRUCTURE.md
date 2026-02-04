# Indie Music Directory

## Project Structure
- **/app**: Contains the main application files.
- **/public**: Static assets like images.
- **/styles**: Global styles and Tailwind configuration.
- **/data**: Static JSON dataset for music tracks.

## Data Model
Each track in the dataset will have the following structure:
```json
{
  "id": "1",
  "title": "Song Title",
  "slug": "song-title",
  "artist": "Artist Name",
  "genre": "Indie",
  "mood": "Chill",
  "releaseYear": 2023,
  "coverImage": "url_to_image",
  "externalLink": "url_to_spotify_or_youtube"
}
```

## Implementation Steps
1. **Create the dataset**: Generate a static JSON file with music tracks.
2. **Implement pages**: Create the Home, Song Listing, Song Detail, and derived pages using Next.js App Router.
3. **Apply Tailwind CSS**: Style the application for a clean and modern look.
4. **SEO Optimization**: Ensure all pages are SEO-friendly with proper metadata.
5. **Deployment**: Deploy the application on Vercel.

## AI Usage Documentation
- **Dataset Generation**: Use AI tools to create and clean the dataset.
- **Page Scaffolding**: Use AI to scaffold Next.js pages and components.
- **Design Inspiration**: Use AI to gather layout and design ideas.

## Example AI Prompts
1. "Generate a static JSON dataset for indie music tracks with specified fields."
2. "Create a Next.js page structure for a music directory application."
3. "Suggest Tailwind CSS styles for a modern music listing card."