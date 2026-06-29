interface BadgeProps {
  text: string;
  color?: "green" | "red";
}

export default function Badge({
  text,
  color = "green",
}: BadgeProps) {
  const styles =
    color === "green"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}
    >
      {text}
    </span>
  );
}