/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["fakeimg.pl", "logos.skyscnr.com", "content.skyscnr.com","www.skyscanner.com","d2xf5gjipzd8cd.cloudfront.net", "www.tripadvisor.com"]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    }
};

export default nextConfig;
