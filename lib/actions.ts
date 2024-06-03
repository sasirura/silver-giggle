"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const LocationSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Please enter a title with at least 3 characters." }),
  address: z
    .string()
    .min(3, { message: "Please enter a address with at least 3 characters." }),
  devices: z.string().min(1, { message: "Please select at least one device." }),
  status: z.enum(["active", "inactive"], {
    invalid_type_error: "Please select an location status.",
  }),
});

export type State = {
  errors?: {
    title?: string[];
    address?: string[];
    devices?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createLocation(prevState: State, formData: FormData) {
  console.log(formData);
  const validatedFields = LocationSchema.safeParse({
    title: formData.get("title"),
    address: formData.get("address"),
    devices: formData.get("devices"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Location.",
    };
  }

  const { title, address, devices, status } = validatedFields.data;

  try {
    await fetch(process.env.BACKEND_URL + "/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        address,
        devices,
        status,
      }),
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Location.",
    };
  }

  revalidatePath("/dashboard/location");
  redirect("/dashboard/location");
}
