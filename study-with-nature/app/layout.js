import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Study with Nature",
  description: "Improve your productivity and focus with the calming sounds of nature and a built-in Pomodoro timer.",
  image: "https://i.imgur.com/k1E2zy9.png"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
          <link rel="icon" type="image/x-icon" href="images/favicon.ico" />
        </head>
        <body id="gradientContainer" className="font-serif min-w-full min-h-screen">{children}</body>
    </html>
  );
}
