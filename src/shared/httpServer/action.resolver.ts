import { validate as validateUuid } from 'uuid';
import { ActionResolveError, RouteResolveError } from '../errors/router';
import Request from './Request';
import Router from './router';

// eslint-disable-next-line no-useless-escape
export const URL_ID_REG = /.+\/([a-z0-9\-])+\/?$/;
const urlLengthWithId = 3;

class ActionResolver {
  static async resolve({ request, router }: { request: Request; router: Router }) {
    const routes = router.all;

    const requestUrl = request.url?.toLowerCase() ?? '';
    const httpMethod = request.method?.toUpperCase() ?? '';

    const avalibleRoutesByPath = routes.filter((r) => {
      // TODO: bad smells code

      const isUrlWithId = validateUuid(requestUrl.split('/')[urlLengthWithId]);
      const isRouteWithId = r.path.split('/')[urlLengthWithId] === ':id';

      if (isUrlWithId && isRouteWithId) {
        return true;
      }

      return requestUrl.endsWith(r.path) || requestUrl.startsWith(`${r.path}/`) || requestUrl.startsWith(`${r.path}?`);
    });

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
