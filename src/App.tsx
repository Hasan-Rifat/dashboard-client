import { useAppSelector } from "./app/hooks";
import AdminCard from "./components/ui/AdminCard";
import UserCard from "./components/ui/UserCard";

function App() {
  const { role } = useAppSelector((state) => state.user);
  return <>{role === "admin" ? <AdminCard /> : <UserCard />}</>;
}

export default App;
