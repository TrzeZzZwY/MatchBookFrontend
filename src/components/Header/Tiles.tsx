import React, { useEffect, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import './header.scss';

const Grid: React.FC = () => {
    const [columns, setColumns] = useState(Math.floor(document.documentElement.clientWidth / 50));
    const [rows, setRows] = useState(Math.floor(document.documentElement.clientHeight / 50));
    const [totalTiles, setTotalTiles] = useState(0);

    const tilesRef = React.useRef<HTMLDivElement>(null);

    const colors = [
        'rgb(229,57,53)',
        'rgb(244,67,54)',
        'rgb(233,30,99)',
        'rgb(156,39,176)',
        'rgb(103,58,183)',
        'rgb(63,81,181)',
        'rgb(33,150,243)',
        'rgb(3,169,244)',
    ];

    let count = -1;

    const createTile = (i: number): HTMLDivElement => {
        const tile: HTMLDivElement = document.createElement('div');
        tile.classList.add('tile');

        tile.onclick = () => handleOnClick(i);
        return tile;
    };

    let toggled = true;

    const handleOnClick = (e: number) => {
        count = count + 1;
       toggled = !toggled;
        anime({
            targets: '.tile',
            opacity: toggled ? 0 : 1,
            backgroundColor: colors[count % (colors.length - 1)],
            scale: [
                { value: 0.1, easing: 'easeOutSine', duration: 500 },
                { value: 1, easing: 'easeInOutQuad', duration: 1200 },
            ],
            delay: anime.stagger(50, {
                grid: [columns, rows],
                from: e,
            }),
        });
    };

    const createTiles = (quantity: number) => {
        Array.from(Array(quantity)).map((_, i) => {
            if (tilesRef.current) {
                tilesRef.current.appendChild(createTile(i));
            }
        });
    };

    const createGrid = () => {
        if (tilesRef.current) {
            tilesRef.current.innerHTML = '';
            const newColumns = Math.floor(document.documentElement.clientWidth / 50);
            const newRows = Math.floor(document.documentElement.clientHeight / 50);

            setColumns(newColumns);
            setRows(newRows);

            tilesRef.current.style.setProperty('--columns', newColumns.toString());
            tilesRef.current.style.setProperty('--rows', newRows.toString());

            const newTotalTiles = newColumns * newRows;
            setTotalTiles(newTotalTiles);
            createTiles(newTotalTiles);
        }
    };

    useEffect(() => {
        createGrid();

        const handleResize = () => {
            createGrid();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div id="tiles" ref={tilesRef}></div>;
};

export default Grid;
