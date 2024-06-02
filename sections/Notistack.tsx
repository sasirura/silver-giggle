"use client";

import { SnackbarProvider } from "notistack";

export default function Notistack({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {children}
    </SnackbarProvider>
  );
}
