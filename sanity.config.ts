import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'
import { WideStudioLayout } from './src/sanity/StudioLayout'

export default defineConfig({
  name: 'default',
  title: 'PredictionMarkets.dk',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Indhold')
          .items([
            // Singleton — only one Forside document ever exists
            S.listItem()
              .title('🏠 Forside')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title('Forside')
              ),
            S.divider(),
            S.listItem()
              .title('Indlæg')
              .schemaType('post')
              .child(S.documentTypeList('post').title('Alle indlæg')),
            S.listItem()
              .title('Sider')
              .schemaType('page')
              .child(S.documentTypeList('page').title('Alle sider')),
            S.listItem()
              .title('Forfattere')
              .schemaType('author')
              .child(S.documentTypeList('author').title('Forfattere')),
            S.listItem()
              .title('Kategorier')
              .schemaType('category')
              .child(S.documentTypeList('category').title('Kategorier')),
            S.divider(),
            S.listItem()
              .title('Platforme')
              .schemaType('platform')
              .child(S.documentTypeList('platform').title('Alle platforme')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      layout: WideStudioLayout,
    },
  },
})
