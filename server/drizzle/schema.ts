import { sqliteTable, text, numeric, uniqueIndex, integer, real } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const prismaMigrations = sqliteTable("_prisma_migrations", {
	id: text("id").primaryKey().notNull(),
	checksum: text("checksum").notNull(),
	finishedAt: numeric("finished_at"),
	migrationName: text("migration_name").notNull(),
	logs: text("logs"),
	rolledBackAt: numeric("rolled_back_at"),
	startedAt: numeric("started_at").default(sql`(current_timestamp)`).notNull(),
	appliedStepsCount: numeric("applied_steps_count").notNull(),
});

export const categories = sqliteTable("categories", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	name: text("name").notNull(),
},
(table) => {
	return {
		nameKey: uniqueIndex("categories_name_key").on(table.name),
	}
});

export const foods = sqliteTable("foods", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	name: text("name").notNull(),
	categoryId: integer("categoryId").notNull().references(() => categories.id, { onDelete: "restrict", onUpdate: "cascade" } ),
},
(table) => {
	return {
		nameKey: uniqueIndex("foods_name_key").on(table.name),
	}
});

export const aminoAcids = sqliteTable("amino_acids", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	foodId: integer("foodId").notNull().references(() => foods.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	tryptophan: real("tryptophan").notNull(),
	threonine: real("threonine").notNull(),
	isoleucine: real("isoleucine").notNull(),
	leucine: real("leucine").notNull(),
	lysine: real("lysine").notNull(),
	methionine: real("methionine").notNull(),
	cystine: real("cystine").notNull(),
	phenylalanine: real("phenylalanine").notNull(),
	tyrosine: real("tyrosine").notNull(),
	valine: real("valine").notNull(),
	arginine: real("arginine").notNull(),
	histidine: real("histidine").notNull(),
	alanine: real("alanine").notNull(),
	asparticAcid: real("asparticAcid").notNull(),
	glutamicAcid: real("glutamicAcid").notNull(),
	glycine: real("glycine").notNull(),
	proline: real("proline").notNull(),
	serine: real("serine").notNull(),
},
(table) => {
	return {
		foodIdKey: uniqueIndex("amino_acids_foodId_key").on(table.foodId),
	}
});

export const fattyAcids = sqliteTable("fatty_acids", {
	foodId: integer("foodId").notNull().references(() => foods.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	saturated: real("saturated").notNull(),
	monounsaturated: real("monounsaturated").notNull(),
	polyunsaturated: real("polyunsaturated").notNull(),
	"12:0": real("12:0"),
	"14:0": real("14:0"),
	"14:1": real("14:1"),
	"16:0": real("16:0"),
	"16:1": real("16:1"),
	"18:0": real("18:0"),
	"18:1": real("18:1"),
	"18:1T": real("18:1t"),
	"18:2N6": real("18:2n6"),
	"18:2T": real("18:2t"),
	"18:3N3": real("18:3n3"),
	"20:0": real("20:0"),
	"20:1": real("20:1"),
	"20:4": real("20:4"),
	"20:5": real("20:5"),
	"22:0": real("22:0"),
	"22:5": real("22:5"),
	"22:6": real("22:6"),
	"24:0": real("24:0"),
},
(table) => {
	return {
		foodIdKey: uniqueIndex("fatty_acids_foodId_key").on(table.foodId),
	}
});

export const nutrients = sqliteTable("nutrients", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	foodId: integer("foodId").notNull().references(() => foods.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	moisture: real("moisture"),
	kcal: real("kcal"),
	kJ: real("kJ"),
	protein: real("protein"),
	lipids: real("lipids"),
	cholesterol: real("cholesterol"),
	carbohydrates: real("carbohydrates"),
	dietaryFiber: real("dietaryFiber"),
	ash: real("ash"),
	calcium: real("calcium"),
	magnesium: real("magnesium"),
	manganese: real("manganese"),
	phosphorus: real("phosphorus"),
	iron: real("iron"),
	sodium: real("sodium"),
	potassium: real("potassium"),
	copper: real("copper"),
	zinc: real("zinc"),
	retinol: real("retinol"),
	re: real("re"),
	rae: real("rae"),
	thiamin: real("thiamin"),
	riboflavin: real("riboflavin"),
	pyridoxine: real("pyridoxine"),
	niacin: real("niacin"),
	vitaminC: real("vitaminC"),
},
(table) => {
	return {
		foodIdKey: uniqueIndex("nutrients_foodId_key").on(table.foodId),
	}
});

export const units = sqliteTable("units", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	fieldName: text("fieldName").notNull(),
	unit: text("unit").notNull(),
	labelPt: text("labelPt").notNull(),
	infoodsTagname: text("infoodsTagname"),
	systematicName: text("systematicName"),
	commonName: text("commonName"),
});