import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // モノレポ全体のルートディレクトリを明示的に指定します
    root: path.join( __dirname, '../..'),
  },
};

export default nextConfig;
