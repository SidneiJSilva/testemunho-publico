import { usePeople } from "@/hooks";
import { useEffect } from "react";

const People = () => {
	const { fetchPeople } = usePeople();

	useEffect(() => {
		const fetchData = async () => {
			await fetchPeople();
		};

		fetchData();
	}, []);

	return (
		<div>
			<div>People</div>
			<p>Welcome to the People!</p>
		</div>
	);
};

export default People;
