module.exports = {
    testEnvironment: 'node',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/fixtures/',
        '/.idea/',
    ],
    preset: 'ts-jest',
   /* setupFiles: [
        './node_modules/reflect-metadata/Reflect.js'
    ],*/
    testMatch: ["**/?(*.)+(spec).[jt]s?(x)"]
};
