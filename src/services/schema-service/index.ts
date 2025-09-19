import { generateMockSchema } from "@/utils/schemaMock";

export const schemaService = {
	async fetchSchema() {
		// futuramente: chamada ao Supabase
		return generateMockSchema();
	},
};
