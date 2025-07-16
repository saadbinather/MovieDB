"use client";

export default function Privacy() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Data Collection</h3>
          <p className="text-gray-600 mb-4">
            We collect minimal data to provide you with the best movie browsing
            experience. This includes:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Search history</li>
            <li>Viewing preferences</li>
            <li>Genre interests</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Data Usage</h3>
          <p className="text-gray-600 mb-4">Your data is used to:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Personalize your movie recommendations</li>
            <li>Improve our search algorithms</li>
            <li>Enhance the user experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Data Protection</h3>
          <p className="text-gray-600">
            We implement industry-standard security measures to protect your
            data. Your privacy is our top priority.
          </p>
        </section>
      </div>
    </div>
  );
}
