import { SidebarContext } from "@/contexts";
import { useContext } from "react";

export function useSidebar() {
	const context = useContext(SidebarContext);

	if (!context)
		throw new Error(
			"Context not found: You are trying to access SidebarContext outside of its provider.",
		);

	return context;
}
