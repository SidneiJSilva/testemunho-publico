import PeopleList from "@/components/organisms/PeopleList";

import { usePeople } from "@/hooks";
import { useEffect } from "react";
import { peopleStore } from "@/stores";

const People = () => {
	const { fetchPeople } = usePeople();
	const { people, filteredPeopleList } = peopleStore();

	useEffect(() => {
		const fetchData = async () => {
			await fetchPeople();
		};

		if (people.length === 0) {
			fetchData();
		}
	}, []);

	return <PeopleList people={filteredPeopleList} />;
};

export default People;
