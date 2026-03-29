import { cn } from "@/lib/utils";
import { Button } from "@/components/base/button";

export type AdminSidebarSection = "posts" | "authors" | "categories" | "tags";

type AdminSidebarItem = {
  key: AdminSidebarSection;
  label: string;
};

type AdminSidebarProps = {
  items: AdminSidebarItem[];
  activeSection: AdminSidebarSection;
  onSectionChange: (section: AdminSidebarSection) => void;
};

export default function AdminSidebar({
  items,
  activeSection,
  onSectionChange,
}: AdminSidebarProps) {
  return (
    <aside className="rounded-2xl border border-border/70 bg-bg-secondary/80 p-4 shadow-lg backdrop-blur-sm">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-text-muted">
        CMS Sections
      </p>
      <nav aria-label="Admin sections" className="space-y-2">
        {items.map((item) => {
          const isActive = activeSection === item.key;
          return (
            <Button
              key={item.key}
              type="button"
              variant={isActive ? "default" : "outline"}
              className={cn(
                "w-full justify-start rounded-xl",
                isActive
                  ? "bg-accent text-black hover:bg-accent/90"
                  : "border-border bg-transparent text-text-secondary hover:border-accent hover:text-text-primary",
              )}
              aria-current={isActive ? "page" : undefined}
              onClick={() => onSectionChange(item.key)}
            >
              {item.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
