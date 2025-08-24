import type { PeopleInterface, AbsenceInterface } from "@/interfaces";
import SupabaseService from "@/services/supabase-service";

export class PeopleService {
	static async fetchPeople(): Promise<PeopleInterface[]> {
		const { data, error } = await SupabaseService.from("people_tp_view")
			.select("*")
			.order("firstname");

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}

		return data as unknown as PeopleInterface[];
	}

	static async addNewAbsence({
		peopleId,
		startDate,
		endDate,
	}: AbsenceInterface) {
		const { error } = await SupabaseService.from("tp_absences").insert({
			people_id: peopleId,
			start_date: startDate,
			end_date: endDate,
		});

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}
	}
}
