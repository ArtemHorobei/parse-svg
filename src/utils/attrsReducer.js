import { camelize } from 'xcase';

export default (result, { name, value }) => ({
  ...result,
  [camelize(camelize(name, '-'), ':')]: value,
});
