import React, { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/'
};

function highlightPattern(text, pattern) {
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

const FileLoader = ({file}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

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

  return (
    <div className="">
      <div className="m-2 shadow-xl">
        {
          // Add custom sheet styling above className Example__container__document
        }
        <div>

          {file ? <Document
                file={file.file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
                httpHeaders={{'Access-Control-Allow-Origin': '*'}}
                proxyUrl="/api/proxy"
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
        <div className="fixed left-0 right-0 bottom-10 bg-gray-200 w-fit m-auto p-2 rounded-lg opacity-[0.9]">
          <div className="flex items-center">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className={`p-2 rounded-lg `}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <p>
              Page {pageNumber || (numPages ? 1 : "--")} of{" "}
              {numPages || "--"}
            </p>
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
            onClick={handleZoomIn}
            className={`p-2 rounded-lg `}
          >
            <FontAwesomeIcon icon={faSearchPlus} />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className={`p-2 rounded-lg `}
          >
            <FontAwesomeIcon icon={faSearchMinus} />
          </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default FileLoader