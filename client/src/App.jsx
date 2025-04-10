import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TasksPage } from "./pages/TasksPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { Navigation } from "./components/Navigation";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation searchTerm={searchTerm} onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route
            path="/tasks"
            element={<TasksPage searchTerm={searchTerm} />}
          />
          <Route path="/tasks-create" element={<TaskFormPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks/:id" element={<TaskFormPage />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
