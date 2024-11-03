import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Editor } from "./Pages";
import { Components } from "./Pages/Components/Components";
import { Home } from "./Pages/Home/Home";
import { Docs } from "./Pages/Docs/Docs";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/editor" element={<Editor />} />
				<Route path="/docs" element={<Docs />} />
				<Route path="/dev/components" element={<Components />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
