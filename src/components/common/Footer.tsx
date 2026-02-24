import { Link } from "react-router-dom";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-black tracking-tighter text-accent">
              HOTA
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              We Don't Post. We Position. India's creative growth agency for
              brands that want to dominate, not just exist.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              Quick Links
            </h4>
            <div className="space-y-3">
              {[
                { name: "Home", path: "/" },
                // { name: "Packages", path: "/packages" },
                { name: "Portfolio", path: "/portfolio" },
                { name: "Contact", path: "/contact" },
                { name: "Free Audit", path: "/free-audit" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-sm text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              Services
            </h4>
            <div className="space-y-3 text-sm text-text-secondary">
              <p>Social Media Management</p>
              <p>Content Creation</p>
              <p>Brand Positioning</p>
              <p>Performance Marketing</p>
              <p>Video Production</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-text-primary">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@hota.agency"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-300"
              >
                <Mail size={16} />
                hello@hota.agency
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-300"
              >
                <Phone size={16} />
                +91 98765 43210
              </a>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <MapPin size={16} />
                Mumbai, India
              </div>
              <a
                href="https://instagram.com/hota.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-300"
              >
                <Instagram size={16} />
                @hota.agency
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-text-muted">
            © {currentYear} Hota Creative Growth Agency. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Crafted with passion in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
