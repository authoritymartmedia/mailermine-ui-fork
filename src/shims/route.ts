type RouteParams = string | number | Record<string, string | number> | undefined

const namedRoutes: Record<string, string | ((params?: RouteParams) => string)> = {
  'website.home': '/',
  'website.features': '/features',
  'website.pricing': '/pricing',
  'website.docs': '/docs',
  'website.changelog': '/changelog',
  'website.blog': '/blog',
  'website.blog.show': (params) => {
    const slug =
      typeof params === 'string' || typeof params === 'number'
        ? String(params)
        : String(params?.slug ?? '')
    return `/blog/${slug}`
  },
  'website.integrations': '/integrations',
  'website.about': '/about',
  'website.customers': '/customers',
  'website.contact': '/contact',
  'website.privacy': '/privacy',
  'website.terms': '/terms',
  'website.status': '/status',
  login: '/login',
  register: '/register',
  signup: '/signup',
  'password.request': '/forgot-password',
  'password.email': '/forgot-password',
  'password.store': '/reset-password',
  logout: '/login',
  'verification.send': '/login',
  dashboard: '/',
}

/**
 * Ziggy-compatible route helper for the standalone public UI.
 * Only public named routes are mapped.
 */
export function route(name: string, params?: RouteParams, _absolute?: boolean): string {
  const entry = namedRoutes[name]
  if (!entry) {
    console.warn(`[mailermine-ui] Unknown route: ${name}`)
    return '/'
  }
  return typeof entry === 'function' ? entry(params) : entry
}

export function installRouteHelper() {
  const g = globalThis as typeof globalThis & { route: typeof route }
  g.route = route
  if (typeof window !== 'undefined') {
    ;(window as Window & { route: typeof route }).route = route
  }
}
