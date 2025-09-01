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

	static async removeAbsence(absenceId: number) {
		const { error } = await SupabaseService.from("tp_absences")
			.delete()
			.eq("id", absenceId);

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

	static async savePersonData(person: PeopleInterface) {
		const { error } = await SupabaseService.from("territories-people")
			.update({
				active: person.active,
				gender: person.gender === "male" ? 1 : 2,
				regular_pionner: person.regularpionner,
				tech_skills: person.techskills,
				tp_approved: person.tpapproved,
				"first-name": person.firstname,
				"last-name": person.lastname,
			})
			.eq("id", person.peopleid);

		const { availability } = person;

		const { error: error2 } = await SupabaseService.from("tp_availability")
			.update({
				monday_morning: availability.mondaymorning,
				monday_afternoon: availability.mondayafternoon,
				tuesday_morning: availability.tuesdaymorning,
				tuesday_afternoon: availability.tuesdayafternoon,
				wednesday_morning: availability.wednesdaymorning,
				wednesday_afternoon: availability.wednesdayafternoon,
				thursday_morning: availability.thursdaymorning,
				thursday_afternoon: availability.thursdayafternoon,
				friday_morning: availability.fridaymorning,
				friday_afternoon: availability.fridayafternoon,
				saturday_morning: availability.saturdaymorning,
				saturday_afternoon: availability.saturdayafternoon,
				sunday_morning: availability.sundaymorning,
				sunday_afternoon: availability.sundayafternoon,
			})
			.eq("people_id", person.peopleid);

		if (error) {
			throw new Error(`Error updating person: ${error.message}`);
		}

		if (error2) {
			throw new Error(`Error updating availability: ${error2.message}`);
		}
	}
}
