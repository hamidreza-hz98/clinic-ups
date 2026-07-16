import persianCopy from "@/constants/landing/persian-copy.json";

export function text(key) {
  return persianCopy[key] || key;
}

export function faText(value) {
  if (value == null) return "";
  return typeof value === "object" ? value.fa || "" : value;
}
