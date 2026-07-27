/// <reference types="vite/client" />

declare function route(
  name: string,
  params?: string | number | Record<string, string | number>,
  absolute?: boolean,
): string;

declare module '*.json' {
  const value: unknown
  export default value
}
