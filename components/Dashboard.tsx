import AttachmentDemo from "@/components/Attachments";
import DialogDemo from "@/components/FilePicker";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-12">
			<div className="flex justify-between">
				<h1 className="text-3xl font-bold">Dashboard</h1>

				<DialogDemo />
				
			</div>
			<AttachmentDemo />
		</div>
	);
}
