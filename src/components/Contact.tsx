"use client";

export default function Contact() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      <div className="bg-white rounded-lg p-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Customer Support</h3>
          <p className="text-gray-600">Email: support@moviedb.com</p>
          <p className="text-gray-600">Phone: 1-800-MOVIES</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Business Inquiries</h3>
          <p className="text-gray-600">Email: business@moviedb.com</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Office Address</h3>
          <p className="text-gray-600">
            MovieDB Headquarters
            <br />
            123 Cinema Street
            <br />
            Hollywood, CA 90028
          </p>
        </div>
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500">
            We typically respond to inquiries within 24-48 business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
