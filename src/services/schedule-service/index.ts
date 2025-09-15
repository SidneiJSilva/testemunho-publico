import { generateMockSchedule } from "@/utils/scheduleMock";
import dayjs from "dayjs";

export const scheduleService = {
	async fetchSchedule(startDate?: string, endDate?: string) {
		// futuramente: chamada ao Supabase
		const start = startDate ? dayjs(startDate) : dayjs();
		const end = endDate ? dayjs(endDate) : start.add(4, "week");
		return generateMockSchedule(start, end);
	},
};
