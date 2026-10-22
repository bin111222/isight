import Link from "next/link";

export default function DoctorPullQuote({ quote }: { quote: string }) {
  return (
    <figure className="border-l-2 border-clinical-500 py-1 pl-5 sm:pl-6">
      <blockquote className="font-display text-[1.35rem] font-medium leading-[1.35] tracking-[-0.015em] text-navy-950 sm:text-[1.6rem]">
        {quote}
      </blockquote>
      <figcaption className="mt-4 text-[15px] leading-snug text-navy-600">
        <Link
          href="/isight-eye-care-doctors"
          className="font-semibold text-navy-900 underline decoration-clinical-300 underline-offset-4 transition-colors hover:text-clinical-600 hover:decoration-clinical-500"
        >
          Dr. Nikhil Nasta
        </Link>
        <span> · Ophthalmologist, iSight Eye Care</span>
      </figcaption>
    </figure>
  );
}
