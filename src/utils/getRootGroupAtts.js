import attrsReducer from './attrsReducer';

export default svgDom =>
  [...svgDom.querySelector('svg > g').attributes].reduce(attrsReducer, {});
