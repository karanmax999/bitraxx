/** Optimized remote assets — keep widths ≤ 1600 for LCP */
export const HERO_BG = {
  dark: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a72ca2f3-9dd1-4fe4-84ba-fe86468a5237_3840w.webp",
  light:
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=75&auto=format&fit=crop",
} as const;

/** next/image `sizes` for full-width hero */
export const HERO_IMAGE_SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1600px";
