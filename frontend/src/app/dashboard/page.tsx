import Image from "next/image";

export default function Home() {
  return (
    <Image
      src="/dashboard.png"
      alt={"Next.js logo"}
      width={1280}
      height={500}
      //   layout={"responsive"}
    />
  );
}
