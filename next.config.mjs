/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '1bdcd5f74bace6ad67f118cf2d62a7c7.ipfscdn.io',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
