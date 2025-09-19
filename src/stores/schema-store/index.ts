import { create } from "zustand";
import { devtools, type DevtoolsOptions } from "zustand/middleware";
import type { StateCreator } from "zustand";
import type { Places, TimeRange } from "@/interfaces";

const isDevelopment = import.meta.env.DEV;

interface SchemaState {
	schema: any; // TO DO - apply and type properly
	isLoading: boolean;
	places: Places | [];
	timeRange: TimeRange | [];
	weekDayId: string | null;

	setSchema: (schema: any) => void;
	setIsLoading: (isLoading: boolean) => void;
	setPlaces: (places: Places) => void;
	setTimeRange: (timeRange: TimeRange) => void;
	setWeekDayId: (weekDayId: string) => void;
}

const storeCreator: StateCreator<SchemaState> = (set) => ({
	schema: null,
	isLoading: false,
	places: [],
	timeRange: [],
	weekDayId: null,

	setSchema: (schema: any) => set({ schema }),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
	setPlaces: (places: Places) => set({ places }),
	setTimeRange: (timeRange: TimeRange) => set({ timeRange }),
	setWeekDayId: (weekDayId: string | null) => set({ weekDayId }),
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
