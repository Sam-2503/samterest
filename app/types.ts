/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Pin {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	author: string;
	createdAt: string;
	likes: number;
	tags: string[];
	category: string;
	aspectRatio:
		| "aspect-[3/4]"
		| "aspect-[4/3]"
		| "aspect-[9/16]"
		| "aspect-square"
		| "aspect-[2/3]";
}

export interface User {
	username: string;
	isLoggedIn: boolean;
}
