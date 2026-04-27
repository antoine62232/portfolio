/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Empêche le clickjacking (intégration dans une iframe)
          { key: "X-Frame-Options", value: "DENY" },
          // Empêche le navigateur de deviner le type MIME
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Contrôle les infos envoyées au site suivant
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Restreint les fonctionnalités du navigateur inutiles
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;