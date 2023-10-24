import { Dispatch, SetStateAction, createContext } from "react";
import { IUserClient } from "@/models";

type SidebarContext = {
	searchInput: string;
	isSearching: boolean;
	setSearchInput: Dispatch<SetStateAction<string>>;
	searchResults: IUserClient[];
};

export const SidebarContext = createContext<SidebarContext | null>(null);
