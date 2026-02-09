
import React, { useMemo, useState } from 'react'
import './styles.css'

// Dynamically import all images in src/assets (Vite feature)
const imageMap = Object.fromEntries(
  Object.entries(import.meta.glob('./assets/*.{png,jpg,jpeg,webp,svg}', { eager: true }))
    .map(([path, mod]) => {
      const fileName = path.split('/').pop() 
      return [fileName.toLowerCase(), mod.default]
    })
)

// Helper to resolve an image by filename (case-insensitive)
function resolveImg(fileName, fallback = null) {
  if (!fileName) return fallback
  return imageMap[fileName.toLowerCase()] ?? fallback
}

// You can move this to a separate file or fetch from an API
const MOVIES = [
  { id: 1, title: 'Before Sunrise', cover: 'before-sunrise.jpg', year: 1995, rating: 4.5 },
  { id: 2, title: 'Big Fish',       cover: 'bigfish.jpg',        year: 2003, rating: 4.5 },
  { id: 3, title: 'Ghost Dog',      cover: 'ghostdog.jpg',       year: 1999, rating: 4.5 },
  { id: 4, title: 'Mallrats',       cover: 'Mallrats.jpg',       year: 1995, rating: 4.5 },
  { id: 5, title: 'Meteor Man',     cover: 'MeteorMan.jpg',      year: 1993, rating: 4.5 },
  { id: 6, title: 'Big Hero 6',     cover: 'BigHero6.jpg',       year: 2014, rating: 4.5 },
]

function Stars({ rating = 0, outOf = 5 }) {
  const full = Math.max(0, Math.min(outOf, Math.floor(rating)))
  const half = rating % 1 >= 0.5
  const empty = outOf - full - (half ? 1 : 0)

  return (
    <div className="movie__ratings" aria-label={`Rating: ${rating} out of ${outOf}`}>
      {Array.from({ length: full }).map((_, i) => (
        <i key={`full-${i}`} className="fas fa-star" aria-hidden="true" />
      ))}
      {half && <i className="fas fa-star-half-alt" aria-hidden="true" />}
      {Array.from({ length: empty }).map((_, i) => (
        <i key={`empty-${i}`} className="far fa-star" aria-hidden="true" />
      ))}
    </div>
  )
}

function MovieCard({ movie }) {
  const { title, year, rating, cover } = movie
  const imgSrc = resolveImg(cover)
  return (
    <div className="movie">
      <figure className="movie__img--wrapper">
        {imgSrc ? (
          <img className="movie__img" src={imgSrc} alt={title} loading="lazy" />
        ) : (
          <div className="movie__img movie__img--placeholder" aria-label={`${title} cover missing`}>
            No Image
          </div>
        )}
      </figure>
      <div className="movie__title">{title}</div>
      <Stars rating={rating} />
      <div className="movie__meta" aria-label="metadata">
        <small>{year}</small>
      </div>
    </div>
  )
}

export default function MovieReviews({
  initialMovies = MOVIES,
  initialSort = 'newest', // 'newest' | 'oldest'
}) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState(initialSort)

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase()
    const byTitle = (m) => m.title?.toLowerCase().includes(q)

    // shallow copy before sorting to avoid mutating props/const
    const list = (q ? initialMovies.filter(byTitle) : initialMovies).slice()

    const compare = (a, b) => {
      // stable comparator: primary by year, secondary by title to avoid jitter
      if (sort === 'newest') {
        if (b.year !== a.year) return b.year - a.year
      } else {
        if (a.year !== b.year) return a.year - b.year
      }
      return a.title.localeCompare(b.title)
    }

    return list.sort(compare)
  }, [initialMovies, query, sort])

  return (
    <>
      <header>
        <h1 className="site-title">Movie Reviews NOW!</h1>
        <nav>
          <input
            type="text"
            placeholder="Search movies"
            className="searchName"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search movies"
          />
          <button type="button">Home</button>
          <button type="button">Contact</button>
          <button type="button">Sign Up</button>

          <div className="sort-container">
            <label htmlFor="movieSort" className="sr-only">Sort</label>
            <select
              name="movieSort"
              id="movieSort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest to Oldest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </nav>
      </header>

      <main>
        {filteredAndSorted.length === 0 ? (
          <p className="empty-state">No movies match “{query}”.</p>
        ) : (
          <div className="movies">
            {filteredAndSorted.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </main>

      <footer>
        <button type="button">Contact</button>
        <button type="button">Reviews</button>
        <p>
          <span className="copyright"> Copyright 2025 ©</span> Movie Reviews NOW!
        </p>
      </footer>
    </>
  )
}
