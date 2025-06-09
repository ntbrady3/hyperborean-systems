import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AllProjects } from "./pages/AllProjects";
import { NotFound } from "./pages/NotFound";
import { Loading } from "./components/Loading";
import { MusicContext } from "./components/MusicContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { useState } from "react";

function App() {
  const [isMusicOn, setIsMusicOn] = useState(false);

  return (
    <MusicContext.Provider value={{ isMusicOn, setIsMusicOn }}>
      <Loading />
      <ThemeToggle />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route 
            path="/all-projects" 
            element={<AllProjects />}
            state={{ fromInternal: true }} // Pass state for internal navigation
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </MusicContext.Provider>
  );
}

export default App;