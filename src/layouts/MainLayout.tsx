import { Outlet } from "react-router-dom";
import Navbar from "@/components/shell/Navbar";
import Footer from "@/components/shell/Footer";
import WhatsAppFAB from "@/components/shell/WhatsAppFAB";
// import CustomCursor from "@/components/shell/CustomCursor";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <CustomCursor /> */}
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
