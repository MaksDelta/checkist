import { Policy } from "./dashboard.models";

export function filterPolicies(policies: Policy[], term: string) {
  const lower = term.toLowerCase();
  return policies.filter(
    (p) => p.name.toLowerCase().includes(lower) || p.lob.toLowerCase().includes(lower)
  );
}

export function sortByName(policies: Policy[]) {
  return [...policies].sort((a, b) => a.name.localeCompare(b.name));
}

export function groupByLob(policies: Policy[]) {
  return [...policies].sort((a, b) => a.lob.localeCompare(b.lob));
}
