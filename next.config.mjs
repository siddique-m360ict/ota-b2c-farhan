import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
    domains: ["m360-trabill.s3.ap-south-1.amazonaws.com"],
  },
}

export default nextConfig
