"use client";

import Link from "next/link";
import { useState } from "react";

export default function Help() {
  const [isOpen, setIsOpen] = useState(false);

  const helpLinks = [
    {
      href: "/help/faqs",
      title: "FAQs",
      description: "Find answers to common questions",
      icon: "❓"
    },
    {
      href: "/help/privacy",
      title: "Privacy Policy",
      description: "Learn how we protect your data",
      icon: "🔒"
    },
    {
      href: "/help/contact",
      title: "Contact Us",
      description: "Get in touch with our support team",
      icon: "📧"
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xl hover:bg-blue-700 transition-colors"
      >
        {isOpen ? "×" : "?"}
      </button>

      {/* Help Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl p-4 animate-fade-in">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Help Center</h2>
          
          <div className="space-y-3">
            {helpLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{link.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="text-sm text-gray-500">
              <p className="mb-2">Need immediate assistance?</p>
              <a
                href="mailto:support@moviedb.com"
                className="text-blue-600 hover:underline"
              >
                support@moviedb.com
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
