import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login', // หรือ '/auth/login' แล้วแต่ route ของคุณ
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
