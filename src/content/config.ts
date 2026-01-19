import { defineCollection, reference, z } from "astro:content";

const artists = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      beatport_id: z.number(),
      name: z.string(),
      bio: z.string(),
      image: z.string(),
      dj_association: z.number(),
      enabled: z.boolean(),
      slug: z.string().nullable().optional(),
      website: z.string().nullable(),
      socials: z.object({
        instagram: z.string().url().optional(),
        soundcloud: z.string().url().optional(),
        spotify: z.string().url().optional(),
        facebook: z.string().url().optional(),
      }),
    }),
});

const releases = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      artist: reference("artists"),
      cover: z.string(),
      date: z.date(),
      type: z.enum(["Single", "EP", "Album"]),
      links: z.object({
        beatport: z.string().url().optional(),
        bandcamp: z.string().url().optional(),
        spotify: z.string().url().optional(),
        youtube: z.string().url().optional(),
      }),
    }),
});

export const collections = {
  artists,
  releases,
};
