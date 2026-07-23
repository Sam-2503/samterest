"use client";
import { FileCodeIcon, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
	Attachment,
	AttachmentAction,
	AttachmentActions,
	AttachmentContent,
	AttachmentDescription,
	AttachmentGroup,
	AttachmentMedia,
	AttachmentTitle,
} from "@/components/ui/attachment";
import { Spinner } from "@/components/ui/spinner";
import { supabase } from "@/lib/supabase/client";

type Image = {
	src: string;
};

/*
const images = [
	{
		name: "workspace.png",
		meta: "PNG · 820 KB",
		src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
		alt: "Workspace",
	},
	{
		name: "desk-reference.jpg",
		meta: "JPG · 1.1 MB",
		src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
		alt: "Desk",
	},
	{
		name: "office-reference.jpg",
		meta: "JPG · 940 KB",
		src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
		alt: "Office",
	},
];
*/

export default function ImageGrid() {
	const [images, setImages] = useState<Image[]>([]);

	async function getImages() {
		const { data, error } = await supabase.from("filepath").select();
		if (error) {
			// Logs the full error: message, code, details, and hint.
			console.error(error);
			return;
		}

		const images = data.map((item) => {
			const publicUrl = supabase.storage
				.from("photos")
				.getPublicUrl(`${item.file_path}`).data.publicUrl;
			return {
				src: publicUrl,
			};
		});
		setImages(images);
	}

	useEffect(() => {
		getImages();
	}, []);

	return (
		<div className="grid grid-cols-5 gap-2 w-full h-full py-12">
			{images.map((image) => (
				<img
					key={image.src}
					src={image.src}
					alt="image"
					className="rounded-md border border-slate-200 object-cover w-full h-auto"
				/>
			))}
		</div>
	);
}
