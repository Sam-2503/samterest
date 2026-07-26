"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
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
		console.log("Submit button Clicked");
		setLoading(true);

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		console.log("Login:", data, error);

		const {
			data: { session },
		} = await supabase.auth.getSession();

		console.log("Session after login:", session);

		if (error) {
			console.error(error);
			setLoading(false);
			return;
		}
		console.log("After Signing In");
		console.log("Login successful", data);
		console.log(error);
		console.log("Redirecting to dashboard...");
		router.replace("/dashboard");
		console.log("This should never print");
		setLoading(false);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-100 via-white to-red-50 px-4">
			<div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-10 shadow-xl">
				<div className="mb-10 text-center">
					<h1 className="text-3xl font-bold tracking-tight">
						Samterest
					</h1>

					<p className="mt-2 text-neutral-500">
						Welcome back! Sign in hehe.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>

							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
								className="mt-2 h-12 rounded-xl"
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
								className="mt-2 h-12 rounded-xl"
								required
							/>
						</Field>
					</FieldGroup>

					<Button
						type="submit"
						disabled={loading}
						className="h-12 w-full rounded-xl bg-red-600 text-base hover:bg-red-700"
					>
						{loading ? "Logging in..." : "Log In"}
					</Button>
				</form>
			</div>
		</div>
	);
}
