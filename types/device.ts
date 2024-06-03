export type Device = {
  id: string;
  type: "pos" | "kiosk" | "signage";
  imageUrl: string;
  status: "active" | "inactive";
};
