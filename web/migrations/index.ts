import * as migration_20261103_140410_initial from './20261103_140410_initial';
import * as migration_20261103_160330_listes_et_pages_legales from './20261103_160330_listes_et_pages_legales';
import * as migration_20261116_191017_vente_ouvrages from './20261116_191017_vente_ouvrages';
import * as migration_20261116_235821_textes_editables from './20261116_235821_textes_editables';
import * as migration_20261126_135434_refresh_prototype_v16 from './20261126_135434_refresh_prototype_v16';
import * as migration_20261126_150755_ux_sommaire_page from './20261126_150755_ux_sommaire_page';
import * as migration_20261126_171549_retrait_mentions from './20261126_171549_retrait_mentions';
import * as migration_20261126_183826_librairie from './20261126_183826_librairie';

export const migrations = [
  {
    up: migration_20261103_140410_initial.up,
    down: migration_20261103_140410_initial.down,
    name: '20261103_140410_initial',
  },
  {
    up: migration_20261103_160330_listes_et_pages_legales.up,
    down: migration_20261103_160330_listes_et_pages_legales.down,
    name: '20261103_160330_listes_et_pages_legales',
  },
  {
    up: migration_20261116_191017_vente_ouvrages.up,
    down: migration_20261116_191017_vente_ouvrages.down,
    name: '20261116_191017_vente_ouvrages',
  },
  {
    up: migration_20261116_235821_textes_editables.up,
    down: migration_20261116_235821_textes_editables.down,
    name: '20261116_235821_textes_editables',
  },
  {
    up: migration_20261126_135434_refresh_prototype_v16.up,
    down: migration_20261126_135434_refresh_prototype_v16.down,
    name: '20261126_135434_refresh_prototype_v16',
  },
  {
    up: migration_20261126_150755_ux_sommaire_page.up,
    down: migration_20261126_150755_ux_sommaire_page.down,
    name: '20261126_150755_ux_sommaire_page',
  },
  {
    up: migration_20261126_171549_retrait_mentions.up,
    down: migration_20261126_171549_retrait_mentions.down,
    name: '20261126_171549_retrait_mentions',
  },
  {
    up: migration_20261126_183826_librairie.up,
    down: migration_20261126_183826_librairie.down,
    name: '20261126_183826_librairie'
  },
];
