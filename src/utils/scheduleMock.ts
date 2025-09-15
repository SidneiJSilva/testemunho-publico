import dayjs, { Dayjs } from "dayjs";
import { generateMockSchema } from "./schemaMock";

/** util: mapeia pt -> en */
const PT_TO_EN: Record<string, string> = {
	"segunda-feira": "monday",
	"terça-feira": "tuesday",
	"quarta-feira": "wednesday",
	"quinta-feira": "thursday",
	"sexta-feira": "friday",
	sábado: "saturday",
	domingo: "sunday",
};

/** tenta obter chave 'monday' a partir do Dayjs current */
function getDayKey(
	current: Dayjs,
	schemaMap: Record<string, any>
): string | null {
	const raw = current.format("dddd").toLowerCase(); // ex: 'monday' ou 'segunda-feira'
	if (schemaMap[raw]) return raw;
	const mapped = PT_TO_EN[raw];
	if (mapped && schemaMap[mapped]) return mapped;
	// último recurso: retornar english padrão (dayjs weekday -> 0..6)
	const english = current.format("dddd").toLowerCase(); // normalmente same as raw
	if (schemaMap[english]) return english;
	return null;
}

/** normaliza schema para um mapa { monday: slots[], tuesday: slots[] } */
function normalizeSchema(schema: any): Record<string, any[]> {
	// caso já seja map (por ex: { monday: [...], tuesday: [...] })
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

	// caso venha como { days: [ { weekday: 'monday', slots: [...] }, ... ] }
	if (Array.isArray(schema?.days)) {
		const map: Record<string, any[]> = {};
		for (const d of schema.days) {
			const key = (d.weekday || d.day || "").toLowerCase();
			if (!key) continue;
			// normalize node shape: prefer d.slots, d.assignments, d.items
			map[key] = d.slots ?? d.assignments ?? d.items ?? [];
		}
		return map;
	}

	// fallback vazio
	return {};
}

function getRandomPublishers(count: number) {
	const sampleNames = [
		"Sidnei Silva",
		"Eunice Cavadas",
		"José Andrade",
		"Célia Pereira",
		"Leonardo Murteira",
	];
	return sampleNames
		.sort(() => 0.5 - Math.random())
		.slice(0, count)
		.map((name) => ({
			id: Math.floor(Math.random() * 1000),
			label: name,
		}));
}

export function generateMockSchedule(start: Dayjs, end: Dayjs) {
	const rawSchema = generateMockSchema();
	const schema = normalizeSchema(rawSchema); // agora é um map garantido
	const schedule: Record<string, any[]> = {};

	console.log("generateMockSchedule - start:", start?.format?.("YYYY-MM-DD"));
	console.log("generateMockSchedule - end:", end?.format?.("YYYY-MM-DD"));
	console.log(
		"generateMockSchedule - normalized schema keys:",
		Object.keys(schema)
	);

	let current = start.startOf("day");
	const last = end.startOf("day");

	while (current.isBefore(last) || current.isSame(last)) {
		const dayKey = getDayKey(current, schema);
		// debug rápido
		// console.log("current:", current.format("YYYY-MM-DD"), "dayKey:", dayKey);

		if (dayKey) {
			if (!schedule[dayKey]) schedule[dayKey] = [];
			// schema[dayKey] é um array de slots (cada slot pode ter placeId ou id etc.)
			const assignments = (schema[dayKey] ?? []).map((slot: any) => ({
				locationId: slot.placeId ?? slot.id ?? slot.locationId ?? null,
				time: slot.time ?? slot.timeslot ?? slot.label ?? null,
				publishers: getRandomPublishers(2),
			}));

			schedule[dayKey].push({
				date: current.format("YYYY-MM-DD"),
				assignments,
			});
		}

		current = current.add(1, "day");
	}

	console.log("generateMockSchedule - result keys:", Object.keys(schedule));
	return schedule;
}
