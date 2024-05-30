/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "19604448.fs1.hubspotusercontent-na1.net" },
      { hostname: "bairesdev.mo.cloudinary.net" },
      { hostname: "images.unsplash.com" },
      { hostname: "source.unsplash.com" },
      { hostname: "e7.pngegg.com" },
      { hostname: "www.maxcf.es" },
      { hostname: "elestudiantedigital.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "placehold.co" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "s.gravatar.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
