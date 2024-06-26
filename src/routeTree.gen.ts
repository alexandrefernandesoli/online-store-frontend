/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as AdminImport } from './routes/_admin'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutRestrictImport } from './routes/_layout/restrict'
import { Route as LayoutLoginImport } from './routes/_layout/login'
import { Route as LayoutCartImport } from './routes/_layout/cart'
import { Route as LayoutClientIndexImport } from './routes/_layout/client/index'
import { Route as LayoutProductProductIdImport } from './routes/_layout/product.$productId'
import { Route as AdminAdminLoginImport } from './routes/_admin/admin/login'
import { Route as AdminAdminAuthenticatedImport } from './routes/_admin/admin/_authenticated'
import { Route as AdminAdminAuthenticatedIndexImport } from './routes/_admin/admin/_authenticated/index'
import { Route as AdminAdminAuthenticatedUsersImport } from './routes/_admin/admin/_authenticated/users'
import { Route as AdminAdminAuthenticatedProductsIndexImport } from './routes/_admin/admin/_authenticated/products/index'
import { Route as AdminAdminAuthenticatedOrdersIndexImport } from './routes/_admin/admin/_authenticated/orders/index'
import { Route as AdminAdminAuthenticatedClientsIndexImport } from './routes/_admin/admin/_authenticated/clients/index'
import { Route as AdminAdminAuthenticatedProductsNewProductImport } from './routes/_admin/admin/_authenticated/products/new-product'
import { Route as AdminAdminAuthenticatedProductsIdImport } from './routes/_admin/admin/_authenticated/products/$id'
import { Route as AdminAdminAuthenticatedOrdersIdImport } from './routes/_admin/admin/_authenticated/orders/$id'

// Create Virtual Routes

const AdminAdminImport = createFileRoute('/_admin/admin')()
const LayoutRegisterLazyImport = createFileRoute('/_layout/register')()
const LayoutBestSellersLazyImport = createFileRoute('/_layout/best-sellers')()
const LayoutAboutLazyImport = createFileRoute('/_layout/about')()
const LayoutSearchSearchLazyImport = createFileRoute(
  '/_layout/search/$search',
)()

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const AdminRoute = AdminImport.update({
  id: '/_admin',
  getParentRoute: () => rootRoute,
} as any)

