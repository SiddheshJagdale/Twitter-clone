/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "account.google.com",
        port: "3000",
        pathname: "/users/**",
      },
    ],
  },
};
