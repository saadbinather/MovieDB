"use client";

import { useParams } from "next/navigation";
import Privacy from "../../../components/Privacy";
import Contact from "../../../components/Contact";
import FAQs from "../../../components/Faq";
import Link from "next/link";

export default function HelpSection() {
  const params = useParams();
  const slug = params.slug as string[];
  const section = slug?.[0] || "general";

  const renderContent = () => {
    switch (section) {
      case "faqs":
        return <FAQs />;
      case "contact":
        return <Contact />;
      case "privacy":
        return <Privacy />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-8 flex items-center gap-2 text-sm">
        <Link href="/help" className="text-blue-600 hover:underline">
          Help
        </Link>
        {section !== "general" && (
          <>
            <span className="text-gray-500">/</span>
            <span className="text-gray-600 capitalize">{section}</span>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 rounded-lg shadow-lg p-8">
        {renderContent()}
      </div>
    </div>
  );
}
