CREATE TABLE "actions" (
	"id" serial PRIMARY KEY NOT NULL,
	"path" text NOT NULL,
	CONSTRAINT "actions_path_unique" UNIQUE("path")
);
--> statement-breakpoint
CREATE TABLE "inline_keyboards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payload" text NOT NULL,
	"chat_id" integer NOT NULL,
	"context_id" text NOT NULL,
	"message_id" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reply_keyboards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" varchar NOT NULL,
	"buttons" jsonb NOT NULL,
	"chat_id" integer NOT NULL,
	"message_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"telegram_id" integer NOT NULL,
	"first_name" text DEFAULT '' NOT NULL,
	"last_name" text DEFAULT '' NOT NULL,
	"full_name" text DEFAULT '' NOT NULL,
	"lang_code" text,
	"username" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_telegram_id_unique" UNIQUE("telegram_id")
);
