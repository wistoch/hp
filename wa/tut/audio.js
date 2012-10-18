var context;
var buffer;

function onError()
{
    console.log("onError");
}

function loadAssets(url)
{
    console.log("loadAssets");
    console.log(url);
    context = new webkitAudioContext();
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        console.log("request.onlod");
        context.decodeAudioData(request.response, function(buf) {
            console.log("buffer = buf");
            buffer = buf;
            console.log(buffer);
        }, onError);
    }
    request.send();
}


function playSound()
{
    console.log("playSound");
    var source = context.createBufferSource();
    source.buffer = buffer;

    source.connect(context.destination);
    console.log(source.buffer);
    console.log(source);
    console.log(context.destination);
    source.noteOn(0);
}


