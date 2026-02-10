import React, { useState, useMemo } from 'react';

function Movies() {



const moviesWrapper = document.querySelector (".movies")
const searchName = document.querySelector (".searchName")

console.log (moviesWrapper)



function searchChange(event) {
     renderMovies(event.target.value)  
     searchName.innerHTML = event.target.value    
}

let currentMovies = [];

//rendering movies 

async function renderMovies(searchTerm) {

const response = await fetch (`https://www.omdbapi.com/?s=${searchTerm}&apikey=21463539&s`);
const data = await response.json();
currentMovies = data.Search;
displayMovies(currentMovies);

}


//displaying movies 

function displayMovies(movieList) {
     moviesWrapper.innerHTML = movieList.slice(0, 6).map((movie) => {
    return `
    <div class="movie">
    <img src=${movie.Poster} alt="" />
    <h2>${movie.Title}</h2>
    <h4>${movie.Year}</h4>
    <button>Learn More</button>
    </div> 
    `
       ;
    }).join ('');
}


//sorting movies


function sortChange(event) {
    const sortOption = event.target.value;

    let sortedMovies = [...currentMovies];

    if (sortOption === "newest") {
        sortedMovies.sort((a, b) => b.Year - a.Year);
    } else if (sortOption === "oldest") {
        sortedMovies.sort((a, b) => a.Year - b.Year);
}
displayMovies(sortedMovies);

}}

export default Movies;