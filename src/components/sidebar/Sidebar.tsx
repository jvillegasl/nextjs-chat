import { ContactsList } from "./ContactsList";
import { ConversationsList } from "./ConversationsList";
import { UserProfile } from "./UserProfile";

export function Sidebar() {
	return (
		<div>
			<h1>Sidebar</h1>

			<UserProfile />

			<ContactsList />

			<ConversationsList />
		</div>
	);
}
