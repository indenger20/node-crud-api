import RouteResolveErrorBase from './router-resolve-base.error';

class RouteResolveError extends RouteResolveErrorBase {
  constructor(message: string) {
    super(message);
    this.name = 'RouteResolveError';
  }
}

export default RouteResolveError;
