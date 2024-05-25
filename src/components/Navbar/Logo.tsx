import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function Logo() {
  return (
    <a className="navbar-brand" href="#home">
     <BookOpenIcon className="logo-icon h-12 w-12" />
      <p>Match<span>book</span></p>
    </a>
  );
}
