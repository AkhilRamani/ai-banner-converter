import React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: [{ label: "About", href: "/about" }],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-5 w-5 bg-gradient-to-tr from-primary to-primary/40 rounded-full" />
              <span className="font-semibold text-xl">
                Loomix
                <span className="font-medium text-lg opacity-50">.app</span>
              </span>
            </Link>
          </div>

          {/* Links columns */}
          {footerSections.map((section, index) => (
            <div key={index} className="md:col-span-1">
              <h3 className="font-medium text-sm mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 mt-4 pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Loomix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
