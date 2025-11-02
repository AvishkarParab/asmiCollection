import localFont from "next/font/local";

export const helvetica = localFont({
  src: [
    {
      path: "./helvetica-light.ttf", // Adjust path as needed
      weight: "300",
      style: "normal",
    },
    {
      path: "./Helvetica.ttf", // Adjust path as needed
      weight: "400",
      style: "normal",
    },
    {
      path: "./Helvetica-medium.ttf", // Adjust path as needed
      weight: "500",
      style: "normal",
    },
    {
      path: "./Helvetica-Bold.ttf", // Adjust path as needed
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap", // Ensures the font is displayed as soon as possible
  variable: "--font-helvetica", // Optional: Define a CSS variable for easier use
});
