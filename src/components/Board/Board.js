import React, {useEffect, useRef, useState} from 'react';
import styles from './Board.module.css';
import PropTypes from 'prop-types';
import logoImage from './logo.svg';

function Board({maze, currentCell}) {
    const canvas = useRef(null);
    const container = useRef(null);
    const [ctx, setCtx] = useState(undefined);
    const [blockWidthState, setBlockWidthState] = useState(0);
    const [blockHeightState, setBlockHeightState] = useState(0);
    const [logoSizeState, setLogoSizeState] = useState(0);
    const [xOffsetState, setXOffsetState] = useState(0);
    const [image, setImage] = useState(null);
    // const [blockHeightState,setBlockHeightState] = useState(0)
    // const [imageState, setImageState] = useState(null)
    // const [xOffsetState, setXOffsetState] = useState(0);
    // const [logoSizeState,setLogoSizeState] = useState(0)

    useEffect(() => {
        const fitToContainer = () => {
            const {offsetWidth, offsetHeight} = container.current;
            canvas.current.width = offsetWidth;
            canvas.current.height = offsetHeight;
            canvas.current.style.width = offsetWidth + 'px';
            canvas.current.style.height = offsetHeight + 'px';
        };

        setCtx(canvas.current.getContext('2d'));
        setTimeout(fitToContainer, 0);
    }, []);

    useEffect(()=>{
        const drawLine = (x1, y1, width, height) => {
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + width, y1 + height);
            ctx.stroke();
        };
        const draw = () => {
            if (!maze) {
                return;
            }
            ctx.fillStyle = 'blue';
            ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

            // console.log(blockWidth)
            // setBlockWidthState(blockWidth);
            /**
             * Set blockWidth state
             */
            const blockWidth = Math.floor(canvas.current.width / maze.cols);
            setBlockWidthState(blockWidth)

            /**
             * Set blockHeight state
             */
            const blockHeight = Math.floor(canvas.current.height / maze.rows);
            setBlockHeightState(blockHeight)

            /**
             * Set xOffset state
             */
            const xOffset = Math.floor((canvas.current.width - maze.cols * blockWidth) / 2);
            // setXOffset(Math.floor((canvas.current.width - maze.cols * blockWidth) / 2))
            setXOffsetState(xOffset)

            for (let y = 0; y < maze.rows; y++) {
                for (let x = 0; x < maze.cols; x++) {
                    const cell = maze.cells[x + y * maze.cols];
                    if (y === 0 && cell[0]) {
                        drawLine(blockWidth * x + xOffset, blockHeight * y, blockWidth, 0);
                    }
                    if (cell[1]) {
                        drawLine(blockWidth * (x + 1) + xOffset, blockHeight * y, 0, blockHeight);
                    }
                    if (cell[2]) {
                        drawLine(blockWidth * x + xOffset, blockHeight * (y + 1), blockWidth, 0);
                    }
                    if (x === 0 && cell[3]) {
                        drawLine(blockWidth * x + xOffset, blockHeight * y, 0, blockHeight);
                    }
                }
            }
            /**
             * Set logoSize state
             */
            const logoSize = 0.75 * Math.min(blockWidth, blockHeight);
            setLogoSizeState(logoSize)

            /**
             * Set image state
             * @type {HTMLImageElement}
             */
                // setImage(image)
            const imageIcon = new Image(logoSize, logoSize);
            setImage(imageIcon)

            imageIcon.onload = () => {

                // loadImage(imageIcon, blockWidth, xOffset, logoSize, blockHeight)

                ctx.drawImage(imageIcon, currentCell[0] * blockWidth + xOffset + (blockWidth - logoSize) / 2, currentCell[1] * blockHeight + (blockHeight - logoSize) / 2, logoSize, logoSize);

                console.log('a',currentCell[1] * blockHeight + (blockHeight - logoSize) / 2)
            };

            imageIcon.src = logoImage;
            const textSize = Math.min(blockWidth, blockHeight);
            ctx.fillStyle = 'red';
            ctx.font = '20px "Joystix"';
            ctx.textBaseline = 'top';
            ctx.fillText('Goal', maze.endCell[1] * blockWidth + xOffset + (blockWidth - textSize) / 2, maze.endCell[0] * blockHeight + (blockHeight - textSize) / 2, textSize)
        };

        draw();

    },[ctx,currentCell,maze])

    useEffect(() => {


        const loadImage = (image,blockWidth, xOffset, logoSize, blockHeight) => {
            ctx.clearRect(currentCell[0] * blockWidthState + xOffsetState + (blockWidthState - logoSizeState) / 2,currentCell[1] * blockHeightState + (blockHeightState - logoSizeState) / 2,logoSizeState,logoSizeState)

            ctx.drawImage(image, currentCell[0] * blockWidth + xOffset + (blockWidth - logoSize) / 2, currentCell[1] * blockHeight + (blockHeight - logoSize) / 2, logoSize, logoSize);
        }

        // const draw = () => {
        //     if (!maze) {
        //         return;
        //     }
        //     ctx.fillStyle = 'blue';
        //     ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
        //
        //     // console.log(blockWidth)
        //     // setBlockWidthState(blockWidth);
        //     /**
        //      * Set blockWidth state
        //      */
        //     // const blockWidth = Math.floor(canvas.current.width / maze.cols);
        //     setBlockWidth(Math.floor(canvas.current.width / maze.cols))
        //
        //     /**
        //      * Set blockHeight state
        //      */
        //     // const blockHeight = Math.floor(canvas.current.height / maze.rows);
        //     setBlockHeight(Math.floor(canvas.current.height / maze.rows))
        //
        //     /**
        //      * Set xOffset state
        //      */
        //     // const xOffset = Math.floor((canvas.current.width - maze.cols * blockWidth) / 2);
        //     setXOffset(Math.floor((canvas.current.width - maze.cols * blockWidth) / 2))
        //
        //     for (let y = 0; y < maze.rows; y++) {
        //         for (let x = 0; x < maze.cols; x++) {
        //             const cell = maze.cells[x + y * maze.cols];
        //             if (y === 0 && cell[0]) {
        //                 drawLine(blockWidth * x + xOffset, blockHeight * y, blockWidth, 0)
        //             }
        //             if (cell[1]) {
        //                 drawLine(blockWidth * (x + 1) + xOffset, blockHeight * y, 0, blockHeight);
        //             }
        //             if (cell[2]) {
        //                 drawLine(blockWidth * x + xOffset, blockHeight * (y + 1), blockWidth, 0);
        //             }
        //             if (x === 0 && cell[3]) {
        //                 drawLine(blockWidth * x + xOffset, blockHeight * y, 0, blockHeight);
        //             }
        //         }
        //     }
        //     /**
        //      * Set logoSize state
        //      */
        //     // const logoSize = 0.75 * Math.min(blockWidth, blockHeight);
        //     setLogoSize(0.75 * Math.min(blockWidth, blockHeight))
        //
        //     /**
        //      * Set image state
        //      * @type {HTMLImageElement}
        //      */
        //         // setImage(image)
        //     const imageIcon = new Image(logoSize, logoSize);
        //      // setImage(imageIcon)
        //
        //     imageIcon.onload = () => {
        //
        //         loadImage(imageIcon, blockWidth, xOffset, logoSize, blockHeight)
        //
        //         // ctx.drawImage(image, currentCell[0] * blockWidth + xOffset + (blockWidth - logoSize) / 2, currentCell[1] * blockHeight + (blockHeight - logoSize) / 2, logoSize, logoSize);
        //     };
        //
        //     imageIcon.src = logoImage;
        //     const textSize = Math.min(blockWidth, blockHeight);
        //     ctx.fillStyle = 'red';
        //     ctx.font = '20px "Joystix"';
        //     ctx.textBaseline = 'top';
        //     ctx.fillText('Goal', maze.endCell[1] * blockWidth + xOffset + (blockWidth - textSize) / 2, maze.endCell[0] * blockHeight + (blockHeight - textSize) / 2, textSize)
        // };

        const onPressKeys = () => {
            window.onkeydown = (e) => {
                switch (e.keyCode) {
                    case 37:
                        console.log('maze cols',maze)



                        setXOffsetState((prevState) => {
                            const newXOffState = prevState - 3;

                            loadImage(image,blockWidthState,newXOffState,logoSizeState,blockHeightState)

                            return newXOffState;
                        })
                        break;
                    case 38:
                        // up key pressed
                        console.log('Up key');
                        break;
                    case 39:
                        //right key pressed
                        setXOffsetState((prevState) => {
                            const newXOffState = prevState + 3;
                            console.log(newXOffState)
                            loadImage(image,blockWidthState,newXOffState,logoSizeState,blockHeightState)

                            return newXOffState
                        })
                        console.log('Right key');
                        break;
                    case 40:
                        // down key pressed
                        console.log('Down key');
                        setBlockHeightState((prevState) => {
                            const newBlockHeightState = prevState + 3;
                            console.log(newBlockHeightState)
                            loadImage(image,blockWidthState,xOffsetState,logoSizeState,newBlockHeightState)

                            return newBlockHeightState
                        })
                        break;
                    default:
                        break;
                }
            }

        }
        onPressKeys();
    }, [xOffsetState,ctx,maze,blockHeightState]);


    return (
        <div
            className={styles.root}
            ref={container}>
            <canvas ref={canvas}/>
        </div>
    );
}

Board.propTypes = {
    maze: PropTypes.shape({
        cols: PropTypes.number.isRequired,
        rows: PropTypes.number.isRequired,
        cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)).isRequired,
        currentCell: PropTypes.arrayOf(PropTypes.number)
    })
};

export default Board;
