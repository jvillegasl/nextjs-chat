import { SidebarProvider } from "@/providers";
import { ContactsSearchBar } from "./ContactsSearchBar";
import { UserProfile } from "./UserProfile";
import { SidebarBody } from "./SidebarBody";

type SidebarProps = {
	className?: string;
};

export function Sidebar({ className }: SidebarProps) {
	return (
		<div className={className}>
			<SidebarProvider>
				<UserProfile />
				<ContactsSearchBar />
				<SidebarBody />
			</SidebarProvider>
		</div>
	);
}
