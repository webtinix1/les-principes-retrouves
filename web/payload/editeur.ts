import {
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnorderedListFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

/**
 * Éditeur riche calibré sur la typographie réellement employée par les pages
 * doctrinales (gras, italique, intertitres h2 (pages légales), h3, h4, listes, citations, liens,
 * exposants/indices). Rien d'autre : le back-office ne doit pas pouvoir sortir
 * du design system.
 */
export const editeurProse = lexicalEditor({
  features: [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    SuperscriptFeature(),
    SubscriptFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
    UnorderedListFeature(),
    OrderedListFeature(),
    BlockquoteFeature(),
    LinkFeature({ enabledCollections: [] }),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
});
