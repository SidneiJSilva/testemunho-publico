// stores/scheduleStore.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import dayjs, { Dayjs } from "dayjs";
import { generateMockSchedule } from "@/utils/scheduleMock";

interface ScheduleStore {
	startDate: Dayjs;
	endDate: Dayjs;
	schedule: any; // aqui você pode tipar melhor depois
	isLoading: boolean;

	setDates: (start: Dayjs, end: Dayjs, schema: any) => void;
	generateSchedule: () => void;
}

export const scheduleStore = create<ScheduleStore>()(
	devtools((set, get) => ({
		startDate: dayjs().startOf("week").add(1, "day"),
		endDate: dayjs().startOf("week").add(1, "day").add(4, "week"),
		schedule: {},
		isLoading: false,

		setDates: (start, end, schema) => {
			set({ startDate: start, endDate: end });
			// recalcula sempre que altera
			const schedule = generateMockSchedule(start, end, schema);
			set({ schedule });
		},

		generateSchedule: () => {
			const { startDate, endDate } = get();
			const schedule = generateMockSchedule(startDate, endDate, { schema: {} });
			set({ schedule });
		},
	}))
);
