/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

/// <reference types="vite/client" />

declare module "*.png" {
  const src: string;
  export default src;
}
