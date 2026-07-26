import { redirect } from "next/navigation";
export function Home() {
	redirect("/dashboard");
	return (
		<div>
			<h1>Welcome to Samterest</h1>
		</div>
	);
}
export default Home;
