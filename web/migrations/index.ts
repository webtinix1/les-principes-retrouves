import * as migration_20261103_140410_initial from './20261103_140410_initial';
import * as migration_20261103_160330_listes_et_pages_legales from './20261103_160330_listes_et_pages_legales';

export const migrations = [
  {
    up: migration_20261103_140410_initial.up,
    down: migration_20261103_140410_initial.down,
    name: '20261103_140410_initial',
  },
  {
    up: migration_20261103_160330_listes_et_pages_legales.up,
    down: migration_20261103_160330_listes_et_pages_legales.down,
    name: '20261103_160330_listes_et_pages_legales'
  },
];
