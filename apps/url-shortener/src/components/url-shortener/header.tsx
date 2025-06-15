import { Link } from "lucide-react";

export default function URLShortenerHeader() {
  return (
    <div className="space-y-2 text-center">
      <div className="mb-4 flex justify-center">
        <div className="rounded-full bg-black p-3">
          <Link className="h-6 w-6 text-white" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-black">URL Shortener</h1>
      <p className="text-gray-600">
        This should be a URL shortener, in reality it probably makes your URL
        longer. Not my problem.
      </p>
    </div>
  );
}
