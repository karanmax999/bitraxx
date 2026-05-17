import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: [
    "@web3modal",
    "@web3modal/wagmi",
    "@web3modal/base"
  ],
};

export default nextConfig;
