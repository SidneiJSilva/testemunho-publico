export interface Times {
	id: number;
	startTime: string;
	finishTime: string;
}

export interface TimeRange {
	timeRange: Times[];
}

export interface SchemaListItem {
	id: string;
	name: string;
	description: string;
	createdAt: string;
}

export interface SchemaTurn {
	id: number;
	label: string;
	acronym: string;
	weekdayId: number;
}

export interface NewSlotPlace {
	placeId: number;
	timeRangeId: number;
	turnId: number;
	weekdayId: number;
	schemaId: string;
}
