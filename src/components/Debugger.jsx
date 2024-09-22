// import { useValidateSearch } from "../hooks/useValidateSearch";
import { useAuth } from "../hooks/useAuth.js";

export function Debugger() {
  const { userDetails } = useAuth();
  return (
    <div className="absolute bg-black/80 rounded-md p-4 top-3 left-3">
      {JSON.stringify(userDetails, null, 2)}
    </div>
  );
}
