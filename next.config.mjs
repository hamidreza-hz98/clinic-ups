import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
   allowedDevOrigins: ['192.168.43.54'],
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "vinesh-minio-01.chbk.dev" },
      { protocol: "https", hostname: "vinesh-minio-01.chbkn.dev" },
      { protocol: "https", hostname: "vinesh-minio-01.chbkn.run" },
    ],
  },
};

export default nextConfig;
