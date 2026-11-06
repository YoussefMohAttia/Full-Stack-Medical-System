declare module 'nunjucks/browser/nunjucks-slim' { const nunjucks: typeof import('nunjucks'); export default nunjucks; }
declare module '*.js' { const value: any; export default value; }
declare module 'cookie' {
  export function parse(value: string): Record<string, string>;
  export function serialize(name: string, value: string, options: Record<string, unknown>): string;
}
