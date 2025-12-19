import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.scss";
import ThemeProvider from "@/components/ui/ThemeProvider/ThemeProvider";

const metadata: Metadata = {
  title: "Demo Next Node App",
  description: "Student management application",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
