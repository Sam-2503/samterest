import Login from "@/components/Login";
import { auth0 } from "@/lib/auth0";

export default async function Home() {
	// Check if user is authenticated
	const session = await auth0.getSession();

	if (!session) {
		return (
			<>
				<div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
					<Login />
				</div>
			</>
		);
	}

	return (
		<>
			<p>Logged in as {session.user.email}</p>

			{/* Display user info (name, email, etc.) */}
			<h1>User Profile</h1>
			<pre>{JSON.stringify(session.user, null, 2)}</pre>

			{/* Ends the session and redirects to Auth0 to log out */}
			<a href="/auth/logout">Logout</a>
		</>
	);
}
