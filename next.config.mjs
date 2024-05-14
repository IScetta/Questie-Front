/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "19604448.fs1.hubspotusercontent-na1.net" },
      { hostname: "bairesdev.mo.cloudinary.net" },
      { hostname: "images.unsplash.com" },
      { hostname: "source.unsplash.com" },
      { hostname: "e7.pngegg.com" },
      { hostname: "www.maxcf.es"},
      {hostname: "elestudiantedigital.com"},
      {hostname: "res.cloudinary.com"}

      
    ],
  },
};

export default nextConfig;
