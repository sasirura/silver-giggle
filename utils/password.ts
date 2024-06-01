import { compare, genSalt, hash } from "bcryptjs";

export function saltAndHashPassword(password: string): Promise<string> {
  return genSalt(10).then((salt) => hash(password, salt));
}

export function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}
