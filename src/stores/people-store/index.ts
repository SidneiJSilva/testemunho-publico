import { create } from "zustand";
import { devtools, type DevtoolsOptions } from "zustand/middleware";
import { type PeopleInterface } from "@/interfaces";
import { type StateCreator } from "zustand";

const isDevelopment = import.meta.env.DEV;

interface PeopleStore {
	people: PeopleInterface[];
	isLoading: boolean;

	setPeople: (people: PeopleInterface[]) => void;
	setIsLoading: (isLoading: boolean) => void;
}

const storeCreator: StateCreator<PeopleStore> = (set) => ({
	people: [],
	isLoading: false,

	setPeople: (people: PeopleInterface[]) => set({ people }),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
});

const createStoreWithMiddleware = isDevelopment
	? create<PeopleStore>()(
			devtools(storeCreator as any, { name: "My Store" } as DevtoolsOptions)
	  )
	: create<PeopleStore>()(storeCreator);

export const peopleStore = createStoreWithMiddleware;
