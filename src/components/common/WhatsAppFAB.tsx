import { MessageCircle } from "lucide-react";

export default function WhatsAppFAB() {
  const phoneNumber = "919876543210"; // Indian format without +
  const message = encodeURIComponent(
    "Hi! I'm interested in Hota's services. Can we discuss?",
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-glow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
}
