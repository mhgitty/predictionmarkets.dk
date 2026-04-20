'use client'

import type { LayoutProps } from 'sanity'

export function WideStudioLayout(props: LayoutProps) {
  return (
    <>
      <style>{`
        /* Wider document form — removes the artificial max-width on the edit form */
        [data-ui="FormBuilder"] { max-width: 100% !important; }
        [class*="documentPane"] > div { max-width: 100% !important; }

        /* Two-column layout: sidebar narrow, pane wide */
        [data-testid="structure-tool"] [data-ui="PaneLayout"] {
          --structure-pane-min-width: 220px;
        }

        /* Wider pane content area */
        [data-testid="pane-content"] > div > div {
          max-width: 100% !important;
          padding: 0 32px !important;
        }
      `}</style>
      {props.renderDefault(props)}
    </>
  )
}
