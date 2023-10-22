import { ContactsSearchBar } from "./ContactsSearchBar";
import { ConversationsList } from "./ConversationsList";
import { UserProfile } from "./UserProfile";

type SidebarProps = {
	className?: string;
};

export function Sidebar({ className }: SidebarProps) {
	return (
		<div className={className}>
			<UserProfile />

			<ContactsSearchBar />

			<ConversationsList />
		</div>
	);
}
