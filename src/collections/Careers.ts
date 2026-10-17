import type { Access, CollectionConfig } from "payload";
import { admins, anyone } from "@/payload/access";
import { revalidateCollection } from "@/payload/revalidate";
import { slugField } from "@/payload/fields";

const hrTeam: Access = ({ req }) =>
  Boolean((req.user as { roles?: string[] } | null)?.roles?.some((r) => r === "admin" || r === "hr"));

/** Open roles on /career. */
export const Jobs: CollectionConfig = {
  slug: "jobs",
  admin: { useAsTitle: "title", defaultColumns: ["title", "department", "status", "order"], group: "Careers" },
  defaultSort: "order",
  access: { read: anyone, create: hrTeam, update: hrTeam, delete: hrTeam },
  hooks: revalidateCollection("jobs"),
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    {
      type: "row",
      fields: [
        { name: "department", type: "text", required: true },
        { name: "location", type: "text", defaultValue: "Bandung" },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "employmentType",
          type: "select",
          defaultValue: "full-time",
          options: [
            { label: "Full-time", value: "full-time" },
            { label: "Contract", value: "contract" },
            { label: "Internship", value: "internship" },
          ],
        },
        {
          name: "workMode",
          type: "select",
          defaultValue: "onsite",
          options: [
            { label: "On-site", value: "onsite" },
            { label: "Hybrid", value: "hybrid" },
            { label: "Remote", value: "remote" },
          ],
        },
      ],
    },
    { name: "summary", type: "textarea", required: true, admin: { description: "One or two lines shown in the list." } },
    {
      name: "responsibilities",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "requirements",
      type: "array",
      fields: [{ name: "item", type: "text", required: true }],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "open",
      options: [
        { label: "Open", value: "open" },
        { label: "Closed", value: "closed" },
      ],
      admin: { position: "sidebar" },
    },
    { name: "order", type: "number", defaultValue: 100, admin: { position: "sidebar" } },
  ],
};

/** Applications from the /career form. Only HR and admins can read them. */
export const JobApplications: CollectionConfig = {
  slug: "job-applications",
  labels: { singular: "Application", plural: "Applications" },
  admin: { useAsTitle: "name", defaultColumns: ["name", "job", "status", "createdAt"], group: "Careers" },
  defaultSort: "-createdAt",
  access: { create: () => false, read: hrTeam, update: hrTeam, delete: admins },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "status",
          type: "select",
          defaultValue: "new",
          options: ["new", "reviewing", "interview", "offer", "rejected"].map((v) => ({ label: v[0].toUpperCase() + v.slice(1), value: v })),
        },
        { name: "job", type: "relationship", relationTo: "jobs" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
        { name: "phone", type: "text" },
      ],
    },
    { name: "portfolio", type: "text", label: "CV / portfolio link", required: true },
    { name: "message", type: "textarea" },
    { name: "notes", type: "textarea", admin: { position: "sidebar" } },
  ],
};
