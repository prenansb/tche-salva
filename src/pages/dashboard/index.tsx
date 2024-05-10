import { Missing } from "@/pages/dashboard/components/missing";
import { Sidebar } from "@/pages/dashboard/components/sidebar";

export function Dashboard() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<Sidebar />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<Missing />
			</div>
		</div>
	);
}
