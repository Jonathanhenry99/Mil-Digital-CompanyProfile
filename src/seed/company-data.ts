/**
 * Applies the real MIL Digital data taken from the old site (mildigital.id)
 * to a CMS that was already seeded with placeholders: team photos, stats,
 * milestones, the LYLA testimonial and the pricing article.
 * Safe to re-run.
 *
 *   npm run payload run src/seed/company-data.ts
 */
import path from "path";
import { getPayload } from "payload";
import config from "../payload.config";
import { hero, milestones, showreel, stats, testimonials } from "../content/home";

const payload = await getPayload({ config });

async function media(publicPath: string, alt: string, focal?: { x: number; y: number }) {
  const filename = path.basename(publicPath);
  const found = await payload.find({ collection: "media", where: { filename: { equals: filename } }, limit: 1 });
  if (found.docs[0]) return found.docs[0].id;
  const doc = await payload.create({
    collection: "media",
    data: { alt, ...(focal ? { focalX: focal.x, focalY: focal.y } : {}) },
    filePath: path.join(process.cwd(), "public", publicPath),
  });
  return doc.id;
}

payload.logger.info("Homepage: team photos, stats, milestones…");
await payload.updateGlobal({
  slug: "home",
  data: {
    hero: {
      eyebrow: hero.eyebrow,
      title: hero.title,
      body: hero.body,
      backgroundImage: await media(hero.background.image, "Tim MIL Digital berdiskusi di kantor", { x: 62, y: 35 }),
    },
    showreel: {
      title: showreel.title,
      caption: showreel.caption,
      poster: await media(showreel.poster, "Tim MIL Digital", { x: 50, y: 45 }),
      milestones,
    },
    stats: stats.map((s) => ({ ...s, decimals: s.decimals ?? 0 })),
  },
});

payload.logger.info("Testimonials: replacing placeholders with the real ones…");
await payload.delete({ collection: "testimonials", where: { id: { exists: true } } });
for (const [i, t] of testimonials.entries()) {
  await payload.create({ collection: "testimonials", data: { ...t, order: i } });
}

/* ── The one real article from the old blog ("Aha! Moment") ─────── */
const text = (t: string, format = 0) => ({ type: "text", text: t, format, detail: 0, mode: "normal", style: "", version: 1 });
const node = { format: "", indent: 0, version: 1, direction: "ltr" as const };
const p = (t: string) => ({ ...node, type: "paragraph", textFormat: 0, children: [text(t)] });
const h = (t: string) => ({ ...node, type: "heading", tag: "h2", children: [text(t)] });
const quote = (t: string) => ({ ...node, type: "quote", children: [text(t)] });
const list = (items: string[], ordered = false) => ({
  ...node,
  type: "list",
  listType: ordered ? "number" : "bullet",
  start: 1,
  tag: ordered ? "ol" : "ul",
  children: items.map((t, i) => ({ ...node, type: "listitem", value: i + 1, children: [text(t)] })),
});

