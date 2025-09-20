import { schemaStore } from "@/stores/schema-store";
import { SchemaService } from "@/services/schema-service";
import { camelObject } from "@/utils/transform";

export function useSchema() {
	const { schema, setSchema, setPlaces, setTimeRange, setSchemaList } =
		schemaStore();

	const fetchSchema = async (schemaId: string) => {
		const data = await SchemaService.fetchSchema(schemaId);

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

	const fetchSchemaList = async () => {
		const schemaList = await SchemaService.fetchSchemaList();
		const formatedSchemaList = camelObject(schemaList);

		setSchemaList(formatedSchemaList);
	};

	return { schema, fetchSchema, fetchPlaces, fetchTimeRange, fetchSchemaList };
}
