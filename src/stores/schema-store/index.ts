import { create } from "zustand";
import { devtools, type DevtoolsOptions } from "zustand/middleware";
import type { StateCreator } from "zustand";
import type { Places, TimeRange, SchemaListItem } from "@/interfaces";

const isDevelopment = import.meta.env.DEV;

interface SchemaState {
	schema: any; // TO DO - apply and type properly
	isLoading: boolean;
	places: Places | [];
	timeRange: TimeRange | [];
	weekDayId: string | null;
	schemaList: SchemaListItem[];
	schemaId: string;

	setSchema: (schema: any) => void;
	setIsLoading: (isLoading: boolean) => void;
	setPlaces: (places: Places) => void;
	setTimeRange: (timeRange: TimeRange) => void;
	setWeekDayId: (weekDayId: string) => void;
	setSchemaList: (schemaList: SchemaListItem[]) => void;
	setSchemaId: (schemaId: string) => void;
}

const storeCreator: StateCreator<SchemaState> = (set) => ({
	schema: null,
	isLoading: false,
	places: [],
	timeRange: [],
	weekDayId: null,
	schemaList: [],
	schemaId: "",

	setSchema: (schema: any) => set({ schema }),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
	setPlaces: (places: Places) => set({ places }),
	setTimeRange: (timeRange: TimeRange) => set({ timeRange }),
	setWeekDayId: (weekDayId: string | null) => set({ weekDayId }),
	setSchemaList: (schemaList: SchemaListItem[]) => set({ schemaList }),
	setSchemaId: (schemaId: string) => set({ schemaId }),
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
