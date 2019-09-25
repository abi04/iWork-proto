import { defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'graphql-tools';

const moment = require('moment');

export default class RelativeTimeDirective extends SchemaDirectiveVisitor {
  // eslint-disable-next-line class-methods-use-this
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    // eslint-disable-next-line no-param-reassign
    field.resolve = async function getRelativeTime(...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return moment(result).fromNow();
      }
      return result;
    };
  }
}
