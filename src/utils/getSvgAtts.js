import attrsReducer from './attrsReducer';

export default svgDom =>
  [...svgDom.querySelector('svg').attributes].reduce(attrsReducer, {});
