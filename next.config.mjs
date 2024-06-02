/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Dodavanje ekstenzije .tsx za obradu TypeScript fajlova
    config.resolve.extensions.push(".tsx");

    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
