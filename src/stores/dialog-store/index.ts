import { create } from "zustand";
import { devtools, type DevtoolsOptions } from "zustand/middleware";
import type { StateCreator } from "zustand";

const isDevelopment = import.meta.env.DEV;

interface DialogState {
	openNewPlaceDialog: boolean;

	setOpenNewPlaceDialog: (openNewPlaceDialog: boolean) => void;
}

const storeCreator: StateCreator<DialogState> = (set) => ({
	openNewPlaceDialog: false,

	setOpenNewPlaceDialog: (openNewPlaceDialog: boolean) =>
		set({ openNewPlaceDialog }),
});

const createStoreWithMiddleware = isDevelopment
	? create<DialogState>()(
			devtools(
				storeCreator as any,
				{
					name: "TP Dialog Store",
				} as DevtoolsOptions
			)
	  )
	: create<DialogState>()(storeCreator);

export const dialogStore = createStoreWithMiddleware;