const pricing = [
  ["Cost Plus Pricing", "Cara ini merupakan cara paling basic untuk menetapkan harga, tetapi memiliki banyak kekurangan. Seperti, berapa patokan untuk menentukan markupnya sehingga bisa jadi harga yang kita keluarkan lebih mahal daripada kompetitor kita. Oleh karena itu, disempurnakan oleh cara berikutnya."],
  ["Competitive Pricing", "Kita cari tahu terlebih dahulu kisaran harga produk dari kompetitor kita untuk dijadikan patokan markup dari harga kita. Jika harga produk kalian lebih murah dari kompetitor, maka produk yang dijual terkesan \"produk ekonomis\". Jika lebih tinggi, akan memberikan kesan \"produk kita mempunyai value yang lebih tinggi\"."],
  ["Bundle Pricing", "Coba tawarkan harga bundle kepada para customer. Cara ini akan mendatangkan banyak customer yang loyal kepada brand kita! Ketika customer membeli produk dengan harga bundle, lalu di kemudian hari ingin membeli produk kita lagi, mereka akan langsung teringat dengan brand kita, karena bisa membeli 1 set produk dengan harga yang valuable."],
  ["Anchor Pricing", "Strategi harga ini biasanya untuk menangkap pembeli baru yang menggunakan informasi harga pembanding untuk memutuskan pembelian, biasanya dalam paket-paket subscribe. Pilihan premium cenderung ditempatkan di sebelah kiri, dan yang standar atau free di sebelah kanannya."],
  ["Penetration Pricing", "Strategi ini digunakan untuk menarik perhatian customer, karena pada awalnya mereka melihat pricing yang \"best deals\" terlebih dahulu. Setelah brand mendapatkan banyak awareness, di saat itulah brand bisa mulai menjual produk-produk yang lebih mahal."],
  ["Loss Leader Pricing", "Strategi ini umumnya dilakukan untuk meraih profit pada produk pendukung. Contoh yang familiar adalah perusahaan printer: keuntungan terbesar datang dari tinta printernya, karena orang pasti membeli tinta secara berkala ketika sudah habis."],
  ["Value Based Pricing", "Strategi yang menurut kami paling ideal untuk orang-orang yang baru memulai bisnis, karena kita memberikan value lebih untuk produk yang kita miliki."],
] as const;

const content = {
  root: {
    ...node,
    type: "root",
    children: [
      p("Beberapa dari kalian yang mau memulai bisnis, pasti masih bingung dalam menentukan harga produk yang ingin kalian jual. Nah, ada beberapa hal yang perlu kalian ketahui terlebih dahulu sebelum menentukan harga produk!"),
      list(["Siapa aja kompetitor brandnya", "Hitung berapa biaya modal per produknya", "Kita manusia adalah makhluk emotional"]),
      quote("Customers do not focus on the cost of the product, but rather on its value."),
      p("Berikut adalah 7 cara menentukan harga jual produk yang dapat diterapkan pada bisnis kamu:"),
      ...pricing.flatMap(([title, body]) => [h(title), p(body)]),
      list(
        [
          "List terlebih dahulu value apa yang dimiliki oleh produk yang kamu punya",
          "Cari data sebanyak-banyaknya, kira-kira berapa nilai rupiah yang customer mau bayar untuk produk yang kamu miliki",
          "Selalu komunikasikan kepada para customer, apa saja value yang didapatkan dari produk yang kita punya",
        ],
        true,
      ),
      p("Nah, itu dia 7 cara menentukan harga produk yang bisa kamu pertimbangkan. Kalau kamu masih bingung, yuk segera konsultasikan bisnis kamu dengan Digital Marketing Expert kami di MIL Digital. FREE 1x consultation!"),
    ],
  },
};

const slug = "7-cara-untuk-menentukan-harga-produk";
const exists = await payload.find({ collection: "articles", where: { slug: { equals: slug } }, limit: 1, draft: true });
if (!exists.docs[0]) {
  payload.logger.info("Articles: importing '7 Cara Untuk Menentukan Harga Produk'…");
  await payload.create({
    collection: "articles",
    data: {
      title: "7 Cara Untuk Menentukan Harga Produk",
      slug,
      category: "Playbook",
      readingTime: "2 min read",
      excerpt: "Baru mulai bisnis dan bingung menentukan harga jual? Tujuh strategi pricing, dari cost plus sampai value based.",
      cover: await media("/placeholders/work-02.jpg", "Pricing analysis on a laptop"),
      // Lexical JSON built above; the generated type is stricter than needed here.
      content: content as never,
      publishedAt: new Date("2024-08-21T00:00:00+07:00").toISOString(),
      _status: "published",
    },
  });
}

// Keep the real article first: date the placeholder articles before it.
const placeholders = await payload.find({ collection: "articles", where: { slug: { not_equals: slug } }, sort: "-publishedAt", limit: 50 });
for (const [i, a] of placeholders.docs.entries()) {
  await payload.update({
    collection: "articles",
    id: a.id,
    data: { publishedAt: new Date(Date.UTC(2024, 6, 30 - i)).toISOString() },
  });
}

payload.logger.info("Done.");
process.exit(0);
