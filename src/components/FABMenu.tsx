import {
  FolderOpen,
  Home,
  Menu,
  MessageCircle,
  User,
  Wrench,
  X,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { MenuItem } from "@/types";
import { useClickOutside, useScrollTo } from "@/hooks/hooks";

const MENU_ITEMS: MenuItem[] = [
  { id: "hero", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "contact", label: "Contact", icon: MessageCircle },
];

export const FABMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);
  const scrollTo = useScrollTo();

  const closeMenu = useCallback(() => setIsOpen(false), []);
  useClickOutside(fabRef, closeMenu);

  const handleMenuClick = useCallback(
    (id: string): void => {
      scrollTo(id);
      setIsOpen(false);
    },
    [scrollTo],
  );

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div ref={fabRef} className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 space-y-3 animate-fade-in">
          {MENU_ITEMS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4 py-3 hover:bg-cyan-500/20 transition-all group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <item.icon className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium whitespace-nowrap">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      )}

      <button
        onClick={toggleMenu}
        className={`w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-2xl shadow-cyan-500/50 flex items-center justify-center hover:scale-110 transition-all ${
          isOpen ? "rotate-45" : ""
        }`}
        aria-label="Navigation Menu"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </button>
    </div>
  );
};
