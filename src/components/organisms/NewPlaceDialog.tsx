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

import { useState } from "react";
import { schemaStore } from "@/stores";
import { formatTime } from "@/utils/transform";

export default function PeopleDialog({
	openDialog,
	closeDialog,
}: {
	openDialog: boolean;
	closeDialog: () => void;
}) {
	const { places, timeRange } = schemaStore();
	const [newPlaceId, setNewPlaceId] = useState<string>("");
	const [newTimeId, setNewTimeId] = useState<string>("");

	const addAndClose = async () => {
		closeDialog();
	};

	const handleNewPlaceChange = (event: SelectChangeEvent) => {
		setNewPlaceId(event.target.value as string);
	};

	const handleNewTimeChange = (event: SelectChangeEvent) => {
		setNewTimeId(event.target.value as string);
	};

	return (
		<Dialog open={openDialog} onClose={closeDialog} maxWidth="sm" fullWidth>
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
							{Array.isArray(places) &&
								places.map((place: any) => (
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
					<Button size="small" onClick={closeDialog}>
						Fechar
					</Button>

					<Button
						size="small"
						variant="contained"
						color="primary"
						disabled={!newPlaceId || !newTimeId}
						onClick={addAndClose}
					>
						Adicionar
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
}
