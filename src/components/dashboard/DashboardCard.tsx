import Image from "next/image";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: string;
};

export function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm flex gap-2 w-[250px]">
     <div>
     <Image src={icon} alt={title} width={70} height={70} />
     </div>
     <div>
      <h2 className="mt-2 text-2xl font-bold">{value}</h2>
      <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  );
}
