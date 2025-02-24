import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  birthdate: timestamp("birthdate", { mode: "date" }).notNull(),
});

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  street: text("street").notNull(),
  city: text("city").notNull(),
  province: text("province").notNull(),
  postal_code: text("postal_code").notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  address: one(addresses, {
    fields: [users.id],
    references: [addresses.user_id],
  }),
}));
