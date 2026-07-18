/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Pin } from "./types";

export const INITIAL_PINS: Pin[] = [
	{
		id: "pin-1",
		title: "Minimalist Spiral Geometry",
		description:
			"An elegant perspective of concrete architectural spiral steps. Perfect harmony of shadows and high-contrast lines.",
		imageUrl:
			"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
		author: "Sam",
		createdAt: "2026-07-10T14:32:00Z",
		likes: 142,
		tags: ["Architecture", "Minimalist", "Geometry", "Shadows"],
		category: "Architecture",
		aspectRatio: "aspect-[2/3]",
	},
	{
		id: "pin-2",
		title: "Warm Editorial Living Space",
		description:
			"Mid-century modern design corner showcasing warm earth tones, clean oak wood, and a statement green plant.",
		imageUrl:
			"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
		author: "Alex",
		createdAt: "2026-07-11T09:15:00Z",
		likes: 98,
		tags: ["Interior", "Design", "Minimalist", "Cozy"],
		category: "Design",
		aspectRatio: "aspect-[3/4]",
	},
	{
		id: "pin-3",
		title: "The Great Forest Fog",
		description:
			"Deep morning fog settled between towering pine trees in the Pacific Northwest, creating an ethereal green atmosphere.",
		imageUrl:
			"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
		author: "Elena",
		createdAt: "2026-07-12T18:22:00Z",
		likes: 215,
		tags: ["Nature", "Forest", "Ethereal", "Travel"],
		category: "Nature",
		aspectRatio: "aspect-[4/3]",
	},
	{
		id: "pin-4",
		title: "Morning Brew Routine",
		description:
			"Pour-over coffee dripping slowly on a clean concrete counter next to a minimal ceramic mug. Aesthetic start of the day.",
		imageUrl:
			"https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=1200&q=80",
		author: "Marcus",
		createdAt: "2026-07-13T07:11:00Z",
		likes: 83,
		tags: ["Coffee", "Morning", "Aesthetic", "Daily"],
		category: "Lifestyle",
		aspectRatio: "aspect-[2/3]",
	},
	{
		id: "pin-5",
		title: "Brutalist Concrete Slabs",
		description:
			"High contrast architectural facade from a brutalist library. Interlocking cubes of smooth grey concrete.",
		imageUrl:
			"https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
		author: "Sam",
		createdAt: "2026-07-13T11:45:00Z",
		likes: 121,
		tags: ["Architecture", "Brutalism", "Concrete", "Urban"],
		category: "Architecture",
		aspectRatio: "aspect-[9/16]",
	},
	{
		id: "pin-6",
		title: "Liquid Neon Reflections",
		description:
			"Rainy street night reflections casting fluid blues, pinks, and yellows on wet asphalt.",
		imageUrl:
			"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
		author: "Nico",
		createdAt: "2026-07-13T22:30:00Z",
		likes: 304,
		tags: ["Neon", "Cyberpunk", "Urban", "Abstract"],
		category: "Abstract",
		aspectRatio: "aspect-square",
	},
	{
		id: "pin-7",
		title: "Abstract Ink Waves",
		description:
			"Swirling blue and yellow pigment captured mid-water. Highly detailed high-res abstract artwork.",
		imageUrl:
			"https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
		author: "Chloe",
		createdAt: "2026-07-12T15:00:00Z",
		likes: 177,
		tags: ["Abstract", "Fluid", "Art", "Colorful"],
		category: "Abstract",
		aspectRatio: "aspect-[3/4]",
	},
	{
		id: "pin-8",
		title: "Majestic Peaks",
		description:
			"Epic light kissing the snowy peaks of three sisters mountains during autumn sunset.",
		imageUrl:
			"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
		author: "Julian",
		createdAt: "2026-07-09T19:04:00Z",
		likes: 243,
		tags: ["Mountains", "Nature", "Travel", "Sunset"],
		category: "Nature",
		aspectRatio: "aspect-[4/3]",
	},
	{
		id: "pin-9",
		title: "Desert Giant Cacti",
		description:
			"Tall saguaro cacti reaching for a pale blue desert sky. Warm sunrays and dry aesthetic land.",
		imageUrl:
			"https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80",
		author: "Sam",
		createdAt: "2026-07-08T10:20:00Z",
		likes: 156,
		tags: ["Nature", "Desert", "Travel", "Aesthetic"],
		category: "Nature",
		aspectRatio: "aspect-[2/3]",
	},
	{
		id: "pin-10",
		title: "Minimalist Monolith Concept",
		description:
			"Modern art sculpture set in a silent white room. Play of light and simple forms.",
		imageUrl:
			"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
		author: "Sophia",
		createdAt: "2026-07-13T14:10:00Z",
		likes: 92,
		tags: ["Design", "Minimalist", "Art", "Interior"],
		category: "Design",
		aspectRatio: "aspect-[4/3]",
	},
];

export const CATEGORIES = [
	"All",
	"Architecture",
	"Design",
	"Nature",
	"Lifestyle",
	"Abstract",
];

export const getStoredPins = (): Pin[] => {
	const stored = localStorage.getItem("samterest_pins");
	if (stored) {
		try {
			return JSON.parse(stored);
		} catch (error) {
			console.error(
				"Error parsing stored pins, falling back to defaults",
				error,
			);
		}
	}
	return INITIAL_PINS;
};

export const savePins = (pins: Pin[]): void => {
	localStorage.setItem("samterest_pins", JSON.stringify(pins));
};
