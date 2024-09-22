import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SearchProvider } from "./context/searchContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SearchProvider>
      <App />
    </SearchProvider>
  </BrowserRouter>
);
