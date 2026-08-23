"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { TypeBloc } from "@/content/blocs";

/**
 * Avertit avant de quitter (rafraîchissement, fermeture d'onglet) tant que le
 * texte diffère de sa valeur d'origine. L'enregistrement passe par une Server
 * Action en fetch (pas de déchargement de page), donc le garde ne se déclenche
 * pas sur une sauvegarde légitime.
 */
function useGardeModifs(modifie: boolean) {
  useEffect(() => {
    if (!modifie) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [modifie]);
}

/**
 * Éditeur du back-office. Deux modes selon le type de bloc :
 *  - « riche »  : éditeur WYSIWYG (Tiptap) limité aux balises de la liste
 *                 blanche du serveur (cf. lib/contenu/sanitize.ts) ;
 *  - « simple » : zone de texte brut (titres, exergues), sans mise en forme.
 *
 * Le HTML produit est TOUJOURS réassaini côté serveur à l'enregistrement :
 * cette barre d'outils est une commodité, jamais une garantie de sécurité.
 */

const BOUTON =
  "rounded border border-bleu-nuit-profond/20 px-2.5 py-1 font-ui text-xs hover:bg-gris-clair disabled:opacity-40";
const BOUTON_ACTIF = "bg-bleu-nuit-profond text-blanc-casse hover:bg-bleu-nuit";

function Outil({
  editor,
  actif,
  onClick,
  children,
  titre,
}: {
  editor: Editor;
  actif?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  titre: string;
}) {
  return (
    <button
      type="button"
      title={titre}
      aria-pressed={actif ?? false}
      onClick={onClick}
      disabled={!editor.isEditable}
      className={`${BOUTON} ${actif ? BOUTON_ACTIF : ""}`}
    >
      {children}
    </button>
  );
}

function BarreOutils({ editor }: { editor: Editor }) {
  const lien = () => {
    const actuel = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Adresse du lien (vide pour retirer) :", actuel ?? "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-1.5 border-b border-bleu-nuit-profond/10 bg-gris-clair p-2">
      <Outil editor={editor} titre="Gras" actif={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}>
        <strong>G</strong>
      </Outil>
      <Outil editor={editor} titre="Italique" actif={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}>
        <em>I</em>
      </Outil>
      <span className="mx-1 w-px bg-bleu-nuit-profond/10" aria-hidden />
      <Outil editor={editor} titre="Intertitre" actif={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
        Titre
      </Outil>
      <Outil editor={editor} titre="Sous-intertitre" actif={editor.isActive("heading", { level: 4 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
        Sous-titre
      </Outil>
      <span className="mx-1 w-px bg-bleu-nuit-profond/10" aria-hidden />
      <Outil editor={editor} titre="Liste à puces" actif={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • Liste
      </Outil>
      <Outil editor={editor} titre="Liste numérotée" actif={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. Liste
      </Outil>
      <Outil editor={editor} titre="Citation" actif={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        Citation
      </Outil>
      <Outil editor={editor} titre="Lien" actif={editor.isActive("link")} onClick={lien}>
        Lien
      </Outil>
      <span className="mx-1 w-px bg-bleu-nuit-profond/10" aria-hidden />
      <Outil editor={editor} titre="Annuler" onClick={() => editor.chain().focus().undo().run()}>
        ↶
      </Outil>
      <Outil editor={editor} titre="Rétablir" onClick={() => editor.chain().focus().redo().run()}>
        ↷
      </Outil>
    </div>
  );
}

/** Rendu du contenu dans l'éditeur, calé sur la typographie du site. */
const CONTENU_CLASS = [
  "min-h-[18rem] max-w-none p-4 font-sans text-base leading-relaxed outline-none",
  "[&_p]:mt-4 [&_p:first-child]:mt-0 [&_strong]:font-semibold [&_em]:italic",
  "[&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold",
  "[&_h4]:mt-5 [&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-semibold",
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
  "[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
  "[&_blockquote]:mt-4 [&_blockquote]:border-l-4 [&_blockquote]:border-or [&_blockquote]:pl-4 [&_blockquote]:italic",
  "[&_a]:text-bleu-academique [&_a]:underline",
].join(" ");

function EditeurRiche({ valeurInitiale }: { valeurInitiale: string }) {
  const [valeur, setValeur] = useState(valeurInitiale);
  useGardeModifs(valeur !== valeurInitiale);

  const editor = useEditor({
    // Obligatoire en SSR : évite une hydratation incohérente.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Hors liste blanche du serveur : retirés pour ne pas produire du HTML
        // qui serait silencieusement supprimé à l'enregistrement.
        code: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
        underline: false,
        heading: { levels: [3, 4] },
        link: { openOnClick: false },
      }),
    ],
    content: valeurInitiale,
    onUpdate: ({ editor }) => setValeur(editor.getHTML()),
    editorProps: { attributes: { class: CONTENU_CLASS } },
  });

  return (
    <>
      <input type="hidden" name="valeur" value={valeur} />
      <div className="overflow-hidden rounded border border-bleu-nuit-profond/20 bg-white focus-within:border-or focus-within:ring-2 focus-within:ring-or/30">
        {editor ? <BarreOutils editor={editor} /> : null}
        <EditorContent editor={editor} />
      </div>
    </>
  );
}

function EditeurSimple({ valeurInitiale }: { valeurInitiale: string }) {
  const [valeur, setValeur] = useState(valeurInitiale);
  useGardeModifs(valeur !== valeurInitiale);
  return (
    <textarea
      name="valeur"
      value={valeur}
      onChange={(e) => setValeur(e.target.value)}
      rows={4}
      className="w-full rounded border border-bleu-nuit-profond/20 bg-white p-4 font-sans text-base leading-relaxed outline-none focus:border-or"
    />
  );
}

export function EditeurContenu({
  type,
  valeurInitiale,
}: {
  type: TypeBloc;
  valeurInitiale: string;
}) {
  return type === "riche" ? (
    <EditeurRiche valeurInitiale={valeurInitiale} />
  ) : (
    <EditeurSimple valeurInitiale={valeurInitiale} />
  );
}
