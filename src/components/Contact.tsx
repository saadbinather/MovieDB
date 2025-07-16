"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Contact() {
  return (
    <main className="max-w-4xl mx-auto px-6 md:px-8 py-16 space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          Contact Us
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          Whether you have a question, feedback, or a partnership idea — we're
          here to talk.
        </p>
      </section>

      <Card className="shadow-sm border border-border bg-background rounded-2xl">
        <CardContent className="p-8 space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Customer Support
            </h2>
            <p className="text-muted-foreground">
              📧 Email:{" "}
              <a
                href="mailto:support@moviedb.com"
                className="underline hover:text-primary transition-colors"
              >
                support@moviedb.com
              </a>
            </p>
            <p className="text-muted-foreground">📞 Phone: 1-800-MOVIES</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Business Inquiries
            </h2>
            <p className="text-muted-foreground">
              📧 Email:{" "}
              <a
                href="mailto:business@moviedb.com"
                className="underline hover:text-primary transition-colors"
              >
                business@moviedb.com
              </a>
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">
              Office Address
            </h2>
            <address className="not-italic text-muted-foreground leading-relaxed">
              MovieDB Headquarters
              <br />
              123 Cinema Street
              <br />
              Hollywood, CA 90028
            </address>
          </div>

          <div className="pt-6 border-t border-border text-sm text-muted-foreground">
            <p>
              We typically respond within <strong>24–48 business hours</strong>.
              Thanks for your patience!
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
