import { schemaStore, dialogStore } from "@/stores";
import { SchemaService } from "@/services/schema-service";
import { camelObject } from "@/utils/transform";
import type { NewSlotPlace } from "@/interfaces";

export function useSchema() {
	const {
		schema,
		setSchema,
		setPlaces,
		setTimeRange,
		setSchemaList,
		setIsLoading,
		setSchemaTurnList,
	} = schemaStore();
	const { setIsDialogLoading } = dialogStore();

	const fetchSchema = async (schemaId: string) => {
		setIsLoading(true);

		try {
			const data = await SchemaService.fetchSchema(schemaId);

			setSchema(data);
		} finally {
			setIsLoading(false);
		}
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

	const fetchTurnList = async () => {
		const turnList = await SchemaService.fetchTurnList();
		const formatedTurnList = camelObject(turnList);

		setSchemaTurnList(formatedTurnList);
	};

	const setNewSlotPlace = async (payload: NewSlotPlace) => {
		setIsDialogLoading(true);
		try {
			await SchemaService.setNewSlotPlace(payload);
			await fetchSchema(payload.schemaId);
		} finally {
			setIsDialogLoading(false);
		}
	};

	return {
		schema,
		fetchSchema,
		fetchPlaces,
		fetchTimeRange,
		fetchSchemaList,
		fetchTurnList,
		setNewSlotPlace,
	};
}
