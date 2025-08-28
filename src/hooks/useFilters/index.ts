import { peopleStore } from "@/stores";
import { useEffect } from "react";

type Person = {
	tpapproved: boolean;
	techskills: boolean;
	regularpionner: boolean;
	gender: "male" | "female";
};

const filterStrategies: Record<string, (person: Person) => boolean> = {
	tpapproved: (person) => person.tpapproved,
	techskills: (person) => person.techskills,
	regularpionner: (person) => person.regularpionner,
	male: (person) => person.gender === "male",
	female: (person) => person.gender === "female",
};

export const useFilters = () => {
	const { sortBy, setSortBy, setSortedPeopleList, people } = peopleStore();

	useEffect(() => {
		applyFilter(sortBy);
	}, [people]);

	const applyFilter = (sortKey: string | null) => {
		setSortBy(sortKey);

		const filterFn = sortKey ? filterStrategies[sortKey] : null;

		const filteredPeople = filterFn ? people.filter(filterFn) : [...people];

		setSortedPeopleList(filteredPeople);
	};

	return { applyFilter };
};
