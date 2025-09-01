import { peopleStore } from "@/stores";
import { useEffect } from "react";
import { type PeopleInterface } from "@/interfaces";

const filterStrategies: Record<string, (person: PeopleInterface) => boolean> = {
	tpapproved: (person) => person.tpapproved,
	techskills: (person) => person.techskills,
	regularpionner: (person) => person.regularpionner,
	male: (person) => person.gender === "male",
	female: (person) => person.gender === "female",
	inactive: (person) => !person.active,
};

const normalizeString = (str: string) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const useFilters = () => {
	const { filterBy, setFilterBy, setFilteredPeopleList, people } =
		peopleStore();

	useEffect(() => {
		applyFilter(filterBy, "");
	}, [people]);

	const applyFilter = (filterKeys: string[], filterString: string) => {
		const currentFilterKeys = Array.isArray(filterKeys) ? filterKeys : [];
		setFilterBy(currentFilterKeys);

		const filteredPeople = people.filter((person) => {
			const isInactiveFilterSelected = currentFilterKeys.includes("inactive");

			const passesActivityCheck = isInactiveFilterSelected
				? !person.active
				: person.active;

			const passesStringFilter = !filterString
				? true
				: (() => {
						if (!person.fullname) return false;
						const normalizedFullname = normalizeString(
							person.fullname
						).toLowerCase();
						const normalizedFilterString =
							normalizeString(filterString).toLowerCase();
						return normalizedFullname
							.split(" ")
							.some((word) => word.startsWith(normalizedFilterString));
				  })();

			const otherFilterKeys = currentFilterKeys.filter(
				(key) => key !== "inactive"
			);

			const passesToggleFilters =
				otherFilterKeys.length === 0
					? true
					: otherFilterKeys.every((key) => {
							const filterFn = filterStrategies[key];

							return filterFn ? filterFn(person) : true;
					  });

			return passesActivityCheck && passesStringFilter && passesToggleFilters;
		});

		setFilteredPeopleList(filteredPeople);
	};

	return { applyFilter };
};
