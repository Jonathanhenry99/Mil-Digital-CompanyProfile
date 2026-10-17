import type { Access, FieldAccess } from "payload";

/** Roles from PROJECT_SPEC §8. */
export const ROLES = ["admin", "editor", "hr", "sales"] as const;
export type Role = (typeof ROLES)[number];

type WithRoles = { roles?: Role[] | null } | null | undefined;

const has = (user: WithRoles, ...roles: Role[]) => Boolean(user?.roles?.some((r) => roles.includes(r)));

export const anyone: Access = () => true;
export const loggedIn: Access = ({ req }) => Boolean(req.user);
export const admins: Access = ({ req }) => has(req.user as WithRoles, "admin");
/** Site content: admins and editors. */
export const editors: Access = ({ req }) => has(req.user as WithRoles, "admin", "editor");
export const adminsField: FieldAccess = ({ req }) => has(req.user as WithRoles, "admin");
