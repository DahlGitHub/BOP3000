import React, { useCallback, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfFile from '../../public/pdf/tekst.pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
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
                proxyHeaders={corsProxyMiddleware}
              >
                <Page
                  pageNumber={pageNumber}
                  customTextRenderer={textRenderer}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileLoader