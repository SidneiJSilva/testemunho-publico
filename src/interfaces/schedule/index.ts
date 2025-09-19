export interface Publisher {
	id: number;
	label: string;
}

export interface Assignment {
	locationId: number;
	publishers: Publisher[];
}

export interface WeekdayDataItem {
	date: string; // "2025-09-15"
	assignments: Assignment[];
}

export interface Slot {
	placeId: number;
	placeName: string;
	time: string;
}

export interface DaySchema {
	id: string;
	weekday: string;
	slots: Slot[];
}

export interface NormalizedRow {
	placeId: number;
	placeName: string;
	time: string;
	dates: Record<string, Publisher[]>;
}

export interface Place {
	id: number;
	name: string;
}

export interface Places {
	places: Place[];
}
