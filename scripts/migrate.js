import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

const SRC_DIR = path.join(ROOT_DIR, 'src');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');

const DIRS_TO_CREATE = ['base', 'composite', 'sections', 'shell'];

DIRS_TO_CREATE.forEach(dir => {
  const dirPath = path.join(COMPONENTS_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Map of original relative path to new relative path (relative to components dir)
const fileMoves = {
  // UI -> Sections
  'ui/AboutSection.tsx': 'sections/AboutSection.tsx',
  'ui/CTASection.tsx': 'sections/CTASection.tsx',
  'ui/HeroSection.tsx': 'sections/HeroSection.tsx',
  'ui/ServicesSection.tsx': 'sections/ServicesSection.tsx',
  'ui/PackagesPreview.tsx': 'sections/PackagesPreview.tsx',
  'ui/PortfolioPreview.tsx': 'sections/PortfolioPreview.tsx',
  
  // UI -> Composite
  'ui/Hero3DBackground.tsx': 'composite/Hero3DBackground.tsx',
  'ui/CTA3DBackground.tsx': 'composite/CTA3DBackground.tsx',
  'ui/GrowthVisualization3D.tsx': 'composite/GrowthVisualization3D.tsx',
  'ui/Interactive3DCard.tsx': 'composite/Interactive3DCard.tsx',
  'ui/Package3DIcon.tsx': 'composite/Package3DIcon.tsx',
  'ui/Portfolio3DHover.tsx': 'composite/Portfolio3DHover.tsx',
  'ui/HomeCTAButton.tsx': 'composite/HomeCTAButton.tsx',
  'ui/interactive-hover-button.tsx': 'composite/interactive-hover-button.tsx',
  
  // UI -> Shell
  'ui/tube-light-navbar.tsx': 'shell/tube-light-navbar.tsx',
  'ui/footer-section.tsx': 'shell/footer-section.tsx',
  
  // UI -> Base
  'ui/button.tsx': 'base/button.tsx',
  'ui/card.tsx': 'base/card.tsx',
  'ui/checkbox.tsx': 'base/checkbox.tsx',
  'ui/input.tsx': 'base/input.tsx',
  'ui/label.tsx': 'base/label.tsx',
  'ui/switch.tsx': 'base/switch.tsx',
  'ui/tabs.tsx': 'base/tabs.tsx',
  'ui/textarea.tsx': 'base/textarea.tsx',
  'ui/tooltip.tsx': 'base/tooltip.tsx',

  // Common -> Shell
  'common/Navbar.tsx': 'shell/Navbar.tsx',
  'common/Footer.tsx': 'shell/Footer.tsx',
  'common/CustomCursor.tsx': 'shell/CustomCursor.tsx',
  'common/WhatsAppFAB.tsx': 'shell/WhatsAppFAB.tsx',
  'common/SEO.tsx': 'shell/SEO.tsx',
  
  // Common -> Composite
  'common/LottieAnimation.tsx': 'composite/LottieAnimation.tsx',
};

// Actually move the files
for (const [oldPath, newPath] of Object.entries(fileMoves)) {
  const oldFullPath = path.join(COMPONENTS_DIR, oldPath);
  const newFullPath = path.join(COMPONENTS_DIR, newPath);
  if (fs.existsSync(oldFullPath)) {
    fs.renameSync(oldFullPath, newFullPath);
    console.log(`Moved ${oldPath} to ${newPath}`);
  }
}

// Function to get all TS/TSX files
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllFiles(SRC_DIR);

// Update imports in all files
allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf-8');
  let hasChanges = false;

  for (const [oldPath, newPath] of Object.entries(fileMoves)) {
    const oldImport1 = `@/components/${oldPath.replace('.tsx', '')}`;
    const newImport1 = `@/components/${newPath.replace('.tsx', '')}`;
    
    if (content.includes(oldImport1)) {
      content = content.split(oldImport1).join(newImport1);
      hasChanges = true;
    }
    
    // Also handle relative imports if any (naively, just look for the file name)
    // Very naive, but standard absolute imports `@/` are most common in this codebase
  }

  // Handle components/ui to components/base generic replace
  if (content.includes('@/components/ui/')) {
     content = content.split('@/components/ui/').join('@/components/base/');
     hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log(`Updated imports in ${path.relative(SRC_DIR, file)}`);
  }
});

// Update components.json
const componentsJsonPath = path.join(__dirname, 'components.json');
if (fs.existsSync(componentsJsonPath)) {
  let cJson = fs.readFileSync(componentsJsonPath, 'utf8');
  cJson = cJson.replace('"ui": "@/components/ui"', '"ui": "@/components/base"');
  fs.writeFileSync(componentsJsonPath, cJson, 'utf8');
  console.log('Updated components.json');
}

// Update components/index.ts to reflect any necessary re-exports (if it exports these)
// It's probably easier to just let eslint/tsc catch index.ts errors, or we can clear it/fix it manually
console.log('Migration complete. Run tsc to check for errors.');
