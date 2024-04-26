CREATE TABLE `fatty_acids` (
	`foodId` integer,
	`saturated` real,
	`monounsaturated` real,
	`polyunsaturated` real,
	`12:0` real,
	`14:0` real,
	`14:1` real,
	`16:0` real,
	`16:1` real,
	`18:0` real,
	`18:1` real,
	`18:1t` real,
	`18:2n6` real,
	`18:2t` real,
	`18:3n3` real,
	`20:0` real,
	`20:1` real,
	`20:4` real,
	`20:5` real,
	`22:0` real,
	`22:5` real,
	`22:6` real,
	`24:0` real,
	FOREIGN KEY (`foodId`) REFERENCES `foods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `amino_acids` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tryptophan` real,
	`threonine` real,
	`isoleucine` real,
	`leucine` real,
	`lysine` real,
	`methionine` real,
	`cystine` real,
	`phenylalanine` real,
	`tyrosine` real,
	`valine` real,
	`arginine` real,
	`histidine` real,
	`alanine` real,
	`asparticAcid` real,
	`glutamicAcid` real,
	`glycine` real,
	`proline` real,
	`serine` real,
	`foodId` integer,
	FOREIGN KEY (`foodId`) REFERENCES `foods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `foods` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`categoryId` integer,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `nutrients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`moisture` real,
	`kcal` real,
	`kJ` real,
	`protein` real,
	`lipids` real,
	`cholesterol` real,
	`carbohydrates` real,
	`dietaryFiber` real,
	`ash` real,
	`calcium` real,
	`magnesium` real,
	`manganese` real,
	`phosphorus` real,
	`iron` real,
	`sodium` real,
	`potassium` real,
	`copper` real,
	`zinc` real,
	`retinol` real,
	`re` real,
	`rae` real,
	`thiamin` real,
	`riboflavin` real,
	`pyridoxine` real,
	`niacin` real,
	`vitaminC` real,
	`foodId` integer,
	FOREIGN KEY (`foodId`) REFERENCES `foods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `units` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`fieldName` text,
	`unit` text,
	`labelPt` text,
	`infoodsTagname` text,
	`systematicName` text,
	`commonName` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `fatty_acids_foodId_unique` ON `fatty_acids` (`foodId`);--> statement-breakpoint
CREATE UNIQUE INDEX `categories_name_unique` ON `categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `foods_name_unique` ON `foods` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `nutrients_foodId_unique` ON `nutrients` (`foodId`);