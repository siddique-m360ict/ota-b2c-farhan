const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m360-trabill.s3.ap-south-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig
