import type { Category, Project } from "./portfolio.ts";

export function filterProjects(
  projects: Project[],
  category: Category,
  query: string,
) {
  const search = query.trim().toLowerCase();
  return projects.filter(
    (project) =>
      (category === "Everything" || project.category === category) &&
      `${project.title} ${project.category} ${project.label} ${project.tools ?? ""}`
        .toLowerCase()
        .includes(search),
  );
}

export function isExternalLink(url: string | undefined) {
  if (!url) return false;
  try {
    return ["https:", "http:"].includes(new URL(url).protocol);
  } catch {
    return false;
  }
}
