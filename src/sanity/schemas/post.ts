import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Indlæg',
  type: 'document',
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Uddrag',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Kort beskrivelse til listesider og SEO (max 160 tegn)',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Fremhævet billede',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Indhold',
      type: 'array',
      group: 'content',
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
          name: 'calloutBlock',
          title: 'Info / Tip boks',
          fields: [
            {
              name: 'variant',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'ℹ️ Info', value: 'info' },
                  { title: '💡 Tip', value: 'tip' },
                  { title: '⚠️ Advarsel', value: 'warning' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'info',
            },
            {
              name: 'title',
              title: 'Overskrift',
              type: 'string',
              description: 'F.eks. "Eksempel på velkomstbonus" eller "Pro tip"',
            },
            {
              name: 'body',
              title: 'Indhold',
              type: 'text',
              rows: 4,
              description: 'Selve teksten i boksen',
            },
          ],
          preview: {
            select: { title: 'title', variant: 'variant' },
            prepare({ title, variant }: any) {
              const icons: Record<string, string> = { info: 'ℹ️', tip: '💡', warning: '⚠️' }
              return {
                title: title || 'Callout',
                subtitle: `${icons[variant] || 'ℹ️'} ${variant || 'info'}`,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'faqBlock',
          title: 'FAQ — Ofte stillede spørgsmål',
          fields: [
            {
              name: 'title',
              title: 'Overskrift',
              type: 'string',
              initialValue: 'Ofte stillede spørgsmål',
            },
            {
              name: 'items',
              title: 'Spørgsmål & svar',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'faqItem',
                  title: 'FAQ punkt',
                  fields: [
                    { name: 'question', title: 'Spørgsmål', type: 'string' },
                    { name: 'answer', title: 'Svar', type: 'text', rows: 3 },
                  ],
                  preview: {
                    select: { title: 'question', subtitle: 'answer' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title', items: 'items' },
            prepare({ title, items }: any) {
              return {
                title: title || 'FAQ',
                subtitle: `${(items || []).length} spørgsmål`,
              }
            },
          },
        },
        {
          type: 'object',
          name: 'prosConsBlock',
          title: 'Fordele & Ulemper',
          fields: [
            {
              name: 'title',
              title: 'Overskrift (valgfri)',
              type: 'string',
              description: 'F.eks. "Fordele og ulemper ved Polymarket"',
            },
            {
              name: 'pros',
              title: 'Fordele ✅',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Tilføj én fordel per linje',
            },
            {
              name: 'cons',
              title: 'Ulemper ❌',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Tilføj én ulempe per linje',
            },
          ],
          preview: {
            select: { title: 'title', pros: 'pros', cons: 'cons' },
            prepare({ title, pros, cons }: any) {
              return {
                title: title || 'Fordele & Ulemper',
                subtitle: `✅ ${(pros || []).length} fordele  ❌ ${(cons || []).length} ulemper`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'readingTime',
      title: 'Læsetid (minutter)',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publiceret dato',
      type: 'datetime',
      group: 'content',
    }),
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
    select: { title: 'title', subtitle: 'excerpt', media: 'featuredImage' },
  },
})
