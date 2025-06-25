
export default function WorkoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full bg-black">
      {children}
    </div>
  );
}
