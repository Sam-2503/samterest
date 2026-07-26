"use client";

import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import DialogDemo from "./FilePicker";

type NavbarProps = {
	onUploadSuccess: () => void;
};

export default function Navbar({ onUploadSuccess }: NavbarProps) {
	return (
		<header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				{/* Logo */}
				<div className="flex items-center gap-3">
					<div>
						<h1 className="text-xl font-bold tracking-tight text-neutral-900">
							Samterest
						</h1>
					</div>
				</div>

				{/* Upload Button */}
				<DialogDemo onUploadSuccess={onUploadSuccess} />
			</div>
		</header>
	);
}
