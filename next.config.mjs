/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "img1.niftyimages.com", pathname: "/-uvh/**" }],
  },
};

export default nextConfig;
