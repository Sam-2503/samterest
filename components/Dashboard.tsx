"use client";
import ImageGrid from "@/components/Attachments";
import DialogDemo from "@/components/FilePicker";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

export default function Dashboard() {
	return (
		<div className="m-4">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold">Samterest</h1>

				<DialogDemo />
			</div>
			<ImageGrid />
		</div>
	);
}
