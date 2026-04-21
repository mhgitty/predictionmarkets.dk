import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Sider',
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
              return { title: title || 'FAQ', subtitle: `${(items || []).length} spørgsmål` }
            },
          },
        },
      ],
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
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
