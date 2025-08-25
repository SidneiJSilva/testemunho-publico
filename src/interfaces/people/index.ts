export interface PeopleAvailability {
	mondaymorning: boolean;
	mondayafternoon: boolean;
	tuesdaymorning: boolean;
	tuesdayafternoon: boolean;
	wednesdaymorning: boolean;
	wednesdayafternoon: boolean;
	thursdaymorning: boolean;
	thursdayafternoon: boolean;
	fridaymorning: boolean;
	fridayafternoon: boolean;
	saturdaymorning: boolean;
	saturdayafternoon: boolean;
	sundaymorning: boolean;
	sundayafternoon: boolean;
}

export interface PeopleAbsence {
	id: number;
	active: boolean;
	startdate: string;
	enddate: string;
}

export interface PeopleFamily {
	peopleId: number;
	fullName: string;
}

export interface PeopleInterface {
	peopleid: number;
	firstname: string;
	lastname: string;
	fullname?: string;
	tpapproved: boolean;
	techskills: boolean;
	regularpionner: boolean;
	gender: "male" | "female";
	availability: PeopleAvailability;
	absences: PeopleAbsence[];
	familymembers: PeopleFamily[];
}

export interface NewMemberFamilyInterface {
	peopleId: number;
	familyMemberId: number;
}
