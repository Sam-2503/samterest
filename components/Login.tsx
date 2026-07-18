"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";

import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) {
			console.error(error);
			return;
		}
	}

	return (
		<div className="w-full max-w-md">
			<form onSubmit={handleSubmit}>
				<FieldGroup>
					<FieldSet>
						<FieldLegend>Prove your worth 😋</FieldLegend>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="email-input">
									Email
								</FieldLabel>
								<Input
									id="email-input"
									name="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="narendra.modi@bjp.tmkc"
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="password-input">
									Password
								</FieldLabel>
								<Input
									id="password-input"
									name="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									placeholder="••••••••"
									required
								/>
							</Field>
						</FieldGroup>

						<Field orientation="horizontal">
							<Button type="submit">Submit</Button>
						</Field>
					</FieldSet>
				</FieldGroup>
			</form>
		</div>
	);
}
