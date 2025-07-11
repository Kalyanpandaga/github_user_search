import { MdAutorenew } from "react-icons/md";

export default function Spinner({ className = "h-8 w-8 text-blue-600" }) {
  return <MdAutorenew className={`animate-spin ${className}`} />;
}
