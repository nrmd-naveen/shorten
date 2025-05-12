import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

module.exports = {
  image: {
    domains: []
  }
}
export default nextConfig;
