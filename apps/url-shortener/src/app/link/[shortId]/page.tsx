import { api } from "@/trpc/server";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: { shortId: string };
}

export default async function LinkRedirectPage({ params }: Props) {
  const entry = await api.url.getByShortUrl({ shortUrl: params.shortId });

  if (!entry) {
    notFound(); // Show the 404 page
  }

  redirect(entry.originalUrl); // Redirect to the original URL
}
