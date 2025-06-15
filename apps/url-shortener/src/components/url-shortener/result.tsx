import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Link } from "lucide-react";

interface Props {
  originalUrl: string;
  shortUrl: string;
  copied: boolean;
  onCopy: () => void;
  onNew: () => void;
}

export default function URLShortenerResult({
  originalUrl,
  shortUrl,
  copied,
  onCopy,
  onNew,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Link className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mb-2 text-xl font-semibold text-black">
          URL Shortened!
        </h2>
        <p className="text-sm text-gray-600">
          Your shortened URL is ready to use
        </p>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="mb-1 text-xs text-gray-500">Original URL</p>
          <p className="text-sm break-all text-gray-700">{originalUrl}</p>
        </div>

        <div className="rounded-lg border bg-gray-50 p-4">
          <p className="mb-1 text-xs text-gray-500">Shortened URL</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-black">{shortUrl}</p>
            <div className="flex gap-2">
              <Button
                onClick={onCopy}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => window.open(shortUrl, "_blank")}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {copied && (
            <p className="mt-1 text-xs text-green-600">Copied to clipboard!</p>
          )}
        </div>
      </div>

      <Button
        onClick={onNew}
        className="h-12 w-full bg-black font-medium text-white hover:bg-gray-800"
      >
        Shorten Another URL
      </Button>
    </div>
  );
}
