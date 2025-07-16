"use client";

import Help from "../../components/Help";
import Link from "next/link";

export default function HelpPage() {
  const helpCategories = [
    {
      title: "FAQs",
      description:
        "Find answers to common questions about using our movie database",
      href: "/help/faqs",
      icon: "❓",
    },
    {
      title: "Privacy Policy",
      description:
        "Learn about how we handle and protect your personal information",
      href: "/help/privacy",
      icon: "🔒",
    },
    {
      title: "Contact Us",
      description:
        "Get in touch with our support team for personalized assistance",
      href: "/help/contact",
      icon: "📧",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          Help Center
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Welcome to our help center. How can we assist you today?
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {helpCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{category.icon}</div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {category.title}
                  </h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Quick Help
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Our movie database provides comprehensive information about
              movies, directors, and genres. You can browse through our
              collection, search for specific titles, and discover new films
              based on your interests.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">
                Need immediate assistance?
              </h3>
              <p className="text-blue-600">
                Email us at{" "}
                <a
                  href="mailto:support@moviedb.com"
                  className="underline hover:text-blue-800"
                >
                  support@moviedb.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Help />
    </div>
  );
}
