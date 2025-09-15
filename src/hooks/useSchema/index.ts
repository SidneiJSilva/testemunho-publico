import { schemaStore } from "@/stores/schema-store";
import { schemaService } from "@/services/schema-service";

export function useSchema() {
	const { schema, setSchema } = schemaStore();

	const fetchSchema = async () => {
		const data = await schemaService.fetchSchema();
		setSchema(data);
	};

	return { schema, fetchSchema };
}
