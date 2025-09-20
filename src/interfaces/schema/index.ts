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
