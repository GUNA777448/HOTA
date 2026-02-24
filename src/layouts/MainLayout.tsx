import { Outlet } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WhatsAppFAB from "@/components/common/WhatsAppFAB";
import CustomCursor from "@/components/common/CustomCursor";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
