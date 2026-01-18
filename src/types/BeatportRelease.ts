type BPMRange = {
    min: number;
    max: number;
};

type Label = {
    id: number;
    name: string;
    image: { id: number; uri: string; }[];
    slug: string;
};

type Price = { code: string; symbol: string; value: number; display: string; };

export interface BeatportRelease {
    id: number;
    name: string;
    slug: string;
    artists: { id: number; name: string; slug: string; }[];
    image: {
        id: number;
        uri: string;
        dynamic_uri: string;
    };
    publish_date: string;
    bpm_range: BPMRange;
    catalog_number: string;
    desc: string;
    enabled: boolean;
    encoded_date: string;
    exclusive: boolean;
    is_explicit: boolean;
    is_ugc_remix: boolean;
    is_dj_edit: boolean;
    label: Label;
    new_release_date: string;
    override_price: null | Price;
    pre_order: boolean;
    pre_order_date: string;
    price: Price;
    price_override_firm: boolean;
    remixers: { id: number; name: string; slug: string; }[];
    track_count: number;
    upc: string;
    updated: string;
    url: string;
    is_hype: boolean;
};