import { createBrowserClient } from "@supabase/ssr";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishable_key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createBrowserClient(
	supabase_url as string,
	publishable_key as string,
);
