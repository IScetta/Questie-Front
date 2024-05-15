import flowbite from "flowbite-react/tailwind";
import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        image: "#747474",
        whiteColumn: "#FFFFFF",
        purpleMain: "#563073",
        purpleMainLight: "#C09AE6",
        purpleMainLighter: "#D8C2F0",
        yellowMain: "#FFD700",
        yellowMainLight: "#FFE60D",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [flowbite.plugin()],
});
export default config;
