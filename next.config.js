/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    APP_NAME: "EWave",
    API_URL: "http://localhost:4040/api/v1/",
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
