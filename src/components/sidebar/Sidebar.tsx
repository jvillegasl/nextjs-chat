import { ContactsSearchBar } from "./ContactsSearchBar";
import { ConversationsList } from "./ConversationsList";
import { UserProfile } from "./UserProfile";

export function Sidebar() {
	return (
		<div>
			<UserProfile />

			<ContactsSearchBar />

			<ConversationsList />
		</div>
	);
}