const AdminAdminRoute = AdminAdminImport.update({
  path: '/admin',
  getParentRoute: () => AdminRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutRegisterLazyRoute = LayoutRegisterLazyImport.update({
  path: '/register',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/register.lazy').then((d) => d.Route),
)

const LayoutBestSellersLazyRoute = LayoutBestSellersLazyImport.update({
  path: '/best-sellers',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/best-sellers.lazy').then((d) => d.Route),
)

const LayoutAboutLazyRoute = LayoutAboutLazyImport.update({
  path: '/about',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() => import('./routes/_layout/about.lazy').then((d) => d.Route))

const LayoutRestrictRoute = LayoutRestrictImport.update({
  path: '/restrict',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutLoginRoute = LayoutLoginImport.update({
  path: '/login',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutCartRoute = LayoutCartImport.update({
  path: '/cart',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutClientIndexRoute = LayoutClientIndexImport.update({
  path: '/client/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutSearchSearchLazyRoute = LayoutSearchSearchLazyImport.update({
  path: '/search/$search',
  getParentRoute: () => LayoutRoute,
} as any).lazy(() =>
  import('./routes/_layout/search.$search.lazy').then((d) => d.Route),
)

const LayoutProductProductIdRoute = LayoutProductProductIdImport.update({
  path: '/product/$productId',
  getParentRoute: () => LayoutRoute,
} as any)

const AdminAdminLoginRoute = AdminAdminLoginImport.update({
  path: '/login',
  getParentRoute: () => AdminAdminRoute,
} as any)

const AdminAdminAuthenticatedRoute = AdminAdminAuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => AdminAdminRoute,
} as any)

const AdminAdminAuthenticatedIndexRoute =
  AdminAdminAuthenticatedIndexImport.update({
    path: '/',
    getParentRoute: () => AdminAdminAuthenticatedRoute,
  } as any)

const AdminAdminAuthenticatedUsersRoute =
  AdminAdminAuthenticatedUsersImport.update({
    path: '/users',
    getParentRoute: () => AdminAdminAuthenticatedRoute,
  } as any)

const AdminAdminAuthenticatedProductsIndexRoute =
  AdminAdminAuthenticatedProductsIndexImport.update({
    path: '/products/',
    getParentRoute: () => AdminAdminAuthenticatedRoute,
  } as any)

const AdminAdminAuthenticatedOrdersIndexRoute =
  AdminAdminAuthenticatedOrdersIndexImport.update({
    path: '/orders/',
    getParentRoute: () => AdminAdminAuthenticatedRoute,
  } as any)

const AdminAdminAuthenticatedClientsIndexRoute =
  AdminAdminAuthenticatedClientsIndexImport.update({
    path: '/clients/',
    getParentRoute: () => AdminAdminAuthenticatedRoute,
  } as any)

const AdminAdminAuthenticatedProductsNewProductRoute =
  AdminAdminAuthenticatedProductsNewProductImport.update({
    path: '/products/new-product',
    getParentRoute: () => AdminAdminAuthenticatedRoute,
  } as any)

const AdminAdminAuthenticatedProductsIdRoute =
  AdminAdminAuthenticatedProductsIdImport.update({
    path: '/products/$id',
    getParentRoute: () => AdminAdminAuthenticatedRoute,
  } as any)

const AdminAdminAuthenticatedOrdersIdRoute =
  AdminAdminAuthenticatedOrdersIdImport.update({
    path: '/orders/$id',
    getParentRoute: () => AdminAdminAuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_admin': {
      preLoaderRoute: typeof AdminImport
      parentRoute: typeof rootRoute
    }
    '/_layout': {
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/cart': {
      preLoaderRoute: typeof LayoutCartImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/login': {
      preLoaderRoute: typeof LayoutLoginImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/restrict': {
      preLoaderRoute: typeof LayoutRestrictImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/about': {
      preLoaderRoute: typeof LayoutAboutLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/best-sellers': {
      preLoaderRoute: typeof LayoutBestSellersLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/register': {
      preLoaderRoute: typeof LayoutRegisterLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_admin/admin': {
      preLoaderRoute: typeof AdminAdminImport
      parentRoute: typeof AdminImport
    }
    '/_admin/admin/_authenticated': {
      preLoaderRoute: typeof AdminAdminAuthenticatedImport
      parentRoute: typeof AdminAdminRoute
    }
    '/_admin/admin/login': {
      preLoaderRoute: typeof AdminAdminLoginImport
      parentRoute: typeof AdminAdminImport
    }
    '/_layout/product/$productId': {
      preLoaderRoute: typeof LayoutProductProductIdImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/search/$search': {
      preLoaderRoute: typeof LayoutSearchSearchLazyImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/client/': {
      preLoaderRoute: typeof LayoutClientIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_admin/admin/_authenticated/users': {
      preLoaderRoute: typeof AdminAdminAuthenticatedUsersImport
      parentRoute: typeof AdminAdminAuthenticatedImport
    }
    '/_admin/admin/_authenticated/': {
      preLoaderRoute: typeof AdminAdminAuthenticatedIndexImport
      parentRoute: typeof AdminAdminAuthenticatedImport
    }
    '/_admin/admin/_authenticated/orders/$id': {
      preLoaderRoute: typeof AdminAdminAuthenticatedOrdersIdImport
      parentRoute: typeof AdminAdminAuthenticatedImport
    }
    '/_admin/admin/_authenticated/products/$id': {
      preLoaderRoute: typeof AdminAdminAuthenticatedProductsIdImport
      parentRoute: typeof AdminAdminAuthenticatedImport
    }
    '/_admin/admin/_authenticated/products/new-product': {
      preLoaderRoute: typeof AdminAdminAuthenticatedProductsNewProductImport
      parentRoute: typeof AdminAdminAuthenticatedImport
    }
    '/_admin/admin/_authenticated/clients/': {
      preLoaderRoute: typeof AdminAdminAuthenticatedClientsIndexImport
      parentRoute: typeof AdminAdminAuthenticatedImport
    }
    '/_admin/admin/_authenticated/orders/': {
      preLoaderRoute: typeof AdminAdminAuthenticatedOrdersIndexImport
      parentRoute: typeof AdminAdminAuthenticatedImport
    }
    '/_admin/admin/_authenticated/products/': {
      preLoaderRoute: typeof AdminAdminAuthenticatedProductsIndexImport
      parentRoute: typeof AdminAdminAuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AdminRoute.addChildren([
    AdminAdminRoute.addChildren([
      AdminAdminAuthenticatedRoute.addChildren([
        AdminAdminAuthenticatedUsersRoute,
        AdminAdminAuthenticatedIndexRoute,
        AdminAdminAuthenticatedOrdersIdRoute,
        AdminAdminAuthenticatedProductsIdRoute,
        AdminAdminAuthenticatedProductsNewProductRoute,
        AdminAdminAuthenticatedClientsIndexRoute,
        AdminAdminAuthenticatedOrdersIndexRoute,
        AdminAdminAuthenticatedProductsIndexRoute,
      ]),
      AdminAdminLoginRoute,
    ]),
  ]),
  LayoutRoute.addChildren([
    LayoutCartRoute,
    LayoutLoginRoute,
    LayoutRestrictRoute,
    LayoutAboutLazyRoute,
    LayoutBestSellersLazyRoute,
    LayoutRegisterLazyRoute,
    LayoutIndexRoute,
    LayoutProductProductIdRoute,
    LayoutSearchSearchLazyRoute,
    LayoutClientIndexRoute,
  ]),
])

/* prettier-ignore-end */
