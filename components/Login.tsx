import { Button } from "@/components/ui/button";
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
	return (
		<div className="w-full max-w-md">
			<form>
				<FieldGroup>
					<FieldSet>
						<FieldLegend>Prove your worth 😋</FieldLegend>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name-input">
									Name
								</FieldLabel>
								<Input
									id="name-input"
									placeholder="Narendra Modi"
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="password-input">
									Password
								</FieldLabel>
								<Input
									id="password-input"
									placeholder="••••••••"
									required
								/>
							</Field>
						</FieldGroup>

						<Field orientation="horizontal">
							<Button type="submit">Submit</Button>
							<Button variant="outline" type="button">
								Cancel
							</Button>
						</Field>
					</FieldSet>
				</FieldGroup>
			</form>
		</div>
	);
}
