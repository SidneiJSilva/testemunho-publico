import { Dayjs } from "dayjs";
import { generateMockSchema } from "./schemaMock";

const PT_TO_EN: Record<string, string> = {
	"segunda-feira": "monday",
	"terça-feira": "tuesday",
	"quarta-feira": "wednesday",
	"quinta-feira": "thursday",
	"sexta-feira": "friday",
	sábado: "saturday",
	domingo: "sunday",
};

function getDayKey(
	current: Dayjs,
	schemaMap: Record<string, any>
): string | null {
	const raw = current.format("dddd").toLowerCase();

	if (schemaMap[raw]) return raw;

	const mapped = PT_TO_EN[raw];

	if (mapped && schemaMap[mapped]) return mapped;

	const english = current.format("dddd").toLowerCase();

	if (schemaMap[english]) return english;

	return null;
}

function normalizeSchema(schema: any): Record<string, any[]> {
	const maybeKeys = [
		"monday",
		"tuesday",
		"wednesday",
		"thursday",
		"friday",
		"saturday",
		"sunday",
	];
	const isMap = maybeKeys.some((k) =>
		Object.prototype.hasOwnProperty.call(schema, k)
	);
	if (isMap) return schema;

	if (Array.isArray(schema?.days)) {
		const map: Record<string, any[]> = {};
		for (const d of schema.days) {
			const key = (d.weekday || d.day || "").toLowerCase();
			if (!key) continue;
			map[key] = d.slots ?? d.assignments ?? d.items ?? [];
		}
		return map;
	}

	return {};
}

export function generateMockSchedule(start: Dayjs, end: Dayjs) {
	const rawSchema = generateMockSchema();
	const schema = normalizeSchema(rawSchema);
	const schedule: Record<string, any[]> = {};

	let current = start.startOf("day");
	const last = end.startOf("day");

	while (current.isBefore(last) || current.isSame(last)) {
		const dayKey = getDayKey(current, schema);

		if (dayKey) {
			if (!schedule[dayKey]) schedule[dayKey] = [];
			const assignments = (schema[dayKey] ?? []).map((slot: any) => ({
				locationId: slot.placeId ?? slot.id ?? slot.locationId ?? null,
				time: slot.time ?? slot.timeslot ?? slot.label ?? null,
				publishers: [{ id: "" }, { id: "" }],
			}));

			schedule[dayKey].push({
				date: current.format("YYYY-MM-DD"),
				assignments,
			});
		}

		current = current.add(1, "day");
	}

	return schedule;
}
