import { ActionResolveError, RouteResolveError } from '../errors/router';
import Router from './router';
import { Request } from './types';

class ActionResolver {
  static async resolve({ request, router }: { request: Request; router: Router }) {
    const routes = router.all;
    const requestUrl = request.url?.toLowerCase() ?? '';
    const httpMethod = request.method?.toUpperCase() ?? '';

    const avalibleRoutesByPath = routes.filter(
      (r) => requestUrl.endsWith(r.path) || requestUrl.startsWith(`${r.path}/`) || requestUrl.startsWith(`${r.path}?`),
    );

    if (!avalibleRoutesByPath.length) {
      throw new RouteResolveError(`A route can not be resolved. The url is: "${requestUrl}".`);
    }

    const route = avalibleRoutesByPath.find((r) => r.method.toUpperCase() === httpMethod.toUpperCase());

    if (!route) {
      throw new ActionResolveError(`An action name can not be resolved. The url is: "${requestUrl}".`);
    }

    return route.controller;
  }
}

export default ActionResolver;
