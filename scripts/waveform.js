const fs = require('fs');
const PNG = require('pngjs').PNG;
const { execSync } = require("child_process");

function getWaveformJSON(width, height, trackfile, id) {
    var dd = []

    if (fs.existsSync(`${id}.png`)) {
        fs.unlinkSync(`${id}.png`);
    }

    execSync(`ffmpeg -i '${trackfile}' -filter_complex 'aformat=channel_layouts=mono,compand,showwavespic=s=${width}x${height*2},crop=in_w:in_h/2:0:0' -frames:v 1 '${id}.png' > /dev/null 2>/dev/null`)
    
    var data = fs.readFileSync(`${id}.png`);
    var png = PNG.sync.read(data);
        
    for (var x = 0; x < png.width; x++) {
        var count = 0;
        
        for (var y = 0; y < png.height; y++) {
            var idx = (png.width * y + x) << 2;
    
            if (png.data[idx] === 255)
                count++;
        }
        
        dd.push(count);
    }
    
    fs.unlinkSync(`${id}.png`);
    
    return JSON.stringify(dd);
}

module.exports.getWaveformJSON = getWaveformJSON;
