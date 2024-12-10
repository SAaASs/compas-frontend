import { useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/webpack";
import {CurrentFileContext} from "../contexts/CurrentFileContext";
import { useContext } from 'react';
import {baseApi} from "../utils/Api";
// Укажите путь к воркеру PDF.js
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js`;

const PdfHighlighter = () => {
    const canvasRef = useRef(null);
    const currentFile = useContext(CurrentFileContext);
    baseApi.getFile('7enYF2uL5kFZlOOpQhLl0nUT91RjCbeR.pdf')
    useEffect(() => {
        const loadPdf = async () => {
            const pdf = await getDocument('https://cdi.althgamer.ru/pdfs/'+currentFile.document_name).promise; // Загрузка PDF
            const page = await pdf.getPage(currentFile.page_number); // Получение страницы

            const viewport = page.getViewport({ scale: 1.5 }); // Масштаб
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Рендер страницы
            await page.render({ canvasContext: context, viewport }).promise;

            // Рисуем выделение, если указаны координаты
            if (currentFile.bbox) {
                const [x, y, width, height] = currentFile.bbox;
                context.strokeStyle = "red";
                context.lineWidth = 2;
                context.strokeRect(
                    x * viewport.scale,
                    viewport.height - y * viewport.scale - height * viewport.scale,
                    width * viewport.scale,
                    height * viewport.scale
                );
            }
        };

        loadPdf();
    });

    return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
};

export default PdfHighlighter;