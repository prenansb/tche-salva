import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
	const { logOut } = useAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		const response = await logOut();

		console.log(response);

		navigate("/");
	};

	return (
		<main className="w-screen h-screen">
			<div className="flex h-[calc(100vh-70px)] w-full flex-col items-center justify-center p-4 lg:p-0">
				<div className="w-full max-w-[450px] space-y-4">
					<div className="w-full space-y-2">
						<h1 className="text-3xl font-bold">TESTE</h1>
						<Button onClick={handleLogout}>Logout</Button>
					</div>
				</div>
			</div>
		</main>
	);
};
