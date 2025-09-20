import ScheduleList from "../organisms/ScheduleList";
import { usePeople, useSchema, useSchedule } from "@/hooks";
import { useEffect } from "react";
import { peopleStore, schemaStore, scheduleStore } from "@/stores";

const Schedule = () => {
	const { fetchPeople } = usePeople();
	const { people } = peopleStore();

	const { fetchSchema, fetchPlaces, fetchTimeRange, fetchSchemaList } =
		useSchema();
	const { fetchSchedule } = useSchedule();
	const { schema, places, timeRange, schemaList, setSchemaId } = schemaStore();
	const { schedule } = scheduleStore();

	useEffect(() => {
		const fetchData = async () => {
			const schemaIdToFetch = schemaList[0]?.id;

			setSchemaId(schemaIdToFetch);

			if (!schema) await fetchSchema(schemaIdToFetch);
			if (!schedule) await fetchSchedule();
		};

		if (schemaList[0]?.id) {
			fetchData();
		}
	}, [schemaList]);

	useEffect(() => {
		const fetchData = async () => {
			if (people.length === 0) await fetchPeople();
			if (Array.isArray(places) && !places.length) await fetchPlaces();
			if (Array.isArray(timeRange) && !timeRange.length) await fetchTimeRange();
			if (Array.isArray(schemaList) && !schemaList.length)
				await fetchSchemaList();
		};
		fetchData();
	}, []);

	return <ScheduleList />;
};

export default Schedule;
