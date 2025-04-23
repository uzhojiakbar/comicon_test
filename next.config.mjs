/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'testapi.tcats.uz',
                port: '',
                pathname: '/**', // Allow all paths under this hostname
            },
        ],
        unoptimized: true,

    }
};

export default nextConfig;
