import { create } from "zustand";
import { devtools, type DevtoolsOptions } from "zustand/middleware";
import { type PeopleInterface } from "@/interfaces";
import { type StateCreator } from "zustand";

const isDevelopment = import.meta.env.DEV;

interface PeopleStore {
	people: PeopleInterface[];
	filteredPeopleList: PeopleInterface[];
	isLoading: boolean;
	isDialogLoading: boolean;
	filterBy: string[];

	setPeople: (people: PeopleInterface[]) => void;
	setFilteredPeopleList: (filteredPeopleList: PeopleInterface[]) => void;
	setIsLoading: (isLoading: boolean) => void;
	setIsDialogLoading: (isDialogLoading: boolean) => void;
	setFilterBy: (filterBy: string[]) => void;
}

const storeCreator: StateCreator<PeopleStore> = (set) => ({
	people: [],
	filteredPeopleList: [],
	isLoading: false,
	isDialogLoading: false,
	filterBy: ["tpapproved"],

	setPeople: (people: PeopleInterface[]) => set({ people }),
	setFilteredPeopleList: (filteredPeopleList: PeopleInterface[]) =>
		set({ filteredPeopleList }),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
	setIsDialogLoading: (isDialogLoading: boolean) => set({ isDialogLoading }),
	setFilterBy: (filterBy: string[]) => set({ filterBy }),
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
