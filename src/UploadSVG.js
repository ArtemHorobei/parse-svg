import React from 'react';
import './App.css';
import cn from 'classnames';
import getSvgAtts from './utils/getSvgAtts';
import getRootGroupAtts from './utils/getRootGroupAtts';
import getSubareas from './utils/getSubareas';

function UploadSVG() {
  const [currSVG, setCurrSVG] = React.useState(null);
  const [selectedId, setSelectedId] = React.useState('');

  const onFileChange = ({
    target: {
      files,
    },
  }) => {
    const [file] = Array.from(files);

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = () => {
      setCurrSVG({
        asStringResult: reader.result,
        name: file.name,
        size: file.size,
      });
    };
  };

  const parseSVG = () => {
    if (currSVG) {
      const parser = new DOMParser();

      const svgDom = parser.parseFromString(currSVG.asStringResult, "application/xml");
      const svgAttrs = getSvgAtts(svgDom);
      const rootGroupAttrs = getRootGroupAtts(svgDom);
      const subareas = getSubareas(svgDom);

      return (
        <svg {...svgAttrs} width={null} height={null}>
          <g {...rootGroupAttrs}>
            {subareas.map(({ id, createMarkup, atts }) => (
              <g
                key={id}
                id={id}
                {...atts}
                className={cn({
                  'selected': id === selectedId,
                })}
                dangerouslySetInnerHTML={createMarkup()}
                onClick={() => setSelectedId(selectedId === id ? '' : id)}
              />
            ))}
          </g>
        </svg>
      );
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={onFileChange} />
      </div>
      <div style={{ margin: 'auto', width: 500, height: 'auto' }}>
        {parseSVG()}
      </div>

      <div>SVG id: {selectedId}</div>
    </div>
  );
}

export default UploadSVG;
