"use client";

import { useState, useMemo } from "react";
import { api } from "@/trpc/react";
import URLShortenerHeader from "./header";
import URLShortenerForm from "./form";
import URLShortenerResult from "./result";
import URLShortenerFooter from "./footer";
import { env } from "@/env";

const DOMAIN = env.NEXT_PUBLIC_DOMAIN;

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
          <URLShortenerHeader />
          {!shortId ? (
            <URLShortenerForm
              url={url}
              onChange={setUrl}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          ) : (
            <URLShortenerResult
              originalUrl={url}
              shortUrl={shortUrl}
              copied={copied}
              onCopy={copyToClipboard}
              onNew={handleNewUrl}
            />
          )}
        </div>
      </main>
      <URLShortenerFooter />
    </div>
  );
}
