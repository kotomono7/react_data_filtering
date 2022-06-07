import React, { useEffect, useState, useRef } from "react";
import Filter from "../Filter/Filter";
import Movie from "../Movie/Movie";
import { motion, AnimatePresence } from "framer-motion";

export default function Main() {
	const [popular, setPopular] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [activeGenre, setActiveGenre] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const fetchPopularMovies = useRef(() => {});

	fetchPopularMovies.current = async (pageNumber) => {
		if (pageNumber === undefined) return;

		const movieData = await fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=5aaa51cf2004e308459876ae13cfe4f1&language=en-US&page=${pageNumber}`
		);
		const popularMovies = await movieData.json();

		const newPopularMovies = [...popular, ...popularMovies.results];

		setPopular(newPopularMovies);
		setFiltered(newPopularMovies);
	};

	useEffect(() => {
		fetchPopularMovies.current(pageNumber);
		// console.log("Current page: " + pageNumber);
	}, [pageNumber]);

	return (
		<>
			<Filter
				popular={popular}
				setFiltered={setFiltered}
				activeGenre={activeGenre}
				setActiveGenre={setActiveGenre}
			/>

			<motion.div layout="true" className="popular-movies">
				<AnimatePresence>
					{filtered.map((movie, index) => {
						return <Movie key={index} movie={movie} />;
					})}
				</AnimatePresence>
			</motion.div>

			<motion.div layout className="loadmore-container">
				<button
					onClick={() => {
						fetchPopularMovies.current(pageNumber);
						setPageNumber((pageNumber) => pageNumber + 1);
					}}
				>
					Load More
				</button>
			</motion.div>
		</>
	);
}
