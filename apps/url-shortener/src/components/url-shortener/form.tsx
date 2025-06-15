import type React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  url: string;
  onChange: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function URLShortenerForm({
  url,
  onChange,
  onSubmit,
  isLoading,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="url"
          placeholder="Enter your URL here..."
          value={url}
          onChange={(e) => onChange(e.target.value)}
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
  );
}
