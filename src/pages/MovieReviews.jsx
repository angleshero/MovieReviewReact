import React, { useMemo, useState } from 'react'
import './styles.css'


import beforeSunrise from './assets/BeforeSunrise.jpg'
import bigFish from './assets/big-fish.jpg'
import ghostDog from './assets/ghostdog.jpg'
import mallrats from './assets/Mallrats.jpg'
import meteorMan from './assets/MeteorMan.jpg'
import bigHero6 from './assets/BigHero6.jpg'


const MOVIES = [
  { id: 1, title: 'Before Sunrise', img: beforeSunrise, year: 1995, rating: 4.5 },
  { id: 2, title: 'Big Fish',       img: bigFish,       year: 2003, rating: 4.5 },
  { id: 3, title: 'Ghost Dog',      img: ghostDog,      year: 1999, rating: 4.5 },
  { id: 4, title: 'Mallrats',       img: mallrats,      year: 1995, rating: 4.5 },
  { id: 5, title: 'Meteor Man',     img: meteorMan,     year: 1993, rating: 4.5 },
  { id: 6, title: 'Big Hero 6',     img: bigHero6,      year: 2014, rating: 4.5 },
]

function Stars({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="movie__ratings">
      {Array.from({ length: full }).map((_, i) => (
        <i key={`full-${i}`} className="fas fa-star" aria-hidden="true"></i>
      ))}
      {half && <i className="fas fa-star-half-alt" aria-hidden="true"></i>}
    </div>
  )
}

function MovieCard({ movie }) {
  return (
    <div className="movie">
      <figure className="movie__img--wrapper">
        <img className="movie__img" src={movie.img} alt={movie.title} />
      </figure>
      <div className="movie__title">{movie.title}</div>
      <Stars rating={movie.rating} />
    </div>
  )
}

export default function MovieReviews() {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')

  const filteredAndSorted = useMemo(() => {
    const list = MOVIES.filter(m =>
      m.title.toLowerCase().includes(query.trim().toLowerCase())
    )
    return list.sort((a, b) =>
      sort === 'newest' ? b.year - a.year : a.year - b.year
    )
  }, [query, sort])

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
          />
          <button>Home</button>
          <button>Contact</button>
          <button>Sign Up</button>

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
        <div className="movies">
          {filteredAndSorted.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>

      <footer>
        <button>Contact</button>
        <button>Reviews</button>
        <p>
          <span className="copyright"> Copyright 2025 ©</span> Movie Reviews NOW!
        </p>
      </footer>
    </>
  )
}

