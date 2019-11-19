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
      setCurrSVG(reader.result);
    };
  };

  if (!currSVG) return <div><input type="file" onChange={onFileChange} /></div>;

  const parser = new DOMParser();

  const svgDom = parser.parseFromString(currSVG, "application/xml");
  const svgAttrs = getSvgAtts(svgDom);
  const rootGroupAttrs = getRootGroupAtts(svgDom);
  const subareas = getSubareas(svgDom);

  return (
    <div>
      <div>
        <input type="file" onChange={onFileChange} />
      </div>
      <div style={{ margin: 'auto', width: 500, height: 'auto' }}>
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
      </div>

      <div>
        {subareas.map(({ id, createMarkup, atts }) => (
          <div>
            <span>SVG id: {id}</span>
            <div>
              <span>Township names: </span>
              <input type="text" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadSVG;
