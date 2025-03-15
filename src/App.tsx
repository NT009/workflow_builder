import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Redirect all unknown routes to home */}
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
