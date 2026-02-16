import { Building2, Mail } from "lucide-react";

const MAP_LAT = -6.212839676094198;
const MAP_LNG = 106.821296509109;
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&hl=id&z=17&output=embed`;

const ADDRESS_LINE1 = "Millennium Centennial Center, 51st Floor";
const ADDRESS_LINE2 =
  "Jl. Jenderal Sudirman No. Kav. 25, Kuningan, Karet, Setiabudi District, South Jakarta City, Special Capital Region of Jakarta, 12920";
const EMAIL = "support@cartenz.co.id";
const WHATSAPP_NUMBER = "6287878787878";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function HubungiKamiPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="px-4 mt-[72px] py-12 md:px-16 md:pt-[80px] lg:px-24 xl:px-32">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[444px_1fr] lg:gap-12">
          {/* Peta: 444×385, radius 8px */}
          <div className="h-[385px] w-full max-w-[444px] overflow-hidden rounded-lg lg:w-[444px]">
            <iframe
              src={MAP_EMBED_URL}
              width={444}
              height={385}
              style={{ border: 0, borderRadius: 8 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Cartenz - Millennium Centennial Center"
              className="h-full w-full rounded-lg"
            />
          </div>

          {/* Kontak */}
          <div className="flex flex-col">
            <p className="text-base font-normal text-[#62748E]">Hubungi Kami</p>
            <h1 className="mt-1 text-2xl font-normal uppercase tracking-tight text-cartenz-black md:text-4xl">
              Kami siap membantu anda
            </h1>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#408FB4] text-white">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-cartenz-black">{ADDRESS_LINE1}</p>
                  <p className="mt-1 text-base text-[#6B7280] leading-snug">
                    {ADDRESS_LINE2}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#408FB4] text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-cartenz-black">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="mt-1 block text-base text-[#6B7280] hover:text-[#408FB4] transition"
                  >
                    {EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-full border border-[#CAD5E2] bg-[#F1F5F9] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div>
                  <p className="font-semibold">
                    Pertanyaan dan Konsultasi
                  </p>
                  <p className="mt-0.5 text-[#62748E]">via Whatsapp</p>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[#CAD5E2] bg-white px-5 py-2.5 text-[#62748E] transition hover:bg-[#F8FAFC]"
                >
                  <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
                  <span className="font-normal">Hubungi Kami</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
