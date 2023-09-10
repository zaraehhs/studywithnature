
    let grabImg = () => {
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

        }

        };
    grabImg();
