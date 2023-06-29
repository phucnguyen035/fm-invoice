DROP INDEX IF EXISTS "creator_idx";--> statement-breakpoint
ALTER TABLE "invoices" DROP COLUMN IF EXISTS "invoicer";