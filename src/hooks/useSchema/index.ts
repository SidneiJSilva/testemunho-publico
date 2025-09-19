import { schemaStore } from "@/stores/schema-store";
import { SchemaService } from "@/services/schema-service";
import { camelObject } from "@/utils/transform";

export function useSchema() {
	const { schema, setSchema, setPlaces, setTimeRange } = schemaStore();

	const fetchSchema = async () => {
		const data = await SchemaService.fetchSchema();
		setSchema(data);
	};

	const fetchPlaces = async () => {
		const places = await SchemaService.fetchPlaces();
		setPlaces(places);
	};

	const fetchTimeRange = async () => {
		const times = await SchemaService.fetchTimeRange();
		const formatedTimes = camelObject(times);

		setTimeRange(formatedTimes);
	};

	return { schema, fetchSchema, fetchPlaces, fetchTimeRange };
}
