import { create } from "zustand";
import { devtools, type DevtoolsOptions } from "zustand/middleware";
import { type StateCreator } from "zustand";

const isDevelopment = import.meta.env.DEV;

interface ScheduleState {
	schedule: any; // TO DO - applyze and type properly
	isLoading: boolean;

	setSchedule: (schedule: any) => void;
	setIsLoading: (isLoading: boolean) => void;
}

const storeCreator: StateCreator<ScheduleState> = (set) => ({
	schedule: null,
	isLoading: false,

	setSchedule: (schedule: any) => set({ schedule }),
	setIsLoading: (isLoading: boolean) => set({ isLoading }),
});

const createStoreWithMiddleware = isDevelopment
	? create<ScheduleState>()(
			devtools(
				storeCreator as any,
				{
					name: "TP Schedule Store",
				} as DevtoolsOptions
			)
	  )
	: create<ScheduleState>()(storeCreator);

export const scheduleStore = createStoreWithMiddleware;
