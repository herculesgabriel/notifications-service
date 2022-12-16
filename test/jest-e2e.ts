import { pathsToModuleNameMapper } from 'ts-jest';
import { Config } from 'jest';

import { compilerOptions } from '../tsconfig.json';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  // rootDir: '.',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../',
  }),
};

export default config;
