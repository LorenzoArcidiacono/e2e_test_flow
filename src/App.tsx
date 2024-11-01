import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Editor } from "./Pages";
import { Components } from "./Pages/Components/Components";
import { Home } from "./Pages/Home/Home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/editor" element={<Editor />} />
				<Route path="/dev/components" element={<Components />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
