import Table from "@/app/ui/location/table";
import { CreateLocation } from "@/app/ui/location/buttons";
import { lusitana } from "@/app/ui/fonts";
import { LocationTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Locations</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateLocation />
      </div>
      <Suspense fallback={<LocationTableSkeleton />}>
        <Table currentPage={1} />
      </Suspense>
    </div>
  );
}
