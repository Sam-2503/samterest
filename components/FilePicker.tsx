"use client";

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

export default function DialogDemo({
	onUploadSuccess,
}: {
	onUploadSuccess: () => void;
}) {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);

	async function insertIntoDatabase(filePath: string) {
		const { error } = await supabase
			.from("filepath")
			.insert({ file_path: `${filePath}` });
		if (error) console.error(error);
	}

	async function uploadFile(e: any) {
		e.preventDefault();

		const {
			data: { user },
		} = await supabase.auth.getUser();
		console.log(user);

		if (uploading) return;

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
			if (error) {
				console.error(error);
				throw error;
			}
			await insertIntoDatabase(filePath);
			onUploadSuccess();
			console.log(data);
		} catch (error) {
			console.error("Error uploading file:", error);
		} finally {
			setUploading(false);
		}
	}

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button
						type="button"
						disabled={uploading}
						className="px-2 rounded-full bg-red-600 hover:bg-red-700"
					>
						{uploading ? (
							<>
								<div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
								Uploading...
							</>
						) : (
							<>
								<Plus className="mr-2 h-4 w-4" />
								Upload
							</>
						)}
					</Button>
				}
			/>
			<DialogContent className="sm:max-w-sm">
				<form>
					<DialogHeader>
						<DialogTitle>Upload a new image</DialogTitle>
						<DialogDescription className="mb-2">
							Select a picture to upload to the Samterest grid
						</DialogDescription>
					</DialogHeader>

					<Field>
						<Input
							id="picture"
							type="file"
							name="picture"
							onChange={(e) =>
								setFile(e.target.files?.[0] ?? null)
							}
						/>
					</Field>

					<DialogClose>
						<DialogFooter>
							<Button
								type="button"
								onClick={uploadFile}
								className="mt-1 bg-red-600 hover:bg-red-700"
							>
								Upload
							</Button>
						</DialogFooter>
					</DialogClose>
				</form>
			</DialogContent>
		</Dialog>
	);
}
