import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { filterProjects, isExternalLink } from "./gallery.ts";
import {
  categories,
  credentials,
  education,
  profile,
  projects,
} from "./portfolio.ts";

test("everything includes all resume-backed entries", () => {
  assert.equal(filterProjects(projects, "Everything", "").length, 4);
});

test("categories only contain matching entries", () => {
  const result = filterProjects(projects, "AI & ML", "");
  assert.equal(result.length, 1);
  assert.ok(result.every((project) => project.category === "AI & ML"));
  assert.ok(
    categories.every(
      (category) => filterProjects(projects, category, "").length > 0,
    ),
  );
});

test("search is trimmed, case-insensitive, and combines with category", () => {
  assert.equal(
    filterProjects(projects, "Everything", "  GUARDIAN  ")[0].id,
    "01",
  );
  assert.equal(filterProjects(projects, "Video & Film", "guardian").length, 0);
  assert.equal(filterProjects(projects, "Everything", "development").length, 2);
  assert.equal(
    filterProjects(projects, "Everything", "tensorflow")[0].id,
    "02",
  );
});

test("unmatched searches have no results", () => {
  assert.deepEqual(
    filterProjects(projects, "Everything", "not a real project"),
    [],
  );
});

test("entry IDs are unique and all illustrations have accessible text", () => {
  assert.equal(
    new Set(projects.map((project) => project.id)).size,
    projects.length,
  );
  assert.ok(
    projects.every(
      (project) =>
        project.alt.startsWith("Illustrative") &&
        existsSync(`public${project.image}`),
    ),
  );
});

test("only safe web links are enabled, including omitted project links", () => {
  assert.ok(isExternalLink("https://example.com"));
  assert.ok(!isExternalLink("javascript:alert(1)"));
  assert.ok(!isExternalLink(""));
  assert.ok(!isExternalLink(undefined));
});

test("contact and profile links match the supplied resume", () => {
  assert.equal(profile.email, "abhinanddilep@gmail.com");
  assert.equal(profile.phoneHref, "tel:+919961522602");
  assert.equal(
    profile.socialLinks.find((link) => link.label === "GitHub")?.url,
    "https://github.com/abh1nxnd",
  );
  assert.ok(profile.socialLinks.every((link) => isExternalLink(link.url)));
  assert.ok(existsSync(`public${profile.resume}`));
});

test("there is one academic project, not invented portfolio work", () => {
  assert.equal(
    projects.filter((project) => project.label === "Academic project").length,
    1,
  );
  assert.equal(projects[0].title, "Guardian Net Suite");
  assert.ok(projects.every((project) => !project.url));
  assert.equal(education.length, 3);
  assert.equal(credentials.length, 6);
  assert.ok(
    !JSON.stringify({ profile, projects, education, credentials }).includes(
      "[Your",
    ),
  );
});
