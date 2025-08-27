import type {
	PeopleInterface,
	AbsenceInterface,
	NewMemberFamilyInterface,
} from "@/interfaces";
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

	static async addNewFamilyMember({
		peopleId,
		familyMemberId,
	}: NewMemberFamilyInterface) {
		const { error } = await SupabaseService.from("tp_allowed_families").insert({
			people_id_1: peopleId,
			people_id_2: familyMemberId,
		});

		const { error: error2 } = await SupabaseService.from(
			"tp_allowed_families"
		).insert({
			people_id_1: familyMemberId,
			people_id_2: peopleId,
		});

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}
		if (error2) {
			throw new Error(`Error fetching territories: ${error2.message}`);
		}
	}

	static async removeFamilyMember({
		peopleId,
		familyMemberId,
	}: NewMemberFamilyInterface) {
		const { error } = await SupabaseService.from("tp_allowed_families")
			.delete()
			.eq("people_id_1", peopleId)
			.eq("people_id_2", familyMemberId);

		const { error: error2 } = await SupabaseService.from("tp_allowed_families")
			.delete()
			.eq("people_id_1", familyMemberId)
			.eq("people_id_2", peopleId);

		if (error) {
			throw new Error(`Error fetching territories: ${error.message}`);
		}
		if (error2) {
			throw new Error(`Error fetching territories: ${error2.message}`);
		}
	}
}
