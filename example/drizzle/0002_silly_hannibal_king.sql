CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
