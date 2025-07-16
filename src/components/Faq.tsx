"use client";

export default function FAQs() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">
            How do I search for movies?
          </h3>
          <p className="text-gray-600">
            Use the search bar in the Movies section. You can search by title,
            description, or filter by genre and rating.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">
            Can I find movies by director?
          </h3>
          <p className="text-gray-600">
            Yes! Visit the Directors section to see all directors and their
            filmography.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">How are movies rated?</h3>
          <p className="text-gray-600">
            Movies are rated on a scale of 1-10, with 10 being the highest.
            Ratings are based on user reviews and critic scores.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">
            How do I find similar movies?
          </h3>
          <p className="text-gray-600">
            When viewing a movie, scroll down to see related movies in the same
            genre.
          </p>
        </div>
      </div>
    </div>
  );
}
