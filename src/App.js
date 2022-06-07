import "./App.css";

import React from "react";
import Main from "./components/Main/Main";
import { motion } from "framer-motion";

function App() {
	return (
		<motion.div layout className="container">
			<Main />
		</motion.div>
	);
}

export default App;
