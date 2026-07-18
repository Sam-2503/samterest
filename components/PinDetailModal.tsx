"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { Check, Calendar, Copy, ExternalLink, Heart, X } from "lucide-react";
import { motion } from "motion/react";

import type { Pin } from "../app/types";

interface PinDetailModalProps {
	pin: Pin;
	onClose: () => void;
	onLikeToggle: (pinId: string) => void;
	liked: boolean;
	relatedPins: Pin[];
	onSelectRelatedPin: (pin: Pin) => void;
}

export default function PinDetailModal({
	pin,
	onClose,
	onLikeToggle,
	liked,
	relatedPins,
	onSelectRelatedPin,
}: PinDetailModalProps) {
	const [copied, setCopied] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		setIsLoaded(false);
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [pin]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose]);

	const handleCopyLink = () => {
		navigator.clipboard.writeText(pin.imageUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const formattedDate = new Date(pin.createdAt).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	return (
		<div
			id="pin-detail-modal"
			className="fixed inset-0 z-50 overflow-y-auto bg-ink/80 backdrop-blur-md flex justify-center items-start sm:py-8 px-0 sm:px-4"
		>
			<div
				id="modal-backdrop-click"
				className="absolute inset-0 cursor-default"
				onClick={onClose}
			/>
			<motion.div
				id="modal-card"
				initial={{ opacity: 0, scale: 0.95, y: 30 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.95, y: 30 }}
				transition={{ duration: 0.4, ease: "easeOut" }}
				className="relative w-full max-w-5xl bg-[#f9f8f6] rounded-none sm:rounded-[24px] shadow-2xl overflow-hidden z-10 flex flex-col my-auto border border-[#e5e1da]"
			>
				<button
					id="modal-close-btn"
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-ink shadow-md flex items-center justify-center border border-[#e5e1da] hover:scale-105 transition-all cursor-pointer"
				>
					<X size={20} />
				</button>

				<div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px] md:min-h-[550px]">
					<div
						id="modal-image-col"
						className="md:col-span-7 bg-[#f5f2eb] relative flex items-center justify-center min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#e5e1da]"
					>
						{!isLoaded && (
							<div className="absolute inset-0 animate-pulse bg-[#e5e1da] flex flex-col items-center justify-center gap-2">
								<svg
									className="animate-spin h-6 w-6 text-brand-red"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
								<span className="text-xs text-[#8e8e8e] font-mono uppercase tracking-widest">
									Retrieving high-resolution content...
								</span>
							</div>
						)}

						<img
							src={pin.imageUrl}
							alt={pin.title}
							referrerPolicy="no-referrer"
							onLoad={() => setIsLoaded(true)}
							className={`max-w-full max-h-[85vh] object-contain transition-all duration-500 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
						/>
					</div>

					<div
						id="modal-info-col"
						className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white"
					>
						<div className="space-y-6">
							<div className="flex justify-between items-center pb-4 border-b border-[#f0ede6]">
								<span className="text-[10px] bg-brand-red text-white px-3 py-1.5 rounded-full font-sans font-bold uppercase tracking-widest">
									{pin.category}
								</span>

								<div className="flex items-center gap-2">
									<button
										id="modal-like-btn"
										onClick={() => onLikeToggle(pin.id)}
										className={`h-[36px] px-4 rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-all hover:scale-103 active:scale-97 cursor-pointer ${liked ? "bg-brand-red text-white shadow-md shadow-red-200/50" : "bg-[#efefef] hover:bg-[#e5e1da] text-[#1a1a1a] hover:text-brand-red"}`}
									>
										<Heart
											size={14}
											fill={
												liked ? "currentColor" : "none"
											}
										/>
										<span>{pin.likes}</span>
									</button>

									<button
										id="modal-copy-link-btn"
										onClick={handleCopyLink}
										className="h-[36px] w-[36px] rounded-full bg-[#efefef] hover:bg-[#e5e1da] text-[#1a1a1a] flex items-center justify-center transition-all hover:scale-103 cursor-pointer"
										title="Copy URL"
									>
										{copied ? (
											<Check
												size={14}
												className="text-up"
											/>
										) : (
											<Copy size={14} />
										)}
									</button>

									<a
										id="modal-external-link"
										href={pin.imageUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="h-[36px] px-4 rounded-full bg-brand-red hover:bg-brand-red-active text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-all shadow-md shadow-red-200/50"
									>
										<span>HD</span>
										<ExternalLink size={11} />
									</a>
								</div>
							</div>

							<div className="space-y-3">
								<h2 className="text-3xl sm:text-4xl font-serif italic font-light tracking-tight text-ink leading-tight">
									{pin.title}
								</h2>
								<p className="text-body text-[15px] leading-relaxed font-sans">
									{pin.description ||
										"No description provided."}
								</p>
							</div>

							<div className="space-y-3 pt-4 border-t border-[#f0ede6]">
								<div className="flex items-center gap-3">
									<div className="w-9 h-9 rounded-full bg-brand-red text-white text-sm font-bold flex items-center justify-center uppercase border border-[#e5e1da]">
										{pin.author.charAt(0)}
									</div>
									<div>
										<span className="block font-bold text-sm text-ink">
											{pin.author}
										</span>
										<span className="block text-[11px] text-[#8e8e8e] uppercase tracking-wider font-semibold">
											Curator & Publisher
										</span>
									</div>
								</div>

								<div className="flex items-center gap-2 text-[11px] text-[#8e8e8e] pl-1 font-mono pt-1 uppercase tracking-wider">
									<Calendar size={13} />
									<span>Shared on {formattedDate}</span>
								</div>
							</div>

							<div className="space-y-2.5">
								<h4 className="text-[10px] font-bold text-ink uppercase tracking-widest">
									Keywords / Tags
								</h4>
								<div className="flex flex-wrap gap-1.5">
									{pin.tags.map((tag) => (
										<span
											key={tag}
											className="text-xs bg-[#f5f2eb] hover:bg-[#e5e1da] text-[#5e5a54] hover:text-[#1a1a1a] px-3 py-1 rounded-full cursor-default transition-colors border border-[#e5e1da]"
										>
											#{tag}
										</span>
									))}
								</div>
							</div>
						</div>

						<div className="mt-8 pt-4 border-t border-[#f0ede6] text-[10px] text-[#8e8e8e] font-mono flex items-center gap-1.5 uppercase tracking-wider">
							<span className="inline-block w-2 h-2 rounded-full bg-up animate-pulse" />
							<span>
								Instantly fetched from high-resolution source.
							</span>
						</div>
					</div>
				</div>

				{relatedPins.length > 0 && (
					<div
						id="modal-related-section"
						className="bg-[#f5f2eb] p-6 border-t border-[#e5e1da]"
					>
						<h3 className="text-sm font-bold text-ink uppercase tracking-widest mb-4 flex items-center gap-2">
							<span className="font-serif italic text-base font-normal normal-case">
								More Like This
							</span>
							<span className="text-[10px] font-bold text-[#8e8e8e] font-mono uppercase tracking-widest">
								// {pin.category}
							</span>
						</h3>
						<div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
							{relatedPins.slice(0, 5).map((related) => (
								<div
									key={related.id}
									onClick={() => onSelectRelatedPin(related)}
									className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-[#e5e1da] hover:shadow-lg hover:shadow-red-200/25 transition-all duration-300 flex flex-col h-full"
								>
									<div className="relative aspect-[4/3] w-full bg-[#efefef] overflow-hidden">
										<img
											src={related.imageUrl}
											alt={related.title}
											referrerPolicy="no-referrer"
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									</div>
									<div className="p-3 flex flex-col justify-between flex-grow">
										<p className="text-xs font-serif italic text-ink truncate group-hover:text-brand-red transition-colors">
											{related.title}
										</p>
										<span className="text-[10px] text-[#8e8e8e] font-mono mt-1">
											by {related.author}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</motion.div>
		</div>
	);
}
