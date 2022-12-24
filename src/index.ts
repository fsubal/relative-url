const DUMMY_HOST = 'https://example.com'

type RelativeURLInterface = Omit<URL, 'host' | 'hostname' | 'origin' | 'port' | 'username' | 'password' | 'protocol'>

export class RelativeURL implements RelativeURLInterface {
  #url: URL

  constructor(relativeUrl: string) {
    this.#url = new URL(relativeUrl, DUMMY_HOST)
  }

  get hash() { return this.#url.hash }
  set hash(value: string) { this.#url.hash = value }

  get pathname() { return this.#url.pathname }
  set pathname(value: string) { this.#url.pathname = value }

  get search() { return this.#url.search }
  set search(value: string) { this.#url.search = value }

  get searchParams() { return this.#url.searchParams }

  get href() {
    let output = this.pathname + '?' + this.search
    if (this.hash) {
      output += '#' + this.hash
    }

    return output
  }

  set href(relativeUrl: string) {
    this.#url = new URL(relativeUrl, DUMMY_HOST)
  }

  toString() {
    return this.href
  }

  toJSON() {
    return this.toString()
  }

  toURL(baseURL: string | URL) {
    return new URL(this.toString(), baseURL)
  }
}

export function parseHref(href: string) {
  try {
    return new URL(href)
  } catch (e) {
    if (e instanceof TypeError) {
      return new RelativeURL(href)
    }

    throw e
  }
}
