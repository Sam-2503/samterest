import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Plus } from "lucide-react";

export default function DialogDemo() {
	return (
		<Dialog>
			<form>
				<DialogTrigger
					render={
						<Button>
							<Plus />
						</Button>
					}
				/>
				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when
							you&apos;re done.
						</DialogDescription>
					</DialogHeader>

					<Field>
						<FieldLabel htmlFor="picture">Picture</FieldLabel>
						<Input id="picture" type="file" />
						<FieldDescription>
							Select a picture to upload.
						</FieldDescription>
					</Field>

					<DialogFooter>
						<DialogClose
							render={<Button variant="outline">Cancel</Button>}
						/>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
