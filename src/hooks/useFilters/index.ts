import { peopleStore } from "@/stores";
import { useEffect } from "react";

export const useFilters = () => {
	const { sortBy, setSortBy, setSortedPeopleList, people } = peopleStore();

	useEffect(() => {
		applyFilter(sortBy);
	}, [people]);

	const applyFilter = (sortKey: string | null) => {
		setSortBy(sortKey);

		let sortedPeople = [...people];

		if (sortKey) {
			sortedPeople = people.filter((person) => {
				if (sortKey === "tpapproved") return person.tpapproved;
				if (sortKey === "techskills") return person.techskills;
				if (sortKey === "regularpionner") return person.regularpionner;
				if (sortKey === "male") return person.gender === "male";
				if (sortKey === "female") return person.gender === "female";
			});
		}

		setSortedPeopleList(sortedPeople);
	};

	return { applyFilter };
};
