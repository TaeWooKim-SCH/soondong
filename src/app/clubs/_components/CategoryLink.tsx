import Link from "next/link";

export default function CategoryLink({ children, className, categoryName, searchParams }: PropsType) {
  return (
    <Link
      className={`flex flex-col justify-center items-center ${className} ${
        searchParams === categoryName ? 'opacity-100' : 'opacity-50'
      }`}
      href={`/clubs?category=${encodeURIComponent(categoryName)}`}
    >
      <div>{ children }</div>
      <div className="mt-1 whitespace-nowrap">{categoryName}</div>
    </Link>
  );
}

interface PropsType extends React.ComponentProps<'a'> {
  categoryName: string;
  searchParams?: string;
}