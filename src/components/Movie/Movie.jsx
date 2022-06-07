import React from "react";
import { motion } from "framer-motion";

export default function Movie({ movie }) {
	return (
		<motion.div
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			layout="true"
			className="movie-items"
		>
			<motion.div layout="true" className="title">
				<h5>{movie.title}</h5>
			</motion.div>
			<motion.div layout="true" className="image">
				<img
					src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
					alt={movie.title}
				/>
			</motion.div>
		</motion.div>
	);
}
