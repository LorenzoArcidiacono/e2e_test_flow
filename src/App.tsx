import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Editor } from "./Pages";
import { Components } from "./Pages/Components/Components";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Editor />} />
				<Route path="/dev/components" element={<Components />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
