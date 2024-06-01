import { signOut } from "@/auth";
export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <form
        className="flex flex-col gap-4"
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Sign out
        </button>
      </form>
    </div>
  );
}
