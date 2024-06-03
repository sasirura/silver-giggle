import Form from "@/app/ui/location/create-form";
import Breadcrumbs from "@/app/ui/location/breadcrumbs";
import { Metadata } from "next";
import { Device } from "@/types/device";

export const metadata: Metadata = {
  title: "Create Invoice",
};

export const devices = [
  {
    id: "1",
    type: "pos",
    imageUrl: "/images/pos.png",
    status: "active",
  },
  {
    id: "2",
    type: "kiosk",
    imageUrl: "/images/printer.png",
    status: "inactive",
  },
] as Device[];

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Locations", href: "/dashboard/location" },
          {
            label: "Create Location",
            href: "/dashboard/location/create",
            active: true,
          },
        ]}
      />
      <Form devices={devices} />
    </main>
  );
}
