import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div >
      <h1>next-auth credentials</h1>
      <button>
        <Link href={'/signUp'}>Register</Link>
      </button>
    </div>
  );
}
