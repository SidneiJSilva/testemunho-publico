import { scheduleStore } from "@/stores/schedule-store";
import { scheduleService } from "@/services/schedule-service";

export function useSchedule() {
	const { schedule, setSchedule } = scheduleStore();

	const fetchSchedule = async (
		startDate?: string,
		endDate?: string,
		schema: any
	) => {
		const data = await scheduleService.fetchSchedule(
			startDate,
			endDate,
			schema
		);
		setSchedule(data);
	};

	return { schedule, fetchSchedule };
}
