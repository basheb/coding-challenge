export function routeToRegExp(route: string): RegExp {
  const optionalParam: RegExp = /\((.*?)\)/g,
    namedParam: RegExp = /(\(\?)?:\w+/g,
    splatParam: RegExp = /\*\w?/g,
    escapeRegExp: RegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  if (typeof route !== 'string') {
    throw new Error('The route ' + JSON.stringify(route) + 'has to be a URL');
  }

  route = route.replace(escapeRegExp, '\\$&')
    .replace(optionalParam, '(?:$1)?')
    .replace(namedParam, (match, optional) => optional ? match : '([^/?]+)')
    .replace(splatParam, '([^?]*?)');
  return new RegExp('^\/?' + route + '(?:\\?([\\s\\S]*))?$');
}
