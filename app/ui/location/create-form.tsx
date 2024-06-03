"use client";

import { Device } from "@/types/device";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createLocation } from "@/lib/actions";
import { useFormState } from "react-dom";

export default function Form({ devices }: { devices: Device[] }) {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(createLocation, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter location name"
            aria-describedby="title-error"
          />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.title &&
              state?.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter location address"
            aria-describedby="address-error"
          />
          <div id="address-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.address &&
              state.errors.address.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="device" className="mb-2 block text-sm font-medium">
            Choose device
          </label>
          <div className="relative">
            <select
              id="device"
              name="devices"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="device-error"
            >
              <option value="" disabled>
                Select a device
              </option>
              {devices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.type}
                </option>
              ))}
            </select>
            <DevicePhoneMobileIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="device-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.devices &&
              state.errors.devices.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the location status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="InActive"
                  name="status"
                  type="radio"
                  value="inactive"
                  className="text-white-600 h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 focus:ring-2"
                />
                <label
                  htmlFor="InActive"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  InActive <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="Active"
                  name="status"
                  type="radio"
                  value="active"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="Active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Active <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/location"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Location</Button>
      </div>
    </form>
  );
}
