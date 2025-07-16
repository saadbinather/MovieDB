"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Help from "../../components/Help";

export default function HelpPage() {
  const helpCategories = [
    {
      title: "FAQs",
      description:
        "Find answers to common questions about using our movie database.",
      href: "/help/faqs",
      icon: "/question-mark.svg",
      alt: "FAQ icon",
    },
    {
      title: "Privacy Policy",
      description: "Learn how we handle and protect your personal information.",
      href: "/help/privacy",
      icon: "/privacy.svg",
      alt: "Privacy icon",
    },
    {
      title: "Contact Us",
      description:
        "Get in touch with our support team for personalized assistance.",
      href: "/help/contact",
      icon: "/contact.png",
      alt: "Contact icon",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/50 py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Help Center
          </h1>
          <p className="text-muted-foreground text-lg">
            Welcome to our help center. How can we assist you today?
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {helpCategories.map((category) => (
            <Link href={category.href} key={category.href}>
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="flex gap-4 items-start p-6">
                  <Image
                    src={category.icon}
                    alt={category.alt}
                    width={40}
                    height={40}
                    className="mt-1"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="bg-background rounded-xl shadow p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Quick Help
          </h2>
          <p className="text-muted-foreground mb-6">
            Our movie database provides detailed information about movies,
            directors, and genres. Browse, search, and discover content tailored
            to your interests.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-blue-800 font-semibold mb-2">
              Need immediate assistance?
            </h3>
            <p className="text-blue-700">
              Email us at{" "}
              <a
                href="mailto:support@moviedb.com"
                className="underline hover:text-blue-900"
              >
                support@moviedb.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Help />
      </div>
    </div>
  );
}
