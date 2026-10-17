import type { CollectionConfig } from "payload";
import { admins, adminsField, loggedIn, ROLES } from "@/payload/access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "roles"],
    group: "Settings",
  },
  auth: true,
  access: {
    read: loggedIn,
    create: admins,
    delete: admins,
    // Admins edit anyone; everyone else only themselves.
    update: ({ req }) =>
      (req.user as { roles?: string[] } | null)?.roles?.includes("admin") ? true : { id: { equals: req.user?.id } },
  },
  hooks: {
    beforeChange: [
      // The very first account (created at /admin/create-first-user) is the admin.
      async ({ req, operation, data }) => {
        if (operation === "create") {
          const { totalDocs } = await req.payload.count({ collection: "users", overrideAccess: true });
          if (totalDocs === 0) data.roles = ["admin"];
        }
        return data;
      },
    ],
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["editor"],
      options: ROLES.map((r) => ({ label: r[0].toUpperCase() + r.slice(1), value: r })),
      saveToJWT: true,
      access: { update: adminsField, create: adminsField },
      admin: {
        description: "Admin: everything. Editor: site content. HR: careers. Sales: leads.",
      },
    },
  ],
};
