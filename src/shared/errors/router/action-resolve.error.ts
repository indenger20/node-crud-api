import RouteResolveErrorBase from './router-resolve-base.error';

class ActionResolveError extends RouteResolveErrorBase {
  constructor(message: string) {
    super(message);
    this.name = 'ActionResolveError';
  }
}

export default ActionResolveError;
