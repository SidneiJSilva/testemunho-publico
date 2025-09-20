import { generateMockSchedule } from "@/utils/scheduleMock";
import dayjs from "dayjs";

export const scheduleService = {
	async fetchSchedule(startDate?: string, endDate?: string, schema?: any) {
		// futuramente: chamada ao Supabase
		const start = startDate ? dayjs(startDate) : dayjs();
		const end = endDate ? dayjs(endDate) : start.add(4, "week");

		console.log("SCHEMA INSIDE SERVICE => ", schema);

		return generateMockSchedule(start, end, schema);
	},
};
