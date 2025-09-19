import ScheduleList from "../organisms/ScheduleList";
import { usePeople, useSchema, useSchedule } from "@/hooks";
import { useEffect } from "react";
import { peopleStore, schemaStore, scheduleStore } from "@/stores";

const Schedule = () => {
	const { fetchPeople } = usePeople();
	const { people } = peopleStore();

	const { fetchSchema, fetchPlaces, fetchTimeRange } = useSchema();
	const { fetchSchedule } = useSchedule();
	const { schema, places, timeRange } = schemaStore();
	const { schedule } = scheduleStore();

	useEffect(() => {
		const fetchData = async () => {
			if (people.length === 0) await fetchPeople();
			if (!schema) await fetchSchema();
			if (!schedule) await fetchSchedule();
			if (Array.isArray(places) && !places.length) await fetchPlaces();
			if (Array.isArray(timeRange) && !timeRange.length) await fetchTimeRange();
		};
		fetchData();
	}, []);

	return <ScheduleList />;
};

export default Schedule;
