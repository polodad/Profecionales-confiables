/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://ufxbrtvkhibstxniumbe.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmeGJydHZraGlic3R4bml1bWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzOTUzNzUsImV4cCI6MjA3NTk3MTM3NX0.c8qA9SiEuHAy4h4umuvG-8qrtVzDzoF0aS4j5ac9mi4',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
}

module.exports = nextConfig

