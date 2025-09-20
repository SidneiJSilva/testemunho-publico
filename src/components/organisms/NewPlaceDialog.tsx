// src/components/organisms/PeopleDialog.tsx
import {
	Dialog,
	DialogContent,
	DialogActions,
	Button,
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	type SelectChangeEvent,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

import { useMemo, useState } from "react";
import { schemaStore } from "@/stores";
import { formatTime } from "@/utils/transform";
import { useSchema } from "@/hooks";

export default function PeopleDialog({
	openDialog,
	closeDialog,
}: {
	openDialog: boolean;
	closeDialog: () => void;
}) {
	const { places, timeRange, schemaTurnList, weekDayId, schemaId, schema } =
		schemaStore();
	const [newPlaceId, setNewPlaceId] = useState<string>("");
	const [newTimeId, setNewTimeId] = useState<string>("");
	const [newTurnId, setNewTurnId] = useState<string>("");
	const { setNewSlotPlace } = useSchema();

	const addAndClose = async () => {
		await setNewSlotPlace({
			placeId: Number(newPlaceId),
			timeRangeId: Number(newTimeId),
			turnId: Number(newTurnId),
			weekdayId: Number(weekDayId),
			schemaId,
		});

		cleanAndCloseDialog();
	};

	const cleanAndCloseDialog = () => {
		setNewPlaceId("");
		setNewTimeId("");
		setNewTurnId("");
		closeDialog();
	};

	const handleNewPlaceChange = (event: SelectChangeEvent) => {
		setNewPlaceId(event.target.value as string);
	};

	const handleNewTimeChange = (event: SelectChangeEvent) => {
		setNewTimeId(event.target.value as string);
	};

	const filteredSchemaTurnList = useMemo(() => {
		const teste = schemaTurnList.filter((turn) => {
			if (!weekDayId) return true;
			return turn.weekdayId === Number(weekDayId);
		});

		return teste;
	}, [weekDayId, schemaTurnList]);

	const filteredSchemaPlaces = useMemo(() => {
		if (!weekDayId || !Array.isArray(places) || !schema?.days) return [];

		const weekDayData = schema.days.find(
			(day: any) => day.id === Number(weekDayId)
		);
		if (!weekDayData) return [];

		const usedPlaceIds = new Set(
			weekDayData.slots.map((slot: any) => slot.placeId)
		);

		return places.filter((place: any) => !usedPlaceIds.has(place.id));
	}, [places, weekDayId, schema]);

	return (
		<Dialog
			open={openDialog}
			onClose={cleanAndCloseDialog}
			maxWidth="sm"
			fullWidth
		>
			<Typography
				variant="h6"
				fontWeight={700}
				component="div"
				sx={{ padding: 2 }}
			>
				Novo local / hora
			</Typography>

			<DialogContent>
				<Box display="flex" gap={2}>
					<FormControl size="small" sx={{ flex: 1 }}>
						<InputLabel id="select-local">Local</InputLabel>

						<Select
							labelId="select-local"
							id="local-select"
							value={newPlaceId}
							label="Local"
							onChange={handleNewPlaceChange}
						>
							{Array.isArray(filteredSchemaPlaces) &&
								filteredSchemaPlaces.map((place: any) => (
									<MenuItem value={place.id} key={place.id}>
										{place.name}
									</MenuItem>
								))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ flex: 1 }}>
						<InputLabel id="select-time-range">Hora</InputLabel>

						<Select
							labelId="select-time-range"
							id="time-range-select"
							value={newTimeId}
							label="Hora"
							onChange={handleNewTimeChange}
						>
							{Array.isArray(timeRange) &&
								timeRange.map((time: any) => (
									<MenuItem value={time.id} key={time.id}>
										{`${formatTime(time.startTime)}-${formatTime(
											time.finishTime
										)}`}
									</MenuItem>
								))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ flex: 1 }}>
						<InputLabel id="select-turn">Turno</InputLabel>

						<Select
							labelId="select-turn"
							id="turn-select"
							value={newTurnId}
							label="Turno"
							disabled={!newTimeId}
							onChange={(e) => setNewTurnId(e.target.value as string)}
						>
							{Array.isArray(filteredSchemaTurnList) &&
								filteredSchemaTurnList.map((turn: any) => (
									<MenuItem value={turn.id} key={turn.id}>
										{turn.label}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</Box>
			</DialogContent>

			<DialogActions>
				<Box
					sx={{
						display: "flex",
						justifyContent: "end",
						width: "100%",
						alignItems: "center",
						gap: 2,
					}}
				>
					<Button size="small" onClick={cleanAndCloseDialog}>
						Fechar
					</Button>

					<Button
						size="small"
						variant="contained"
						color="success"
						disabled={!newPlaceId || !newTimeId || !newTurnId}
						endIcon={<SaveIcon />}
						onClick={addAndClose}
					>
						Salvar
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
