import { FieldError } from '../generated/graphql';

export const errorMap = (errors: FieldError[]) => {
  const ErrorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    ErrorMap[field] = message.charAt(0).toUpperCase() + message.slice(1);
  });

  return ErrorMap;
};
