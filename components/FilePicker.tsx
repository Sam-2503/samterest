"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

export default function DialogDemo() {
	const [file, setFile] = useState<File | null>(null);
	const router = useRouter();
	const [uploading, setUploading] = useState(false);

	async function insertIntoDatabase(filePath: string) {
		const { error } = await supabase
			.from("filepath")
			.insert({ file_path: `${filePath}` });
		if (error) console.error(error);
	}

	async function uploadFile(e: any) {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		console.log(user);

		e.preventDefault();
		if (!file) {
			return;
		}
		setUploading(true);
		try {
			console.log("Uploading file:", file);
			const id = crypto.randomUUID();
			const fileExt = file.name.split(".").pop();
			const fileName = `${id}.${fileExt}`;
			const filePath = `private/${fileName}`;
			const { data, error } = await supabase.storage
				.from("photos")
				.upload(filePath, file);
			await insertIntoDatabase(filePath);
			console.log(data);
		} catch (error) {
			console.error("Error uploading file:", error);
		} finally {
			setUploading(false);
			window.location.reload();
		}
	}

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button>
						<Plus />
						Upload new Image
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-sm">
				<form>
					<DialogHeader>
						<DialogTitle>Upload a new image</DialogTitle>
						<DialogDescription>
							Add a new picture to the Samterest grid
						</DialogDescription>
					</DialogHeader>

					<Field>
						<FieldLabel htmlFor="picture">Picture</FieldLabel>
						<Input
							id="picture"
							type="file"
							name="picture"
							onChange={(e) => setFile(e.target.files[0])}
						/>
						<FieldDescription>
							Select a picture to upload.
						</FieldDescription>
					</Field>

					<DialogFooter>
						<Button type="button" onClick={uploadFile}>
							Upload
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
