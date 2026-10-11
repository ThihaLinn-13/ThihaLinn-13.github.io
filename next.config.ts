import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Static export for GitHub Pages (Actions uploads ./out)
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
