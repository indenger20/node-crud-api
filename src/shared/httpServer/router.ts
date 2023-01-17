import { Methods } from './constants';
import { Route } from './types';

class Router {
  private routes: Route[] = [];

  private apiPath = '';

  private prepareRoute({ path, controller, method }: Route) {
    this.routes.push({
      path: `${this.apiPath}${path}`,
      method,
      controller,
    });
  }

  setApiPath(path: string) {
    this.apiPath = path;
  }

  get(path: Route['path'], controller: Route['controller']): void {
    this.prepareRoute({ path, controller, method: Methods.GET });
  }

  post(path: Route['path'], controller: Route['controller']) {
    this.prepareRoute({ path, controller, method: Methods.POST });
  }

  put(path: Route['path'], controller: Route['controller']) {
    this.prepareRoute({ path, controller, method: Methods.PUT });
  }

  delete(path: Route['path'], controller: Route['controller']) {
    this.prepareRoute({ path, controller, method: Methods.DELETE });
  }

  get all() {
    return this.routes;
  }
}

export default Router;
