import { useNavigate } from "react-router-dom";

export const useConditionalNavigate = () => {
	const isDevelopment = import.meta.env.DEV;
	const navigate = useNavigate();

	const navigateTo = (path: string) => {
		if (isDevelopment) {
			navigate(`/${path}`);
		} else {
			navigate(`/tp/${path}`);
		}
	};

	return { navigateTo };
};
