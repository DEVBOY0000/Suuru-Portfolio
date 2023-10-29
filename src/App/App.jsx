import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ParentApp from "../Components/ParentApp/ParentApp";
import Home from "../Components/Home/Home";
import CurrentProject from "../Components/CuurentProject/CuurentProject";
import UploadProject from "../Components/UploadProject/UploadProject";
import { AppContextProvider } from "../Context/AppContext";

Route;
function App() {
  return (
    <AppContextProvider>
      <Router>
        <Routes>
          <Route path="Suuru-Portfolio" element={<ParentApp />}>
            <Route path="" element={<Home />} />
            <Route path="project/:name" element={<CurrentProject />} />
            <Route path="uploadProject" element={<UploadProject />} />
          </Route>
        </Routes>
      </Router>
    </AppContextProvider>
  );
}

export default App;
