import { create } from "zustand";
import { devtools, type DevtoolsOptions } from "zustand/middleware";
import { type PeopleInterface } from "@/interfaces";
import { type StateCreator } from "zustand";

const isDevelopment = import.meta.env.DEV;

interface PeopleStore {
	people: PeopleInterface[];
	sortedPeopleList: PeopleInterface[];
	isLoading: boolean;
	isDialogLoading: boolean;
	sortBy: string | null;

	setPeople: (people: PeopleInterface[]) => void;
	setSortedPeopleList: (sortedPeopleList: PeopleInterface[]) => void;
	setIsLoading: (isLoading: boolean) => void;
	setIsDialogLoading: (isDialogLoading: boolean) => void;
	setSortBy: (sortBy: string | null) => void;
}

const storeCreator: StateCreator<PeopleStore> = (set) => ({
	people: [],
	sortedPeopleList: [],
	isLoading: false,
	isDialogLoading: false,
	sortBy: "tpapproved",

	setPeople: (people: PeopleInterface[]) => set({ people }),
	setSortedPeopleList: (sortedPeopleList: PeopleInterface[]) =>
		set({ sortedPeopleList }),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
	setIsDialogLoading: (isDialogLoading: boolean) => set({ isDialogLoading }),
	setSortBy: (sortBy: string | null) => set({ sortBy }),
});

const createStoreWithMiddleware = isDevelopment
	? create<PeopleStore>()(
			devtools(
				storeCreator as any,
				{ name: "TP People Store" } as DevtoolsOptions
			)
	  )
	: create<PeopleStore>()(storeCreator);

export const peopleStore = createStoreWithMiddleware;
