const LABEL_ID = "170546";
const LABEL_URL = `https://www.beatport.com/label/ytnk-records/${LABEL_ID}`;

export interface BeatportRelease {
  id: number;
  name: string;
  slug: string;
  artists: Array<{ id: number; name: string; slug: string }>;
  image: {
    uri: string;
  };
  publish_date: string;
}

/**
 * Obtiene los releases extrayendo los datos del HTML de la página del sello.
 * Este método es más fiable para una web estática ya que no depende de tokens que caducan.
 */
export async function getLabelReleases(
  labelId = LABEL_ID,
): Promise<BeatportRelease[]> {
  try {
    const response = await fetch(LABEL_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch label page: ${response.status}`);
      return [];
    }

    const html = await response.text();
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
      (q: any) =>
        Array.isArray(q.queryKey) &&
        q.queryKey.some(
          (k: any) => typeof k === "string" && k.includes("releases"),
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
