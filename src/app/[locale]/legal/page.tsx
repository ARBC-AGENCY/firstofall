import ScrollReveal from "@/components/ui/ScrollReveal";

export default function LegalPage() {
  return (
    <section className="pt-36 pb-20 bg-surface px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <span className="label-md text-primary block mb-4">LÉGAL</span>
          <h1 className="text-4xl font-cinzel font-bold text-on-surface mb-10">
            Mentions Légales
          </h1>
          <div className="space-y-8 text-neutral-400 leading-relaxed text-sm">
            <p>
              <strong className="text-on-surface font-cinzel">First of All®</strong> est une marque
              protégée internationalement : Europe (EUIPO), Afrique (OAPI), États-Unis (USPTO),
              Canada, Royaume-Uni.
            </p>
            <p>
              Société enregistrée aux États-Unis, au Royaume-Uni et au Canada. Toute reproduction,
              utilisation ou exploitation de la marque, des technologies ou du contenu de ce site
              sans autorisation préalable est strictement interdite.
            </p>
            <p>
              © 2026 First of All®. Tous droits réservés.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
