/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.nicepng.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
