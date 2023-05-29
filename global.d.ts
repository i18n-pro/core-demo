declare function t(
  text: string,
  ...args: Array<string | number | unknown>
): string

declare function setI18n(props?: {
  locale?: string
  langs?: Record<string, Record<string, string>>
}): any
