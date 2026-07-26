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
			<div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
				{Array.from({ length: 15 }).map((_, i) => (
					<div
						key={i}
						className="mb-3 break-inside-avoid animate-pulse rounded-xl bg-neutral-300 sm:mb-4 sm:rounded-2xl lg:mb-5 lg:rounded-3xl"
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
			<div className="flex h-[60vh] flex-col items-center justify-center px-6 text-center">
				<div className="mb-4 text-5xl sm:text-7xl">📷</div>

				<h2 className="text-2xl font-bold text-neutral-800 sm:text-3xl">
					No images yet
				</h2>

				<p className="mt-2 text-sm text-neutral-500 sm:text-base">
					Upload your first picture.
				</p>
			</div>
		);
	}

	return (
		<div className="columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
			{images.map((image) => (
				<div
					key={image.src}
					className="group relative mb-3 break-inside-avoid overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mb-4 sm:rounded-2xl lg:mb-5 lg:rounded-3xl"
				>
					<img
						src={image.src}
						alt=""
						loading="lazy"
						className="block w-full rounded-xl transition-transform duration-500 group-hover:scale-105 sm:rounded-2xl lg:rounded-3xl"
					/>

					<div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:rounded-2xl lg:rounded-3xl" />
				</div>
			))}
		</div>
	);
}
