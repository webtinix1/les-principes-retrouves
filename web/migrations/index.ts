import * as migration_20261103_140410_initial from './20261103_140410_initial';
import * as migration_20261103_160330_listes_et_pages_legales from './20261103_160330_listes_et_pages_legales';
import * as migration_20261116_191017_vente_ouvrages from './20261116_191017_vente_ouvrages';
import * as migration_20261116_235821_textes_editables from './20261116_235821_textes_editables';

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
    name: '20261116_235821_textes_editables'
  },
];
