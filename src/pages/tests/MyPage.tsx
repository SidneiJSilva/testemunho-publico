import { useNavigate } from "react-router-dom";

const MyPage = () => {
	const navigate = useNavigate();

	return (
		<div>
			<h1>Dashboard</h1>
			<p>This is my dasoboard content.</p>
			<button onClick={() => navigate("../page2")}>Page 2</button>
		</div>
	);
};

export default MyPage;
