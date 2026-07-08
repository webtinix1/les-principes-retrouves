import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sortie autonome : image Docker minimale (server.js + deps strictement nécessaires)
  output: "standalone",
};

export default nextConfig;
