import { Box, Typography } from "@mui/material";

import { type PeopleInterface } from "@/interfaces";
import { colors } from "@/constants/colors";

export function PeopleDialogHeader({ person }: { person: PeopleInterface }) {
	return (
		<Box
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			padding={2}
		>
			<Typography variant="h5" fontWeight="bold" color={colors.text}>
				{person.fullname}
			</Typography>
		</Box>
	);
}
