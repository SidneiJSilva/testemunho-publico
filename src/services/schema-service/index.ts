import { generateMockSchema } from "@/utils/schemaMock";
import SupabaseService from "@/services/supabase-service";
import type { Places, TimeRange } from "@/interfaces";

export class SchemaService {
	static async fetchSchema() {
		// futuramente: chamada ao Supabase
		return generateMockSchema();
	}

	static async fetchPlaces() {
		const { data, error } = await SupabaseService.from("tp_place").select("*");

		if (error) {
			throw new Error(`Error fetching places: ${error.message}`);
		}

		return data as unknown as Places;
	}

	static async fetchTimeRange() {
		const { data, error } = await SupabaseService.from("tp_time_range")
			.select("*")
			.order("start_time", { ascending: true });

		if (error) {
			throw new Error(`Error fetching time range: ${error.message}`);
		}

		return data as unknown as TimeRange;
	}
}
