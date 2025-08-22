export interface PeopleInterface {
	peopleid: number;
	firstname: string;
	lastname: string;
	fullname?: string;
	tpapproved: boolean;
	techskills: boolean;
	regularpionner: boolean;
	gender: "male" | "female";
}
