"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, LogOut, Image, Filter } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import PinCard from "../../lib/components/PinCard";
import PinDetailModal from "../../lib/components/PinDetailModal";
import UploadModal from "$lib/components/UploadModal";
import { CATEGORIES, getStoredPins, savePins } from "../data";
import type { Pin } from "../types";

export default function App() {
	const router = useRouter();
	const [isHydrated, setIsHydrated] = useState(false);
	const [currentUser, setCurrentUser] = useState<string | null>(null);
	const [pins, setPins] = useState<Pin[]>([]);
	const [userLikes, setUserLikes] = useState<string[]>([]);
	const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
	const [isUploadOpen, setIsUploadOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

	useEffect(() => {
		const user = localStorage.getItem("samterest_user");
		if (!user) {
			router.push("/");
			return;
		}
		setCurrentUser(user);
		setPins(getStoredPins());
		const savedLikes = localStorage.getItem("samterest_likes");
		setUserLikes(savedLikes ? JSON.parse(savedLikes) : []);
		setIsHydrated(true);
	}, [router]);

	useEffect(() => {
		if (!isHydrated) return;
		localStorage.setItem("samterest_likes", JSON.stringify(userLikes));
	}, [isHydrated, userLikes]);

	useEffect(() => {
		if (!isHydrated) return;
		savePins(pins);
	}, [isHydrated, pins]);

	const handleLogout = () => {
		localStorage.removeItem("samterest_user");
		router.push("/");
	};

	const handleLikeToggle = (pinId: string) => {
		const isLiked = userLikes.includes(pinId);

		setUserLikes((prev) =>
			isLiked ? prev.filter((id) => id !== pinId) : [...prev, pinId],
		);

		setPins((prevPins) =>
			prevPins.map((pin) =>
				pin.id === pinId
					? {
							...pin,
							likes: isLiked
								? Math.max(0, pin.likes - 1)
								: pin.likes + 1,
						}
					: pin,
			),
		);

		if (selectedPin && selectedPin.id === pinId) {
			setSelectedPin((prev) =>
				prev
					? {
							...prev,
							likes: isLiked
								? Math.max(0, prev.likes - 1)
								: prev.likes + 1,
						}
					: null,
			);
		}
	};

	const handleAddPin = (
		newPinData: Omit<Pin, "id" | "likes" | "createdAt">,
	) => {
		const newPin: Pin = {
			...newPinData,
			id: `pin-${Date.now()}`,
			likes: 0,
			createdAt: new Date().toISOString(),
		};

		setPins((prevPins) => [newPin, ...prevPins]);
	};

	const filteredPins = pins.filter((pin) => {
		const matchesCategory =
			selectedCategory === "All" ||
			pin.category.toLowerCase() === selectedCategory.toLowerCase();
		const lowerQuery = searchQuery.toLowerCase().trim();
		const matchesSearch =
			!lowerQuery ||
			pin.title.toLowerCase().includes(lowerQuery) ||
			(pin.description &&
				pin.description.toLowerCase().includes(lowerQuery)) ||
			pin.author.toLowerCase().includes(lowerQuery) ||
			pin.tags.some((tag) => tag.toLowerCase().includes(lowerQuery));

		return matchesCategory && matchesSearch;
	});

	const relatedPins = selectedPin
		? pins.filter(
				(pin) =>
					pin.id !== selectedPin.id &&
					pin.category === selectedPin.category,
			)
		: [];

	if (!isHydrated) {
		return <div className="min-h-screen bg-[#f9f8f6]" />;
	}

	if (!currentUser) {
		return <div className="min-h-screen bg-[#f9f8f6]" />;
	}

	return (
		<div
			id="samterest-app"
			className="min-h-screen bg-[#f9f8f6] flex flex-col font-sans antialiased text-[#1a1a1a]"
		>
			<header
				id="app-header"
				className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e5e1da] h-20 flex items-center px-4 sm:px-6 lg:px-8"
			>
				<div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
					<div
						id="header-brand"
						className="flex items-center gap-2 shrink-0"
					>
						<span className="text-3xl font-black tracking-tighter text-[#e60023] font-serif italic select-none">
							S.
						</span>
						<div className="hidden sm:flex gap-4 text-xs font-bold uppercase tracking-widest pl-2">
							<span className="text-[#1a1a1a] border-b-2 border-black pb-1">
								Feed
							</span>
							<span className="text-[#8e8e8e] hover:text-black transition-colors cursor-default">
								Archive
							</span>
						</div>
					</div>

					<div
						id="header-search"
						className="flex-1 max-w-xl mx-2 sm:mx-6 relative"
					>
						<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
							<Search size={16} />
						</div>
						<input
							id="global-search-input"
							type="text"
							placeholder="Search for inspiration..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="block w-full h-[44px] pl-10 pr-4 py-2 bg-[#efefef] hover:bg-[#efefef]/80 rounded-full border border-transparent focus:bg-white focus:border-[#e5e1da] outline-none transition-all text-sm text-[#1a1a1a] placeholder-[#8e8e8e]"
						/>
						{searchQuery && (
							<button
								id="clear-search-btn"
								onClick={() => setSearchQuery("")}
								className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-muted-gray hover:text-ink font-bold uppercase tracking-widest"
							>
								Clear
							</button>
						)}
					</div>

					<div
						id="header-actions"
						className="flex items-center gap-3 shrink-0"
					>
						<button
							id="header-upload-btn"
							onClick={() => setIsUploadOpen(true)}
							className="h-[44px] px-6 rounded-full bg-[#e60023] hover:bg-[#b3001b] text-white text-xs font-bold uppercase tracking-tighter shadow-lg shadow-red-200/50 flex items-center gap-2 transition-colors cursor-pointer"
						>
							<Plus size={16} />
							<span className="hidden md:inline">Upload</span>
						</button>

						<div className="flex items-center gap-1.5 border-l border-[#e5e1da] pl-3">
							<div
								title={`Logged in as ${currentUser}`}
								className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white shadow-sm text-white font-bold text-xs flex items-center justify-center select-none uppercase"
							>
								{currentUser.charAt(0)}
							</div>
							<button
								id="header-signout-btn"
								onClick={handleLogout}
								title="Sign out of session"
								className="p-2.5 rounded-full hover:bg-[#efefef] text-[#8e8e8e] hover:text-ink transition-colors cursor-pointer"
							>
								<LogOut size={16} />
							</button>
						</div>
					</div>
				</div>
			</header>

			<nav
				id="categories-bar"
				className="bg-white border-b border-[#e5e1da] py-3.5 px-4 sm:px-6"
			>
				<div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
					<div className="flex items-center gap-1.5 shrink-0">
						<Filter size={13} className="text-[#8e8e8e]" />
						<span className="text-[10px] font-bold uppercase tracking-widest text-[#8e8e8e] mr-2">
							Curation Filters
						</span>
					</div>

					<div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
						{CATEGORIES.map((category) => {
							const isSelected = selectedCategory === category;
							return (
								<button
									key={category}
									id={`cat-filter-${category}`}
									onClick={() =>
										setSelectedCategory(category)
									}
									className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shrink-0 cursor-pointer ${
										isSelected
											? "bg-ink text-white shadow-sm"
											: "bg-[#efefef] text-[#8e8e8e] hover:text-[#1a1a1a] hover:bg-[#e5e1da]"
									}`}
								>
									{category}
								</button>
							);
						})}
					</div>

					<div className="text-[10px] font-bold uppercase tracking-widest text-[#8e8e8e] shrink-0 hidden md:block">
						Showing{" "}
						<strong className="text-ink">
							{filteredPins.length}
						</strong>{" "}
						design assets
					</div>
				</div>
			</nav>

			<main
				id="main-content"
				className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
			>
				<div
					id="welcome-hero"
					className="mb-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 border-b border-[#e5e1da] pb-6"
				>
					<div>
						<h1 className="text-4xl sm:text-5xl font-serif italic font-light tracking-tight text-ink">
							Today's{" "}
							<span className="font-bold not-italic font-sans">
								Curation
							</span>
						</h1>
						<p className="text-body text-sm sm:text-base max-w-xl mt-1 leading-relaxed">
							Explore and upload immersive photography and
							designs. Tap any item to inspect its high-resolution
							canvas.
						</p>
					</div>
					<div className="text-[10px] font-bold uppercase tracking-widest text-[#8e8e8e] shrink-0">
						Volume 04 // Spring Archive
					</div>
				</div>

				{filteredPins.length > 0 ? (
					<div id="samterest-masonry" className="masonry-grid">
						{filteredPins.map((pin) => (
							<PinCard
								key={pin.id}
								pin={pin}
								onSelect={setSelectedPin}
								onLikeToggle={handleLikeToggle}
								liked={userLikes.includes(pin.id)}
							/>
						))}
					</div>
				) : (
					<motion.div
						id="empty-state"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex flex-col items-center justify-center py-20 px-4 text-center border border-dashed border-[#e5e1da] rounded-3xl bg-white max-w-xl mx-auto"
					>
						<div className="w-12 h-12 rounded-full bg-[#f5f2eb] text-[#8e8e8e] flex items-center justify-center mb-4">
							<Image size={24} />
						</div>
						<h3 className="font-serif italic text-xl font-semibold text-ink">
							No matching artifacts found
						</h3>
						<p className="text-body text-sm mt-1 max-w-sm">
							We couldn't find any pins matching your current
							search "{searchQuery}" or category. Try clearing
							filters to resume exploring.
						</p>
						<div className="flex gap-2 mt-6">
							{searchQuery && (
								<button
									id="reset-search-btn"
									onClick={() => setSearchQuery("")}
									className="px-4 py-1.5 rounded-full bg-[#efefef] hover:bg-[#e5e1da] text-ink text-xs font-semibold cursor-pointer"
								>
									Clear Search
								</button>
							)}
							{selectedCategory !== "All" && (
								<button
									id="reset-category-btn"
									onClick={() => setSelectedCategory("All")}
									className="px-4 py-1.5 rounded-full bg-brand-red text-white text-xs font-semibold hover:bg-brand-red-active cursor-pointer"
								>
									Show All Categories
								</button>
							)}
						</div>
					</motion.div>
				)}
			</main>

			<footer
				id="app-footer"
				className="bg-[#f9f8f6] border-t border-[#e5e1da] py-12 px-4 sm:px-6 lg:px-8 mt-12 text-center"
			>
				<div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e8e8e]">
					<div className="flex items-center gap-2">
						<span className="text-2xl font-black tracking-tighter text-brand-red font-serif italic select-none">
							S.
						</span>
						<span className="font-mono text-[9px] bg-[#e5e1da] px-2 py-0.5 rounded text-ink uppercase tracking-wider">
							V2.4.0
						</span>
					</div>
					<p className="font-serif italic text-[13px] text-body leading-relaxed max-w-md sm:text-right">
						Designed for Sam & friends. Rendered with premium
						high-resolution instant loading.
					</p>
					<p className="font-mono text-[10px] uppercase tracking-widest text-[#8e8e8e]">
						UTC: 2026-07-13
					</p>
				</div>
			</footer>

			<AnimatePresence>
				{selectedPin && (
					<PinDetailModal
						pin={selectedPin}
						onClose={() => setSelectedPin(null)}
						onLikeToggle={handleLikeToggle}
						liked={userLikes.includes(selectedPin.id)}
						relatedPins={relatedPins}
						onSelectRelatedPin={(pin) => {
							setSelectedPin(pin);
							const modalElement =
								document.getElementById("pin-detail-modal");
							if (modalElement)
								modalElement.scrollTo({
									top: 0,
									behavior: "smooth",
								});
						}}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{isUploadOpen && (
					<UploadModal
						onClose={() => setIsUploadOpen(false)}
						onUpload={handleAddPin}
						currentUser={currentUser}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
