import {
  Children,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEventHandler,
  type ReactNode,
} from 'react'
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
  type NavigateFunction,
} from 'react-router-dom'

type InertiaLinkProps = Omit<RouterLinkProps, 'to'> & {
  href: string
  children?: ReactNode
  className?: string
  onClick?: MouseEventHandler
}

/** Drop-in replacement for Inertia `<Link href="...">`. */
export function Link({ href, children, ...props }: InertiaLinkProps) {
  return (
    <RouterLink to={href} {...props}>
      {children}
    </RouterLink>
  )
}

type HeadProps = {
  title?: string
  children?: ReactNode
}

function collectText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map(collectText).join('')
  }
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return collectText(node.props.children)
  }
  return ''
}

/** Minimal Inertia `<Head>` stand-in for titles and meta tags. */
export function Head({ title, children }: HeadProps) {
  useEffect(() => {
    const nodes = Children.toArray(children)
    let pageTitle = title ?? ''

    for (const node of nodes) {
      if (!isValidElement(node)) continue
      const type = node.type
      const props = node.props as Record<string, unknown>

      if (type === 'title') {
        pageTitle = collectText(props.children as ReactNode)
      }

      if (type === 'meta' && typeof props.name === 'string') {
        let el = document.querySelector(`meta[name="${props.name}"]`) as HTMLMetaElement | null
        if (!el) {
          el = document.createElement('meta')
          el.setAttribute('name', props.name)
          document.head.appendChild(el)
        }
        if (typeof props.content === 'string') {
          el.content = props.content
        }
      }

      if (type === 'meta' && typeof props.property === 'string') {
        let el = document.querySelector(
          `meta[property="${props.property}"]`,
        ) as HTMLMetaElement | null
        if (!el) {
          el = document.createElement('meta')
          el.setAttribute('property', props.property)
          document.head.appendChild(el)
        }
        if (typeof props.content === 'string') {
          el.content = props.content
        }
      }

      if (type === 'link' && props.rel === 'canonical' && typeof props.href === 'string') {
        let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
        if (!el) {
          el = document.createElement('link')
          el.rel = 'canonical'
          document.head.appendChild(el)
        }
        el.href = props.href
      }
    }

    if (pageTitle) {
      document.title = pageTitle.includes('MailerMine')
        ? pageTitle
        : `${pageTitle} — MailerMine`
    }
  }, [title, children])

  return null
}

type FormDataValue = string | number | boolean | null | undefined
type FormDataRecord = Record<string, FormDataValue>

type UseFormReturn<T extends FormDataRecord> = {
  data: T
  setData: {
    <K extends keyof T>(key: K, value: T[K]): void
    (values: Partial<T>): void
  }
  post: (_url?: string, _options?: { onFinish?: () => void }) => void
  processing: boolean
  errors: Partial<Record<keyof T, string>>
  reset: (...fields: Array<keyof T>) => void
  transform: (callback: (data: T) => T) => void
}

/** UI-only form helper — never hits a backend. */
export function useForm<T extends FormDataRecord>(initial: T): UseFormReturn<T> {
  const [data, setDataState] = useState<T>(initial)
  const initialRef = useRef(initial)
  const transformRef = useRef<(data: T) => T>((d) => d)

  const setData: UseFormReturn<T>['setData'] = ((keyOrValues: keyof T | Partial<T>, value?: T[keyof T]) => {
    if (typeof keyOrValues === 'object') {
      setDataState((prev) => ({ ...prev, ...keyOrValues }))
      return
    }
    setDataState((prev) => ({ ...prev, [keyOrValues]: value as T[keyof T] }))
  }) as UseFormReturn<T>['setData']

  return {
    data,
    setData,
    post: (_url, options) => {
      transformRef.current(data)
      options?.onFinish?.()
    },
    processing: false,
    errors: {},
    reset: (...fields) => {
      if (fields.length === 0) {
        setDataState(initialRef.current)
        return
      }
      setDataState((prev) => {
        const next = { ...prev }
        for (const field of fields) {
          next[field] = initialRef.current[field]
        }
        return next
      })
    },
    transform: (callback) => {
      transformRef.current = callback
    },
  }
}

let navigateRef: NavigateFunction | null = null

export function bindNavigate(navigate: NavigateFunction) {
  navigateRef = navigate
}

function toQuery(data?: Record<string, unknown>): string {
  if (!data) return ''
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null || value === '') continue
    params.set(key, String(value))
  }
  const qs = params.toString()
  return qs ? `?${qs}` : ''
}

/** Minimal Inertia router stand-in for client navigation. */
export const router = {
  get(url: string, data?: Record<string, unknown>, _options?: { preserveState?: boolean }) {
    const path = url.startsWith('http') ? new URL(url).pathname + new URL(url).search : url
    const [base, existingQs] = path.split('?')
    const merged = new URLSearchParams(existingQs ?? '')
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null || value === '') {
          merged.delete(key)
        } else {
          merged.set(key, String(value))
        }
      }
    }
    const qs = merged.toString()
    const target = `${base}${qs ? `?${qs}` : ''}${toQuery()}`
    if (navigateRef) {
      navigateRef(target)
    } else {
      window.location.assign(target)
    }
  },
}

export function usePage<T extends Record<string, unknown> = Record<string, unknown>>() {
  return useMemo(
    () => ({
      props: {} as T,
      url: typeof window !== 'undefined' ? window.location.pathname : '/',
      component: '',
    }),
    [],
  )
}

// Silence unused FormEvent import in some TS configs when only used in consumers
export type { FormEvent }
