import SupabaseService from "@/services/supabase-service";
import type {
	Places,
	TimeRange,
	SchemaListItem,
	SchemaTurn,
	NewSlotPlace,
} from "@/interfaces";

export class SchemaService {
	static async fetchSchema(schemaId: string) {
		const { data, error } = await SupabaseService.rpc("get_schema_with_days", {
			schema_uuid: schemaId,
		});

		if (error) {
			throw new Error(`Error fetching shcema: ${error.message}`);
		}

		return data;
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

	static async fetchSchemaList() {
		const { data, error } = await SupabaseService.from("tp_schedule_schema")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			throw new Error(`Error fetching schema list: ${error.message}`);
		}

		return data as SchemaListItem[];
	}

	static async fetchTurnList() {
		const { data, error } = await SupabaseService.from("tp_turns")
			.select("*")
			.order("weekday_id", { ascending: true });

		if (error) {
			throw new Error(`Error fetching turn list: ${error.message}`);
		}

		return data as SchemaTurn[];
	}

	static async setNewSlotPlace(payload: NewSlotPlace) {
		const { error } = await SupabaseService.from(
			"tp_schedule_schema_slot"
		).insert({
			schema_id: payload.schemaId,
			place_id: payload.placeId,
			time_range_id: payload.timeRangeId,
			turn_id: payload.turnId,
			weekday_id: payload.weekdayId,
		});

		if (error) {
			throw new Error(`Error fetching turn list: ${error.message}`);
		}
	}
}
