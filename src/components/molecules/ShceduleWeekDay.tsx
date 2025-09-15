import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { peopleStore } from "@/stores";
import { type Dayjs } from "dayjs";

function createData(name: string, p1: number, p2: number) {
	return { name, p1, p2 };
}

const rows = [createData("Furadouro CENTRO - 18:00-19:30", 1, 2)];

const cols = [
	{ id: "name", label: "Local / Hora" },
	{ id: "calories", label: "18/ago" },
	{ id: "fat", label: "25/ago" },
];

export default function ScheduleWeekDay({ day }: { day: any }) {
	const { people } = peopleStore();

	return (
		<>
			{people.length && (
				<div>
					<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
						<strong style={{ textTransform: "capitalize" }}>
							{day.weekday}
						</strong>
					</Box>

					<TableContainer component={Paper}>
						<Table
							sx={{ minWidth: 650 }}
							size="small"
							aria-label="a dense table"
						>
							<TableHead>
								<TableRow>
									{cols.map((col) => (
										<TableCell key={col.id}>{col.label}</TableCell>
									))}
								</TableRow>
							</TableHead>

							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.name}
										sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>

										<TableCell align="center">
											<FormControl size="small" sx={{ minWidth: 120 }}>
												<InputLabel id="select-family-member">
													Publicador
												</InputLabel>

												<Select
													labelId="select-family-member"
													id="family-member-select"
													value={row.p1}
													label="Publicador"
													// onChange={handleChange}
												>
													{people.map((p) => (
														<MenuItem value={p.peopleid}>{p.fullname}</MenuItem>
													))}
												</Select>
											</FormControl>
										</TableCell>

										<TableCell align="center">
											<FormControl size="small" sx={{ minWidth: 120 }}>
												<InputLabel id="select-family-member">
													Publicador
												</InputLabel>

												<Select
													labelId="select-family-member"
													id="family-member-select"
													value={row.p2}
													label="Publicador"
													// onChange={handleChange}
												>
													{people.map((p) => (
														<MenuItem value={p.peopleid}>{p.fullname}</MenuItem>
													))}
												</Select>
											</FormControl>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</div>
			)}
		</>
	);
}
