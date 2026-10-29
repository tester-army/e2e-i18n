# e2e-i18n

A contact form in English, German, and Spanish, with the language taken from the browser, used as an example of end-to-end testing every language with one test file with [e2e](https://www.npmjs.com/package/e2e).

## How it works

The page speaks whatever language the browser asks for:

- **Nuxt's i18n module** (`nuxt.config.ts`) reads the browser's `Accept-Language` on the server, so the first HTML is already translated and `<html lang>` matches. There's one URL and no cookie: change the browser's language and the page follows.
- **The strings** live in `i18n/locales/`, one file per language. A string missing from one falls back to English (`i18n/i18n.config.ts`).
- **The form** (`app/components/ContactForm.vue`) checks its fields in the browser and thanks you by name. Nothing is sent or stored.

### Languages

| Browser language                         | Page    |
| ---------------------------------------- | ------- |
| German (`de-DE`, `de-AT`, …)             | Deutsch |
| Spanish (`es-ES`, `es-MX`, …)            | Español |
| English (`en-US`, `en-GB`, …) or another | English |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To see another language, change your browser's: in Chrome, open Settings → Languages, move Deutsch or Español to the top, and reload.
