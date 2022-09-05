import { Navigate } from "react-router-dom";
import { isAuth } from "utils/storage";

function AuthRoute({ element }) {
	return <>{isAuth() ? element : <Navigate to="/login" replace={true} />}</>;
}

export default AuthRoute;
