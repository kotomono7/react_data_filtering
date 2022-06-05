import { React, useEffect, useState } from "react"
import Filter from "../Filter/Filter";
import Movie from "../Movie/Movie";
import { motion, AnimatePresence } from "framer-motion"

export default function Main() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    const movieData = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=5aaa51cf2004e308459876ae13cfe4f1&language=en-US&page=1"
    );    
    const popularMovies = await movieData.json();
    console.log(popularMovies);

    setPopular(popularMovies.results);
    setFiltered(popularMovies.results);
  }

  return (
    <>
      <Filter 
        popular={popular} 
        setFiltered={setFiltered} 
        activeGenre={activeGenre} 
        setActiveGenre={setActiveGenre} 
      />

      <motion.div layout className="popular-movies">
          <AnimatePresence>
            {
              filtered.map((movie) => {
                return (
                  <Movie key={movie.id} movie={movie} />
                )
              })
            }
          </AnimatePresence>
      </motion.div>
    </>
  )
}
