import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Forside',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'ticker', title: 'Ticker' },
    { name: 'stats', title: 'Stats' },
    { name: 'body', title: 'Indhold' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────
    defineField({
      name: 'heroBadge',
      title: 'Badge tekst',
      type: 'string',
      group: 'hero',
      description: 'Den lille tekst med orange prik øverst. F.eks. "Danmarks guide til prediction markets"',
      initialValue: 'Danmarks guide til prediction markets',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Overskrift (H1)',
      type: 'string',
      group: 'hero',
      description: 'Brug || for linjeskift, f.eks. "Forudsig fremtiden|| med rigtige penge"',
      initialValue: 'Forudsig fremtiden|| med rigtige penge',
    }),
    defineField({
      name: 'heroHeadingAccent',
      title: 'Fremhævet ord i overskriften',
      type: 'string',
      group: 'hero',
      description: 'Det ord/ord-sætning der vises i orange. F.eks. "rigtige penge"',
      initialValue: 'rigtige penge',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Brødtekst under overskrift',
      type: 'text',
      rows: 3,
      group: 'hero',
      initialValue: 'Alt du behøver at vide om prediction markets — fra begynder til ekspert. Guides, platformanmeldelser og strategier på dansk.',
    }),
    defineField({
      name: 'heroPrimaryButtonText',
      title: 'Primær knap tekst',
      type: 'string',
      group: 'hero',
      initialValue: 'Læs seneste guides',
    }),
    defineField({
      name: 'heroSecondaryButtonText',
      title: 'Sekundær knap tekst',
      type: 'string',
      group: 'hero',
      initialValue: 'Sammenlign platforme →',
    }),

    // ── Ticker ────────────────────────────────────────────────
    defineField({
      name: 'pinnedMarkets',
      title: 'Fastgjorte Polymarket markeder',
      type: 'array',
      group: 'ticker',
      description: 'Disse markeder vises altid i tickeren øverst. Resten udfyldes automatisk med de mest handlede markeder.',
      of: [
        {
          type: 'object',
          name: 'pinnedMarket',
          fields: [
            {
              name: 'marketId',
              title: 'Polymarket Market ID',
              type: 'string',
              description: 'Find ID\'et i Polymarket URL\'en, f.eks. "will-donald-trump-win-the-2024-us-presidential-election" eller det numeriske ID fra API\'et',
            },
            {
              name: 'label',
              title: 'Note (kun til din reference)',
              type: 'string',
              description: 'F.eks. "Dansk valg 2025" — vises ikke på sitet',
            },
          ],
          preview: {
            select: { title: 'label', subtitle: 'marketId' },
            prepare({ title, subtitle }: any) {
              return { title: title || subtitle, subtitle: subtitle }
            },
          },
        },
      ],
    }),

    // ── Stats bar ─────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Stats (4 tal i baren under hero)',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          name: 'statItem',
          fields: [
            { name: 'value', title: 'Tal / Tekst', type: 'string', description: 'F.eks. "100+" eller "Gratis"' },
            { name: 'label', title: 'Label', type: 'string', description: 'F.eks. "Guides publiceret"' },
          ],
          preview: {
            select: { title: 'value', subtitle: 'label' },
          },
        },
      ],
    }),

    // ── Body ──────────────────────────────────────────────────
    defineField({
      name: 'body',
      title: 'Indhold (under artikler)',
      type: 'array',
      group: 'body',
      description: 'Valgfrit indhold der vises under artikeloversigten — brug alle de samme blokke som i blogindlæg',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Citat', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Fed', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'blank', type: 'boolean', title: 'Åbn i nyt vindue' },
                ],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
        {
          type: 'object',
          name: 'latestPostsBlock',
          title: 'Seneste guides & artikler',
          fields: [
            {
              name: 'title',
              title: 'Overskrift',
              type: 'string',
              initialValue: 'Seneste guides & artikler',
            },
            {
              name: 'count',
              title: 'Antal artikler',
              type: 'number',
              initialValue: 4,
              description: 'Hvor mange artikler skal vises (anbefalet: 3, 4 eller 6)',
              validation: (r: any) => r.min(1).max(12),
            },
            {
              name: 'showViewAll',
              title: 'Vis "Se alle →" link',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: { title: 'title', count: 'count' },
            prepare({ title, count }: any) {
              return {
                title: title || 'Seneste guides & artikler',
                subtitle: `Viser ${count || 4} artikler`,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'prosConsBlock',
          title: 'Fordele & Ulemper',
          fields: [
            { name: 'title', title: 'Overskrift (valgfri)', type: 'string' },
            { name: 'pros', title: 'Fordele ✅', type: 'array', of: [{ type: 'string' }] },
            { name: 'cons', title: 'Ulemper ❌', type: 'array', of: [{ type: 'string' }] },
          ],
          preview: {
            select: { title: 'title', pros: 'pros', cons: 'cons' },
            prepare({ title, pros, cons }: any) {
              return { title: title || 'Fordele & Ulemper', subtitle: `✅ ${(pros||[]).length}  ❌ ${(cons||[]).length}` }
            },
          },
        },
        {
          type: 'object',
          name: 'faqBlock',
          title: 'FAQ',
          fields: [
            { name: 'title', title: 'Overskrift', type: 'string', initialValue: 'Ofte stillede spørgsmål' },
            {
              name: 'items', title: 'Spørgsmål & svar', type: 'array',
              of: [{
                type: 'object', name: 'faqItem',
                fields: [
                  { name: 'question', title: 'Spørgsmål', type: 'string' },
                  { name: 'answer', title: 'Svar', type: 'text', rows: 3 },
                ],
                preview: { select: { title: 'question', subtitle: 'answer' } },
              }],
            },
          ],
          preview: {
            select: { title: 'title', items: 'items' },
            prepare({ title, items }: any) {
              return { title: title || 'FAQ', subtitle: `${(items||[]).length} spørgsmål` }
            },
          },
        },
        {
          type: 'object',
          name: 'calloutBlock',
          title: 'Info / Tip boks',
          fields: [
            {
              name: 'variant', title: 'Type', type: 'string',
              options: { list: [{ title: 'ℹ️ Info', value: 'info' }, { title: '💡 Tip', value: 'tip' }, { title: '⚠️ Advarsel', value: 'warning' }], layout: 'radio', direction: 'horizontal' },
              initialValue: 'info',
            },
            { name: 'title', title: 'Overskrift', type: 'string' },
            { name: 'body', title: 'Indhold', type: 'text', rows: 4 },
          ],
          preview: {
            select: { title: 'title', variant: 'variant' },
            prepare({ title, variant }: any) {
              const icons: Record<string, string> = { info: 'ℹ️', tip: '💡', warning: '⚠️' }
              return { title: title || 'Callout', subtitle: `${icons[variant] || 'ℹ️'} ${variant || 'info'}` }
            },
          },
        },
      ],
    }),

    // ── SEO ───────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Meta titel',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta beskrivelse',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Forside' }
    },
  },
})
