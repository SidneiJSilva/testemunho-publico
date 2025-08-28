import SCard from "@/components/atoms/cards/SCard";
import PeopleDialog from "@/components/organisms/PeopleDialog";

import HailIcon from "@mui/icons-material/Hail";
import ComputerIcon from "@mui/icons-material/Computer";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { SvgIcon } from "@mui/material";
import { Box } from "@mui/material";

import { useState } from "react";
import { type PeopleInterface } from "@/interfaces";
import { colors } from "@/constants/colors";

const PeopleCard = ({ person }: { person: PeopleInterface }) => {
	const [openDialog, setOpenDialog] = useState(false);

	const closeDialog = () => {
		setOpenDialog(false);
	};

	return (
		<>
			<SCard
				key={person.peopleid}
				title={person.fullname}
				sx={{
					backgroundColor: colors.backgroundHeader,
					color: "#00455a",
					cursor: "pointer",
					transition: "all 0.3s ease",
					":hover": {
						boxShadow: "0 12px 24px rgba(0,0,0,0.4)",
						transform: "scale(1.05)",
						backgroundColor: colors.secondary,
						color: colors.primary,
					},
				}}
				onClick={() => setOpenDialog(true)}
			>
				<Box
					sx={{
						display: "flex",
						gap: ".5rem",
						flexWrap: "wrap",
						justifyContent: "end",
					}}
				>
					{person.techskills && (
						<SvgIcon sx={{ color: "#055db5ff" }}>
							<ComputerIcon />
						</SvgIcon>
					)}

					{person.tpapproved && (
						<SvgIcon sx={{ color: "#3e7e20ff" }}>
							<HailIcon />
						</SvgIcon>
					)}

					{person.regularpionner && (
						<SvgIcon sx={{ color: "#3d3813ff" }}>
							<BusinessCenterIcon />
						</SvgIcon>
					)}

					<SvgIcon
						sx={{
							color: person.gender === "male" ? "#1400caff" : "#6a0057ff",
						}}
					>
						{person.gender === "male" ? <ManIcon /> : <WomanIcon />}
					</SvgIcon>
				</Box>
			</SCard>

			<PeopleDialog
				openDialog={openDialog}
				peopleData={person}
				closeDialog={closeDialog}
			/>
		</>
	);
};

export default PeopleCard;
