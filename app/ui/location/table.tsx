import { devices } from "@/app/dashboard/location/create/page";
import LocationStatus from "@/app/ui/location/status";
import { fetchFilteredLocations } from "@/lib/data";

export default async function LocationTable({
  currentPage,
}: {
  currentPage: number;
}) {
  const locations = await fetchFilteredLocations(currentPage);

  function deviceCheck(id: string): string {
    let type = "";
    devices.map((d) => {
      if (d.id === id) {
        type = d.type;
      } else {
        return "No device";
      }
    });
    return type;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {locations?.map((location) => (
              <div
                key={location._id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="text-sm text-gray-500">{location.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{location.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      {deviceCheck(location.devices)}
                    </p>
                  </div>
                  <LocationStatus status={location.status} />
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Devices
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {locations?.map((location) => (
                <tr
                  key={location._id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {location.title}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {location.address}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    {deviceCheck(location.devices)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <LocationStatus status={location.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
