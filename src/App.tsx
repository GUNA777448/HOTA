import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts";
import {
  HomePage,
  ServicesPage,
  PackagesPage,
  PortfolioPage,
  ContactPage,
  FreeAuditPage,
} from "@/pages";
import { ROUTES } from "@/routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.PACKAGES} element={<PackagesPage />} />
          <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
          <Route path={ROUTES.FREE_AUDIT} element={<FreeAuditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
