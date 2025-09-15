import { create } from "zustand";
import { devtools, type DevtoolsOptions } from "zustand/middleware";
import { type StateCreator } from "zustand";

const isDevelopment = import.meta.env.DEV;

interface SchemaState {
	schema: any; // TO DO - applyze and type properly
	isLoading: boolean;

	setSchema: (schema: any) => void;
	setIsLoading: (isLoading: boolean) => void;
}

const storeCreator: StateCreator<SchemaState> = (set) => ({
	schema: null,
	isLoading: false,

	setSchema: (schema: any) => set({ schema }),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
});

const createStoreWithMiddleware = isDevelopment
	? create<SchemaState>()(
			devtools(
				storeCreator as any,
				{
					name: "TP Schema Store",
				} as DevtoolsOptions
			)
	  )
	: create<SchemaState>()(storeCreator);

export const schemaStore = createStoreWithMiddleware;
