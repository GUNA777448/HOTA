# HOTA - Creative Growth Agency Website

> **"We Don't Post. We Position."**

A modern, immersive website for HOTA Creative Growth Agency - a premium digital agency specializing in content creation, brand positioning, and full-scale digital growth strategies for startups, e-commerce brands, and scaling businesses across India.

## 🎯 Project Overview

HOTA's website is built to attract mid-to-premium tier clients (₹50K - ₹3L+ monthly budgets) through a stunning dark-themed interface with cutting-edge 3D elements, smooth animations, and conversion-focused design.

### Key Business Goals

- Showcase premium creative services and positioning strategies
- Generate qualified leads through free brand audit offering
- Display portfolio and case studies
- Provide seamless inquiry channels (WhatsApp, Instagram, Contact Form)
- Establish credibility and premium brand perception

## ✨ Features

### 🎨 Visual & Interactive

- **3D Elements**: Interactive Three.js components throughout the site
  - Particle systems and floating geometry in hero section
  - 3D growth visualization charts
  - Hover-activated 3D effects on service cards
  - Animated 3D crown icons for package tiers
  - Portfolio hover effects with 3D icosahedrons
  - Immersive CTA backgrounds with animated rings
- **Lottie Animations**: Smooth, professional animations in key sections
- **Dark Theme**: Elegant dark mode with accent color highlighting
- **Custom Cursor**: Enhanced user experience with custom cursor (optional)
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop

### 📄 Pages & Sections

- **Home**: Hero, About, Services, Portfolio Preview, CTA
- **Portfolio**: Full gallery of social creatives, videos, and branding work
- **Free Audit**: Lead magnet with comprehensive business audit form
- **Contact**: Multi-channel contact options with form integration

### 🔧 Technical Features

- Type-safe TypeScript implementation
- Component-based architecture
- Path aliases for clean imports (`@/components`)
- React Router for seamless navigation
- Optimized build with Vite
- TailwindCSS 4 for utility-first styling

## 🛠️ Tech Stack

### Core

- **React 19.2.0** - Latest React with improved performance
- **TypeScript 5.9** - Type safety and developer experience
- **Vite 7.3.1** - Lightning-fast build tool and dev server

### Styling & UI

- **TailwindCSS 4.2.1** - Utility-first CSS framework
- **Lucide React 0.575** - Beautiful icon library
- **Lottie React 2.4.1** - Smooth animation rendering

### 3D & Animation

- **Three.js 0.183.1** - WebGL 3D graphics library
- **@react-three/fiber 9.5.0** - React renderer for Three.js
- **@react-three/drei 10.7.7** - Helper components for 3D scenes

### Routing

- **React Router DOM 7.13.1** - Client-side routing

## 📋 Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **npm** or **yarn** package manager
- Modern web browser with WebGL support

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd HOTA
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173`
   - Hot Module Replacement (HMR) is enabled for instant feedback

## 📜 Available Scripts

| Command           | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start development server with HMR on `localhost:5173` |
| `npm run build`   | Build for production (outputs to `/dist`)             |
| `npm run preview` | Preview production build locally                      |
| `npm run lint`    | Run ESLint to check code quality                      |

## 📁 Project Structure

```
HOTA/
├── docs/                       # Project documentation
│   └── prd.md                 # Product Requirements Document
├── public/                     # Static assets
├── src/
│   ├── assets/                # Images, animations, and media
│   │   ├── cuate.png         # Hero illustration
│   │   └── Digital Marketing.json  # Lottie animation
│   ├── components/
│   │   ├── common/           # Reusable components
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── WhatsAppFAB.tsx
│   │   └── ui/               # Page-specific components
│   │       ├── HeroSection.tsx
│   │       ├── AboutSection.tsx
│   │       ├── ServicesSection.tsx
│   │       ├── PortfolioPreview.tsx
│   │       ├── CTASection.tsx
│   │       ├── Hero3DBackground.tsx
│   │       ├── GrowthVisualization3D.tsx
│   │       ├── Interactive3DCard.tsx
│   │       ├── Package3DIcon.tsx
│   │       ├── Portfolio3DHover.tsx
│   │       └── CTA3DBackground.tsx
│   ├── config/               # App configuration
│   ├── constants/            # Constants and enums
│   ├── controllers/          # Business logic
│   ├── helpers/              # Utility functions
│   ├── hooks/                # Custom React hooks
│   ├── interfaces/           # TypeScript interfaces
│   ├── layouts/              # Layout components
│   │   └── MainLayout.tsx
│   ├── models/               # Data models
│   ├── pages/                # Route pages
│   │   ├── HomePage.tsx
│   │   ├── PortfolioPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── FreeAuditPage.tsx
│   ├── routes/               # Routing configuration
│   ├── services/             # API services
│   ├── store/                # State management
│   ├── styles/               # Global styles
│   │   ├── App.css
│   │   └── index.css
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Root component
│   └── main.tsx              # Entry point
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── README.md                 # This file
```

## 🎨 Design System

### Color Palette

- **Background**: `#0a0a0a` (Primary), `#0f0f0f` (Secondary)
- **Accent**: `#FFEB3B` (Yellow/Gold) - Used for CTAs, highlights, and important elements
- **Text**: White primary, gray secondary, muted variations
- **Borders**: Subtle dark borders with accent highlights on hover

### Typography

- **Font**: System font stack for optimal performance
- **Scale**: 5xl-8xl for headlines, xl-2xl for subheadings, base-lg for body

### Components

- **Buttons**: Rounded-full design with hover scale effects
- **Cards**: Dark backgrounds with border highlights and hover transitions
- **3D Elements**: Low-poly geometric shapes with wireframe aesthetics

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

**Note**: WebGL support is required for 3D features. The site gracefully handles browsers without WebGL by hiding 3D components.

## 🔧 Configuration

### Path Aliases

The project uses `@/` as an alias for the `src/` directory:

```typescript
import Component from "@/components/ui/Component";
// Instead of: import Component from '../../components/ui/Component'
```

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
VITE_API_URL=your_api_url
VITE_WHATSAPP_NUMBER=your_whatsapp_number
```

## 🏗️ Build & Deployment

### Production Build

```bash
npm run build
```

- Output directory: `/dist`
- Optimized and minified assets
- Tree-shaking for minimal bundle size
- Code splitting for better performance

### Preview Production Build

```bash
npm run preview
```

### Deployment Options

- **Vercel**: Zero-config deployment (recommended)
- **Netlify**: Drag-and-drop or Git integration
- **GitHub Pages**: Static hosting with Actions
- **Custom Server**: Serve the `/dist` folder

## 🤝 Contributing

This is a private client project. For any questions or contributions, please contact the development team.

## 📄 License

Proprietary - All rights reserved by HOTA Creative Growth Agency

## 📞 Contact

- **Website**: [Your Website URL]
- **Email**: [Your Email]
- **WhatsApp**: [Your WhatsApp Number]
- **Instagram**: [Your Instagram Handle]

---

**Built with ❤️ for HOTA Creative Growth Agency**
