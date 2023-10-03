export const dashboardNavigation = [
  { name: "Dashboard", href: "/_console/admin/dashboard", current: true },
  { name: "Events", href: "/_console/admin/events", current: false },
  {
    name: "Articles",
    href: "/_console/admin/articles",
    current: false,
  },
  { name: "Members", href: "/_console/admin/members", current: false },
  { name: "Team", href: "/_console/admin/team", current: false },
];

export function getPlatformEventYears() {
  const _y = [];
  const currentYear = new Date().getFullYear();

  for (let i = 2023; i <= currentYear + 2; i++) {
    _y.push({ id: i.toString(), name: i.toString() });
  }
  return _y;
}

export function createSlugFromString(title: string) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const cleanSlug = slug.replace(/[^a-z0-9-]/g, "");
  const finalSlug = cleanSlug.replace(/-{2,}/g, "");
  return finalSlug.replace(/^-+|-+$/g, "");
}
