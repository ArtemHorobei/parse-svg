import attrsReducer from '../utils/attrsReducer';

export default svgDom =>
  [...svgDom.querySelectorAll('g > g > [id]:not(g)')]
    .filter(
      ({ id }) => !/(^Rectangle)|(^Path)|(^Group)|(^Combined-Shape)/.test(id),
    )
    .map(node => {
      const { innerHTML, attributes } = node.closest('g:not([id])');

      return {
        id: node.id,
        createMarkup: () => ({ __html: innerHTML }),
        atts: [...attributes].reduce(attrsReducer, {}),
      };
    });
