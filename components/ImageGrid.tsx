"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Image = {
	src: string;
};

export default function ImageGrid({ refreshKey }: { refreshKey: number }) {
	const [images, setImages] = useState<Image[]>([]);
	const [loading, setLoading] = useState(true);

	async function getImages() {
		setLoading(true);

		const { data, error } = await supabase
			.from("filepath")
			.select()
			.order("id", { ascending: false });

		if (error) {
			console.error(error);
			setLoading(false);
			return;
		}

		const mappedImages = data.map((item) => ({
			src: supabase.storage.from("photos").getPublicUrl(item.file_path)
				.data.publicUrl,
		}));

		setImages(mappedImages);
		setLoading(false);
	}

	useEffect(() => {
		getImages();
	}, [refreshKey]);

	if (loading) {
		return (
			<div className="columns-2 gap-5 md:columns-3 lg:columns-4 xl:columns-5">
				{Array.from({ length: 15 }).map((_, i) => (
					<div
						key={i}
						className="mb-5 break-inside-avoid animate-pulse rounded-3xl bg-neutral-300"
						style={{
							height: `${220 + Math.random() * 220}px`,
						}}
					/>
				))}
			</div>
		);
	}

	if (images.length === 0) {
		return (
			<div className="flex h-[60vh] flex-col items-center justify-center text-center">
				<div className="mb-5 text-7xl">📷</div>

				<h2 className="text-3xl font-bold text-neutral-800">
					No images yet
				</h2>

				<p className="mt-2 text-neutral-500">
					Upload your first picture.
				</p>
			</div>
		);
	}

	return (
		<div className="columns-2 gap-5 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
			{images.map((image) => (
				<div
					key={image.src}
					className="group relative mb-5 break-inside-avoid overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
				>
					<img
						src={image.src}
						alt=""
						className="w-full rounded-3xl transition-transform duration-500 group-hover:scale-105"
					/>

					<div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
				</div>
			))}
		</div>
	);
}
