"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ImageGrid from "@/components/ImageGrid";

export default function Dashboard() {
	const [refreshKey, setRefreshKey] = useState(0);

	return (
		<div className="min-h-screen bg-neutral-100">
			<Navbar onUploadSuccess={() => setRefreshKey((prev) => prev + 1)} />

			<main className="mx-auto max-w-7xl px-6 py-8">
				<ImageGrid refreshKey={refreshKey} />
			</main>
		</div>
	);
}
