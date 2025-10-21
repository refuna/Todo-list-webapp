import type { NextConfig } from 'next';

const remotePatterns: { protocol: 'https'; hostname: string; pathname: string }[] = [];

if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  try {
    const supabaseHost = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).host;
    remotePatterns.push({
      protocol: 'https',
      hostname: supabaseHost,
      pathname: '/storage/v1/object/public/my-todo/**',
    });
  } catch (error) {
    console.warn('Invalid NEXT_PUBLIC_SUPABASE_URL provided; skipping image remote pattern configuration.', error);
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
