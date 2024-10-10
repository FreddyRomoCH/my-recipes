import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SearchProvider } from "./context/searchContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SearchProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </SearchProvider>
  </BrowserRouter>
);
