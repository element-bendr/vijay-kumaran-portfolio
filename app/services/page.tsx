import { ButtonLink, PageShell, SectionLabel } from "@/components/site";
import { MotionItem, MotionSection } from "@/components/motion";
import { services } from "@/data/services";

export default function ServicesPage() {
  return <PageShell>
    <section className="bg-dark text-light"><div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-16 lg:py-16"><SectionLabel>Services</SectionLabel><h1 className="display mt-6 max-w-5xl text-[clamp(3.1rem,6vw,6rem)] leading-[.92]">Systems that simplify<br /><span className="text-cyan">operations.</span></h1><p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-dark">Choose the system you need built, cleaned up, or automated.</p></div></section>
    <section className="bg-light text-ink"><div className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-16"><MotionSection className="grid gap-px border border-light-line bg-light-line md:grid-cols-2">{services.map((service, i) => <MotionItem key={service.title}><article className="bg-light px-6 py-5 sm:px-8 sm:py-7"><span className="font-mono text-xs text-muted-light">0{i + 1}</span><h2 className="display mt-6 text-3xl sm:text-4xl">{service.title}</h2><p className="mt-3 text-lg leading-tight">{service.promise}</p><dl className="mt-5 space-y-3 text-base"><div><dt className="font-semibold">Best for</dt><dd className="mt-1 leading-relaxed text-muted-light">{service.bestFor}</dd></div><div><dt className="font-semibold">Output</dt><dd className="mt-1 leading-relaxed text-muted-light">{service.output}</dd></div></dl></article></MotionItem>)}</MotionSection></div></section>
    <section className="bg-blue text-white"><div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16"><MotionItem><h2 className="display max-w-3xl text-[clamp(2.8rem,5vw,5rem)]">Need a cleaner workflow or stronger website?</h2></MotionItem><MotionItem><ButtonLink href="/about" light>Book an audit</ButtonLink></MotionItem></div></section>
  </PageShell>;
}
