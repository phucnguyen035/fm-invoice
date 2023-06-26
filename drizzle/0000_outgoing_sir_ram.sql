DO $$ BEGIN
 CREATE TYPE "payment_terms" AS ENUM('1', '7', '14', '30');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('draft', 'pending', 'paid');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoicer" text NOT NULL,
	"status" "status" DEFAULT 'draft' NOT NULL,
	"issue_date" timestamp NOT NULL,
	"description" text,
	"due_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"items" jsonb NOT NULL,
	"address_from" jsonb NOT NULL,
	"adress_to" jsonb NOT NULL,
	"client_name" text NOT NULL,
	"client_email" text NOT NULL,
	"payment_terms" "payment_terms" NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "creator_idx" ON "invoices" ("invoicer");