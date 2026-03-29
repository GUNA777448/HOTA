import { MessageCircle } from "lucide-react";
import { socialLinks } from "@/constants";

export default function WhatsAppFAB() {
  return (
    <a
      href={socialLinks.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
}
