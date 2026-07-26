"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			console.error(error);
			setLoading(false);
			return;
		}

		router.replace("/dashboard");
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-100 via-white to-red-50 px-4 py-8">
			<div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8 lg:p-10">
				<div className="mb-8 text-center sm:mb-10">
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
						Samterest
					</h1>

					<p className="mt-2 text-sm text-neutral-500 sm:text-base">
						Welcome back! Sign in to continue.
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="space-y-5 sm:space-y-6"
				>
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>

							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
								className="mt-2 h-11 rounded-xl sm:h-12"
								required
							/>
						</Field>

						<Field>
							<FieldLabel htmlFor="password">Password</FieldLabel>

							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className="mt-2 h-11 rounded-xl sm:h-12"
								required
							/>
						</Field>
					</FieldGroup>

					<Button
						type="submit"
						disabled={loading}
						className="h-11 w-full rounded-xl bg-red-600 text-sm font-medium hover:bg-red-700 sm:h-12 sm:text-base"
					>
						{loading ? "Logging in..." : "Log In"}
					</Button>
				</form>
			</div>
		</div>
	);
}
