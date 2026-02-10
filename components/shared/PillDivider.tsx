type Props = {
    label: string;
  };
  
  export default function PillDivider({ label }: Props) {
    return (
      <div className="flex justify-center my-10">
        <span className="px-6 py-2 border rounded-full text-sm font-medium bg-white shadow">
          {label}
        </span>
      </div>
    );
  }
  