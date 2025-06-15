import { api } from "@/trpc/server";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{ shortId: string }>;
}

export default async function LinkRedirectPage({ params }: Props) {
  const { shortId } = await params;
  const entry = await api.url.getByShortUrl({ shortUrl: shortId });

  if (!entry) {
    notFound(); // Show the 404 page
  }

  redirect(entry.originalUrl); // Redirect to the original URL
}
