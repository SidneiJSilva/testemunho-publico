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
	const { filterBy, setFilterBy, setFilteredPeopleList, people } =
		peopleStore();

	useEffect(() => {
		applyFilter(filterBy, "");
	}, [people]);

	const applyFilter = (filterKeys: string[], filterString: string) => {
		setFilterBy(filterKeys);

		if (!filterKeys || filterKeys.length === 0) {
			setFilteredPeopleList([...people]);
			return;
		}

		const filteredPeople = people.filter((person) => {
			const passesToggleFilters =
				filterKeys.length === 0
					? true
					: filterKeys.every((key) => {
							const filterFn = filterStrategies[key];
							return filterFn ? filterFn(person) : true;
					  });

			const passesStringFilter = !filterString
				? true
				: person.fullname?.toLowerCase().includes(filterString.toLowerCase());

			return passesToggleFilters && passesStringFilter;
		});

		setFilteredPeopleList(filteredPeople);
	};

	return { applyFilter };
};
