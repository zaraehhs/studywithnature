
    let changeBackgroundColors = () => {
        let imgFile = document.getElementById('soundImg');

        let canvas = document.createElement('canvas');
        let context = canvas.getContext("2d");

        let imageDimensions = {
            width: 0,
            height: 0
        };
        let imgData = [];

        let image = new Image(); 
        image.src = imgFile.src;
        image.crossOrigin = "anonymous";

        image.onload = () => {
            imageDimensions.width = image.width * 0.1; //
            imageDimensions.height = image.height * 0.1; 

            canvas.width = imageDimensions.width;
            canvas.height = imageDimensions.height;

            context.drawImage(image, 0, 0,imageDimensions.width, imageDimensions.height);

            let imgDataObj = context.getImageData(0,0,imageDimensions.width,imageDimensions.height).data;
            imgData = Array.from(imgDataObj);

            // console.log(imgData);
            let rgbValues = [];
            // Organize Array to into RGB format
            let buildRgb = (imgData) => {
            
                for (let i = 0; i < imgData.length; i += 4) {
                    let rgb = {
                    r: imgData[i],
                    g: imgData[i + 1],
                    b: imgData[i + 2],
                    };
                    rgbValues.push(rgb);
                }
                return rgbValues;
            };
        console.log(buildRgb(imgData)); 

        // Color Quantization using the Median Cut algorithm 

        let findBiggestColorRange = (rgbValues) => {
            // TODO: change let variables below to const
            let rMin = 255;
            let gMin = 255;
            let bMin = 255;

            let rMax = 0;
            let gMax = 0;
            let bMax = 0;

            rgbValues.forEach((pixel) => {
                rMin = Math.min(rMin, pixel.r);
                gMin = Math.min(gMin, pixel.g);
                bMin = Math.min(bMin, pixel.b); 

                rMax = Math.max(rMax, pixel.r);                
                gMax = Math.max(gMax, pixel.g);                
                bMax = Math.max(bMax, pixel.b);    

            });

            const rRange = rMax - rMin;
            const gRange = gMax - gMin;
            const bRange = bMax - bMin;

            const biggestRange = Math.max(rRange, gRange, bRange);
            if (biggestRange === rRange) {
                return "r";
            } else if (biggestRange === gRange) {
                return "g";
            } else {
                return "b";
            }
            };
        console.log(findBiggestColorRange(rgbValues));

        const quantization = (rgbValues, depth) => {
            const MAX_DEPTH = 4; // we only want two final colors 

            if (depth === MAX_DEPTH || rgbValues.length === 0) {
                const color = rgbValues.reduce((pixel1, pixel2) => 
                    {
                        pixel1.r += pixel2.r;
                        pixel1.g += pixel2.g;
                        pixel1.b += pixel2.b;
                        return pixel1;
                    },
                    {
                        r: 0,
                        g: 0,
                        b: 0,
                    }
                );
                color.r = Math.round(color.r / rgbValues.length);
                color.g = Math.round(color.g / rgbValues.length);
                color.b = Math.round(color.b / rgbValues.length);
                return [color];
            }

            const colorToSortBy = findBiggestColorRange(rgbValues);
            rgbValues.sort((pixel1, pixel2) => {
                return pixel1[colorToSortBy] - pixel2[colorToSortBy];
            });
            const mid = rgbValues.length / 2;
            return [
                ...quantization(rgbValues.slice(0, mid), depth + 1),
                ...quantization(rgbValues.slice(mid + 1), depth + 1),
            ];
        };
        console.log('final colors:', quantization(rgbValues, 0)); // 0 is the root or the starting point
        let colors =  quantization(rgbValues, 0); 
        let gradientContainer = document.getElementById('gradientContainer');

        createGradient(colors); 

        function createGradient(colors){
            gradientContainer.style.backgroundImage = `linear-gradient(115deg, rgb(${colors[0].r},${colors[0].g},${colors[0].b}) 0%,rgb(${colors[4].r},${colors[4].g},${colors[4].b}) 45%,rgb(${colors[9].r},${colors[9].g},${colors[9].b}) 90% )`;

        }

    }
};
changeBackgroundColors();
