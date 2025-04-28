/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
      ignoreBuildErrors: true,
  },
  eslist: {
        ignoreDuringBuilds: true,
  },
  images: {
      remotePatterns: [
          {
              hostname: "avatar.vercel.sh",
              port: "",
          },
          {
              hostname: "utfs.io",
              port: "",
          },
          {
              hostname: "nvklcnxjewiqlubfmtab.supabase.co",
              protocol: "https",
              port: "",
          },
          {
              hostname: "dummyimage.com",
              protocol: "https",
              port: "",
          },
          {
              hostname: "lh3.googleusercontent.com",
              protocol: "https",
              port: "",
          },
      ]
  },
  
  experimental: {
      //...
      serverless: {
        timeout: 30, // Increase the timeout to 30 seconds
      },
    },

};

export default nextConfig;