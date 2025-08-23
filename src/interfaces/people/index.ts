export interface PeopleInterface {
	peopleid: number;
	firstname: string;
	lastname: string;
	fullname?: string;
	tpapproved: boolean;
	techskills: boolean;
	regularpionner: boolean;
	gender: "male" | "female";
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
