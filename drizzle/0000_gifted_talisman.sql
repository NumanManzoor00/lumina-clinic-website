CREATE TABLE `appointments` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`doctor` text NOT NULL,
	`service` text NOT NULL,
	`date` text NOT NULL,
	`time` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_doctor_slot` ON `appointments` (`doctor`,`date`,`time`);