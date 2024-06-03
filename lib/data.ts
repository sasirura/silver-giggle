import { unstable_noStore as noStore } from "next/cache";

import { Location } from "@/types/location";
import { headers } from "next/headers";

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredLocations(
  currentPage: number
): Promise<Location[]> {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/location?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
      { method: "GET", headers: headers() }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}
