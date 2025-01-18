import { ThemeProvider } from "@/components/theme-provider";
import { PropsWithChildren } from "react";

function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}

export default Providers;
