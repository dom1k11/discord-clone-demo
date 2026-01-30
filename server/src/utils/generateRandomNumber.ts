import crypto from "crypto";

export function generateRandomId(length: number = 8): string {
  return crypto.randomBytes(length).toString("hex");
}
