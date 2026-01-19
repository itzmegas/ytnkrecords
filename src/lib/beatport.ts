import type { BeatportRelease } from "@/types/BeatportRelease";

const LABEL_ID = "170546";

interface BeatportQuery {
  queryKey: (string | number | Record<string, unknown>)[];
  state: {
    data?: {
      results?: BeatportRelease[];
    };
  };
}

/**
 * Obtiene los releases extrayendo los datos del HTML de la página del sello.
 * Este método es más fiable para una web estática ya que no depende de tokens que caducan.
 */
export async function getLabelReleases(
  labelId = LABEL_ID,
): Promise<BeatportRelease[]> {
  const LABEL_URL = `https://www.beatport.com/label/ytnk-records/${labelId}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    console.log(`Fetching Beatport page: ${LABEL_URL}`);
    const response = await fetch(LABEL_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Failed to fetch label page: ${response.status}`);
      return [];
    }

    console.log("Beatport page fetched, parsing HTML...");
    const html = await response.text();
    console.log(`HTML size: ${Math.round(html.length / 1024)} KB`);
    const nextDataMatch = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/,
    );

    if (!nextDataMatch || !nextDataMatch[1]) {
      console.error("Could not find __NEXT_DATA__ in Beatport page");
      return [];
    }

    const nextData = JSON.parse(nextDataMatch[1]);
    const queries = nextData.props?.pageProps?.dehydratedState?.queries || [];

    // Buscamos la query que contiene los resultados de los releases
    // Generally the queryKey includes "releases" and the labelId
    const releasesQuery = queries.find(
      (q: BeatportQuery) =>
        Array.isArray(q.queryKey) &&
        q.queryKey.some(
          (k) => typeof k === "string" && k.includes("releases"),
        ) &&
        q.state?.data?.results &&
        Array.isArray(q.state.data.results),
    );

    if (!releasesQuery) {
      console.error("Could not find releases query in dehydrated state");
      return [];
    }

    return releasesQuery.state.data.results;
  } catch (error) {
    console.error("Error scraping Beatport releases:", error);
    return [];
  }
}

/**
 * Obtiene los últimos releases de un artista.
 * @param artistSlug El slug del artista (ej. "morsei")
 * @param artistId El ID del artista (ej. "645593")
 */
export async function getArtistReleases(
  artistSlug: string,
  artistId: string,
): Promise<BeatportRelease[]> {
  const ARTIST_URL = `https://www.beatport.com/artist/${artistSlug}/${artistId}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    console.log(`Fetching Beatport artist page: ${ARTIST_URL}`);
    const response = await fetch(ARTIST_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Failed to fetch artist page: ${response.status}`);
      return [];
    }

    const html = await response.text();
    const nextDataMatch = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">([^<]+)<\/script>/,
    );

    if (!nextDataMatch || !nextDataMatch[1]) {
      console.error("Could not find __NEXT_DATA__ in Beatport artist page");
      return [];
    }

    const nextData = JSON.parse(nextDataMatch[1]);
    const queries = nextData.props?.pageProps?.dehydratedState?.queries || [];

    // Buscamos la query que contiene los releases del artista
    const releasesQuery = queries.find(
      (q: BeatportQuery) =>
        Array.isArray(q.queryKey) &&
        q.queryKey.some(
          (k) =>
            typeof k === "string" &&
            k.includes("releases") &&
            k.includes(`artist_id=${artistId}`),
        ) &&
        q.state?.data?.results &&
        Array.isArray(q.state.data.results),
    );

    if (!releasesQuery) {
      console.error("Could not find artist releases query in dehydrated state");
      return [];
    }

    return releasesQuery.state.data.results;
  } catch (error) {
    console.error("Error scraping Beatport artist releases:", error);
    return [];
  }
}
