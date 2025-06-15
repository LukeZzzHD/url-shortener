"use client";

import type React from "react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Link, ExternalLink } from "lucide-react";
import { api } from "@/trpc/react"; // <-- adjust to your project path
import { env } from "@/env";

const DOMAIN = env.NEXT_PUBLIC_DOMAIN as string;

export default function URLShortener() {
  const [url, setUrl] = useState("");
  const [shortId, setShortId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const shortUrl = useMemo(() => `${DOMAIN}/link/${shortId}`, [shortId]);

  const createMutation = api.url.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    try {
      const result = await createMutation.mutateAsync({ originalUrl: url });
      setShortId(result.shortUrl);
    } catch (err) {
      console.error("Failed to create shortened URL:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleNewUrl = () => {
    setUrl("");
    setShortId("");
    setCopied(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-black p-3">
                <Link className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-black">URL Shortener</h1>
            <p className="text-gray-600">
              This should be a URL shortener, in reality it probably makes your
              URL longer. Not my problem.
            </p>
          </div>

          {/* Main Form */}
          {!shortId ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="url"
                  placeholder="Enter your URL here..."
                  value={url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUrl(e.target.value)
                  }
                  className="h-12 border-gray-300 text-base focus:border-black focus:ring-black"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !url}
                className="h-12 w-full bg-black font-medium text-white hover:bg-gray-800"
              >
                {isLoading ? "Shortening..." : "Shorten URL"}
              </Button>
            </form>
          ) : (
            /* Result Display */
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
                  <p className="text-sm break-all text-gray-700">{url}</p>
                </div>

                <div className="rounded-lg border bg-gray-50 p-4">
                  <p className="mb-1 text-xs text-gray-500">Shortened URL</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-black">{shortUrl}</p>
                    <div className="flex gap-2">
                      <Button
                        onClick={copyToClipboard}
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
                    <p className="mt-1 text-xs text-green-600">
                      Copied to clipboard!
                    </p>
                  )}
                </div>
              </div>

              <Button
                onClick={handleNewUrl}
                className="h-12 w-full bg-black font-medium text-white hover:bg-gray-800"
              >
                Shorten Another URL
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-sm text-gray-500">
          Built by <span className="font-medium text-black">Lukas Schwab</span>
        </p>
      </footer>
    </div>
  );
}
