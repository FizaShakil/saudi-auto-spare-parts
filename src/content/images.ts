/**
 * Remote demo imagery.
 *
 * The product cards, hero panel and mid-page photo band hotlink real
 * photographs so the demo reads like a genuine parts catalogue. Every URL
 * below was verified (HTTP 200, image/jpeg) at the fixed Wikimedia thumb
 * width of 960px or a Pexels width of 1200–1600px.
 *
 * Licensing:
 * - Wikimedia Commons files are PD, CC0 or CC BY-SA (per-image credit).
 * - Pexels images are under the Pexels License (no attribution required).
 *
 * These are PLACEHOLDERS for a demo: before any production launch they must
 * be replaced with client-owned photography served from your own CDN.
 */

import type { ArtworkKind } from "@/lib/types";

export interface RemoteImage {
  src: string;
  alt: string;
  /** Attribution shown in the site footer / README for license compliance. */
  credit: string;
}

/** One photograph per product SKU, keyed by the existing artwork kind. */
export const productImages: Record<ArtworkKind, RemoteImage> = {
  "engine-oil": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Motor_oil.JPG/960px-Motor_oil.JPG",
    alt: "Plastic quart bottle of motor oil on a plain background",
    credit: "Motor oil: Interiot / Wikimedia Commons, public domain",
  },
  "gear-oil": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Mobil_1_Synthetic_LV_ATF_HP_%22Blue_Label_Front.jpg/960px-Mobil_1_Synthetic_LV_ATF_HP_%22Blue_Label_Front.jpg",
    alt: "Front view of a synthetic automatic transmission fluid bottle",
    credit:
      'Transmission fluid: Prof. John D. Kelly / Wikimedia Commons, CC BY-SA 4.0',
  },
  "brake-pads": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Automobile_brake_pad.jpg/960px-Automobile_brake_pad.jpg",
    alt: "New automobile disc brake pad showing the friction surface and backing plate",
    credit: "Brake pad: Tiia Monto / Wikimedia Commons, CC BY-SA 4.0",
  },
  "oil-filter": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Engine_oil_filter.JPG/960px-Engine_oil_filter.JPG",
    alt: "Black spin-on automobile engine oil filter",
    credit: "Oil filter: Dvortygirl / Wikimedia Commons, CC BY-SA 3.0",
  },
  "air-filter": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Autobacs_Pro_Air_conditioner_filter_H-0001.jpg/960px-Autobacs_Pro_Air_conditioner_filter_H-0001.jpg",
    alt: "White pleated cabin air filter element in a plastic frame",
    credit: "Cabin filter: Qurren / Wikimedia Commons, CC BY-SA 3.0",
  },
  "spark-plugs": {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Spark_plug.jpg/960px-Spark_plug.jpg",
    alt: "Four spark plugs lined up showing different ground electrode designs",
    credit: "Spark plugs: Wikimedia Commons, public domain",
  },
  shock: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Ein-%26Zweirohrsto%C3%9Fd%C3%A4mpfer.jpg/960px-Ein-%26Zweirohrsto%C3%9Fd%C3%A4mpfer.jpg",
    alt: "Two car shock absorbers side by side, single-tube and twin-tube",
    credit: "Shock absorbers: Plexi83 / Wikimedia Commons, CC BY-SA 4.0",
  },
  battery: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Lead-acid_automotive_battery,_55_Ah.jpg/960px-Lead-acid_automotive_battery,_55_Ah.jpg",
    alt: "Twelve-volt lead-acid car battery with a carry handle",
    credit: "Car battery: Cjp24 / Wikimedia Commons, CC BY-SA 4.0",
  },
};

/** Hero panel: wide workshop shelves shot, loaded eagerly. */
export const heroImage: RemoteImage = {
  src: "https://images.pexels.com/photos/5506059/pexels-photo-5506059.jpeg?auto=compress&cs=tinysrgb&w=1600",
  alt: "Shelves of engine and transmission parts inside an auto repair workshop",
  credit: "Workshop shelves: Mike van Schoonderwalt / Pexels",
};

/** Full-width decorative band between the product grid and the VIN section. */
export const bandImage: RemoteImage = {
  src: "https://images.pexels.com/photos/4315573/pexels-photo-4315573.jpeg?auto=compress&cs=tinysrgb&w=1600",
  alt: "",
  credit: "Mechanic at work: Anna Shvets / Pexels",
};
