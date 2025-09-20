import { create } from "zustand";
import { devtools, type DevtoolsOptions } from "zustand/middleware";
import type { StateCreator } from "zustand";

const isDevelopment = import.meta.env.DEV;

interface DialogState {
	openNewPlaceDialog: boolean;
	isDialogLoading: boolean;

	setOpenNewPlaceDialog: (openNewPlaceDialog: boolean) => void;
	setIsDialogLoading: (isDialogLoading: boolean) => void;
}

const storeCreator: StateCreator<DialogState> = (set) => ({
	openNewPlaceDialog: false,
	isDialogLoading: false,

	setOpenNewPlaceDialog: (openNewPlaceDialog: boolean) =>
		set({ openNewPlaceDialog }),
	setIsDialogLoading: (isDialogLoading: boolean) => set({ isDialogLoading }),
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
