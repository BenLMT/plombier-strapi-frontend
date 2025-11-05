"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Wrench } from "lucide-react";
import Button from "./ui/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Arrondissements", href: "/#arrondissements" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-soft">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary rounded-xl p-2.5 group-hover:bg-primary-700 transition-colors">
              <Wrench className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-primary-900">Plomberie Paris</span>
              <p className="text-xs text-neutral-500">Intervention rapide 7j/7</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-primary-900 hover:text-primary-700 font-medium text-sm rounded-lg hover:bg-primary-50 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="secondary" size="md" className="gap-2">
              <Phone className="w-4 h-4" />
              Contactez-nous
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-primary-900 hover:bg-primary-50"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-primary-900 hover:bg-primary-50 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Button variant="secondary" size="md" className="w-full gap-2">
                <Phone className="w-4 h-4" />
                Contactez-nous
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
