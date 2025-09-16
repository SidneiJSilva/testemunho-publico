import ScheduleList from "../organisms/ScheduleList";
import { usePeople, useSchema, useSchedule } from "@/hooks";
import { useEffect } from "react";
import { peopleStore, schemaStore, scheduleStore } from "@/stores";

const Schedule = () => {
	const { fetchPeople } = usePeople();
	const { people } = peopleStore();

	const { fetchSchema } = useSchema();
	const { fetchSchedule } = useSchedule();
	const { schema } = schemaStore();
	const { schedule } = scheduleStore();

	useEffect(() => {
		const fetchData = async () => {
			if (people.length === 0) await fetchPeople();
			if (!schema) await fetchSchema();
			if (!schedule) await fetchSchedule();
		};
		fetchData();
	}, []);

	return <ScheduleList />;
};

export default Schedule;
