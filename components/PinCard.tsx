"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Heart, Maximize2, Share2 } from "lucide-react";
import { motion } from "motion/react";

import type { Pin } from "../app/types";

interface PinCardProps {
	pin: Pin;
	onSelect: (pin: Pin) => void;
	onLikeToggle: (pinId: string) => void;
	liked: boolean;
}

export default function PinCard({
	pin,
	onSelect,
	onLikeToggle,
	liked,
}: PinCardProps) {
	const [isLoaded, setIsLoaded] = useState(false);

	const handleShare = (event: React.MouseEvent) => {
		event.stopPropagation();
		navigator.clipboard.writeText(pin.imageUrl);
		alert("High-resolution image link copied to clipboard!");
	};

	return (
		<motion.div
			id={`pin-${pin.id}`}
			layoutId={`pin-wrapper-${pin.id}`}
			initial={{ opacity: 0, y: 15 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{ duration: 0.4 }}
			className="masonry-item group relative bg-white border border-[#e5e1da] rounded-3xl overflow-hidden cursor-pointer shadow-none hover:shadow-[0_12px_32px_rgba(229,225,218,0.5)] transition-all duration-300"
			onClick={() => onSelect(pin)}
		>
			<div
				id={`pin-img-container-${pin.id}`}
				className={`relative w-full overflow-hidden ${pin.aspectRatio} bg-surface-soft`}
			>
				{!isLoaded && (
					<div className="absolute inset-0 animate-pulse bg-[#f5f2eb] flex items-center justify-center">
						<span className="text-[10px] text-muted-gray font-mono uppercase tracking-widest">
							Loading HD...
						</span>
					</div>
				)}

				<img
					src={pin.imageUrl}
					alt={pin.title}
					referrerPolicy="no-referrer"
					onLoad={() => setIsLoaded(true)}
					className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${isLoaded ? "opacity-100" : "opacity-0"}`}
				/>

				<div
					id={`pin-overlay-${pin.id}`}
					className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 z-10"
				>
					<div className="flex justify-between items-center">
						<button
							id={`pin-share-btn-${pin.id}`}
							type="button"
							onClick={handleShare}
							title="Copy high-res link"
							className="w-10 h-10 rounded-full bg-white/95 hover:bg-white text-ink flex items-center justify-center transition-all hover:scale-105 active:scale-95"
						>
							<Share2 size={16} />
						</button>
						<button
							id={`pin-like-btn-${pin.id}`}
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								onLikeToggle(pin.id);
							}}
							title={liked ? "Unlike" : "Like"}
							className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${liked ? "bg-brand-red text-white" : "bg-white/95 hover:bg-white text-ink hover:text-brand-red"}`}
						>
							<Heart
								size={16}
								fill={liked ? "currentColor" : "none"}
							/>
						</button>
					</div>

					<div className="flex justify-center">
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							whileHover={{ scale: 1.1, opacity: 1 }}
							className="w-12 h-12 rounded-full bg-brand-red/95 text-white flex items-center justify-center backdrop-blur-sm"
						>
							<Maximize2 size={20} />
						</motion.div>
					</div>

					<div className="text-white">
						<p className="font-serif italic font-medium text-base truncate drop-shadow-sm">
							{pin.title}
						</p>
						<div className="flex justify-between items-center mt-1">
							<span className="text-[11px] text-white/85 font-mono">
								by {pin.author}
							</span>
							<div className="flex gap-1">
								{pin.tags.slice(0, 1).map((tag) => (
									<span
										key={tag}
										className="text-[9px] font-bold bg-white/20 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-sm"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				id={`pin-footer-${pin.id}`}
				className="p-4 bg-white flex flex-col justify-between"
			>
				<div className="flex justify-between items-start">
					<h3 className="font-serif italic text-[15px] font-medium text-ink truncate flex-1 pr-2">
						{pin.title}
					</h3>
					<span className="text-[11px] font-mono text-muted-gray shrink-0 flex items-center gap-1 mt-0.5">
						<Heart
							size={11}
							className={`${liked ? "text-brand-red fill-brand-red" : "text-muted-gray"}`}
						/>
						<span>{pin.likes}</span>
					</span>
				</div>
				<div className="flex justify-between items-center mt-3 pt-2.5 border-t border-[#f0ede6]">
					<div className="flex items-center gap-1.5">
						<div className="w-5 h-5 rounded-full bg-[#efefef] text-ink text-[10px] font-bold flex items-center justify-center shrink-0 uppercase border border-[#e5e1da]">
							{pin.author.charAt(0)}
						</div>
						<span className="text-xs text-body truncate max-w-[100px]">
							{pin.author}
						</span>
					</div>
					<span className="text-[9px] font-bold bg-[#f5f2eb] text-[#8e8e8e] px-2.5 py-0.5 rounded-full text-right uppercase tracking-wider">
						{pin.category}
					</span>
				</div>
			</div>
		</motion.div>
	);
}
