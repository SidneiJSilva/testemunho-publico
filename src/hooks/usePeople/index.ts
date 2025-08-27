import { PeopleService } from "@/services";
import type {
	PeopleInterface,
	AbsenceInterface,
	NewMemberFamilyInterface,
} from "@/interfaces";
import { peopleStore } from "@/stores";
import { useEffect } from "react";

export const usePeople = () => {
	const {
		setPeople,
		sortBy,
		setIsLoading,
		setIsDialogLoading,
		setSortBy,
		people,
		setSortedPeopleList,
	} = peopleStore();

	const fetchPeople = async (showLoading: boolean = true) => {
		if (showLoading) setIsLoading(true);

		try {
			const people = await PeopleService.fetchPeople();

			const fullNamePeople = people.map((person: PeopleInterface) => ({
				...person,
				fullname: `${person.firstname} ${person.lastname}`,
			}));

			setPeople(fullNamePeople);
		} catch (error) {
			console.error("Failed to fetch people:", error);
			throw error;
		} finally {
			if (showLoading) setIsLoading(false);
		}
	};

	const addNewAbsence = async (payload: AbsenceInterface) => {
		setIsDialogLoading(true);

		try {
			await PeopleService.addNewAbsence(payload);

			await fetchPeople(false);
		} catch (error) {
			console.error("Failed insert absence:", error);
			throw error;
		} finally {
			setIsDialogLoading(false);
		}
	};

	const addNewFamilyMember = async (payload: NewMemberFamilyInterface) => {
		setIsDialogLoading(true);

		try {
			await PeopleService.addNewFamilyMember(payload);

			await fetchPeople(false);
		} catch (error) {
			console.error("Failed insert family:", error);
			throw error;
		} finally {
			setIsDialogLoading(false);
		}
	};

	const removeFamilyMember = async (payload: NewMemberFamilyInterface) => {
		setIsDialogLoading(true);

		try {
			await PeopleService.removeFamilyMember(payload);

			await fetchPeople(false);
		} catch (error) {
			console.error("Failed removing family:", error);
			throw error;
		} finally {
			setIsDialogLoading(false);
		}
	};

	return { fetchPeople, addNewAbsence, addNewFamilyMember, removeFamilyMember };
};
