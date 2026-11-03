import * as migration_20261103_140410_initial from './20261103_140410_initial';

export const migrations = [
  {
    up: migration_20261103_140410_initial.up,
    down: migration_20261103_140410_initial.down,
    name: '20261103_140410_initial'
  },
];
