import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layouts/Layout";
import CreatePage from "./pages/CreatePage";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import NotFound from "./pages/NotFoundPage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ListPage />} />
            <Route path="/post/:id" element={<DetailPage />} />
            <Route path="/post/:id/update" element={<EditPage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
