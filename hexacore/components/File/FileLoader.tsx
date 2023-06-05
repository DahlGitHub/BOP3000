import React, { useCallback, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfFile from '../../public/pdf/tekst.pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCompress, faExpand, faMagnifyingGlassPlus, faMagnifyingGlassMinus } from '@fortawesome/free-solid-svg-icons';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import { createProxyMiddleware } from 'http-proxy-middleware';

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/'
};

const corsProxyMiddleware = createProxyMiddleware({
  target: 'https://firebasestorage.googleapis.com/v0/b/hexacore-1c84b.appspot.com',
  changeOrigin: true,
});

function highlightPattern(text, pattern) {
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

const FileLoader = ({file}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const containerRef = useRef(null);

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
    setPageNumber(1);
  }

  const [searchText, setSearchText] = useState('');

  const textRenderer = useCallback(
    (textItem) => highlightPattern(textItem.str, searchText),
    [searchText]
  );

  function onChange(event) {
    setSearchText(event.target.value);
  }

  function onItemClick({ pageNumber: itemPageNumber }) {
    setPageNumber(itemPageNumber);
  }

  const handleZoomIn = () => setScale(scale + 0.2);
  const handleZoomOut = () => setScale(scale - 0.2);

  function enterFullScreen() {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();

    setIsFullScreen(true);
    }

  }

  function exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    setIsFullScreen(false);
    }
  }
  

  return (
    <div>
      <div className={`m-2 shadow-xl bg-white ${isFullScreen ? 'flex justify-center items-center' : ''}`} ref={containerRef}>
        {
          // Add custom sheet styling above className Example__container__document
        }
        <div className="overflow-auto max-h-screen">

          {file ? <Document
                file={file.file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
                httpHeaders={{'Access-Control-Allow-Origin': '*'}}
                proxyUrl="/api/proxy"
                proxyHeaders={corsProxyMiddleware}
                className=""
              >
                <Page
                  pageNumber={pageNumber}
                  customTextRenderer={textRenderer}
                  scale={scale}
                />
            </Document>
            :
            <p></p>
          }
          
        </div>
        <div className="fixed left-0 right-0 bottom-10 bg-gray-200 z-10 dark:bg-gray-800 dark:text-gray-50 w-fit m-auto p-2 rounded-lg opacity-[0.9]">
          <div className="flex items-center">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 rounded-lg"
          >
            <FontAwesomeIcon icon={faMagnifyingGlassPlus}/>
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 rounded-lg mr-4 "
          >
            <FontAwesomeIcon icon={faMagnifyingGlassMinus}/>
          </button>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className={`p-2 rounded-lg `}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <input
          type="number"
          value={pageNumber}
          
          onChange={(e) => {
            const newPageNumber = parseInt(e.target.value);
            if (!isNaN(newPageNumber) && newPageNumber >= 1 && newPageNumber <= numPages) {
              setPageNumber(newPageNumber);
            }
          }}
          style={{
            WebkitAppearance: 'none',
            MozAppearance: 'textfield',
          }}
          className="w-16 px-2 py-1 mx-2 rounded-lg text-center dark:bg-gray-700"
        />
        <p>of {numPages || "--"}</p>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className={`p-2 rounded-lg `}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
  
            <button
              type="button"
              onClick={isFullScreen ? exitFullScreen : enterFullScreen}
              className="p-2 rounded-lg ml-4"
              >
              <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileLoader