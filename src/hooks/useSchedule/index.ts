import { scheduleStore } from "@/stores/schedule-store";
import { scheduleService } from "@/services/schedule-service";

export function useSchedule() {
	const { schedule, setSchedule } = scheduleStore();

	const fetchSchedule = async (startDate?: string, endDate?: string) => {
		const data = await scheduleService.fetchSchedule(startDate, endDate);
		setSchedule(data);
	};

	return { schedule, fetchSchedule };
}
