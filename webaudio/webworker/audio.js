var context;
var buffer;

function onError()
{
}

function loadAssets(url)
{
    context = new webkitAudioContext();
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        context.decodeAudioData(request.response, function(buf) {
            buffer = buf;
        }, onError);
    }
    request.send();
}


function playSound()
{
    var source = context.createBufferSource();
    source.buffer = buffer;

    source.connect(context.destination);
    source.noteOn(0);
}


self.addEventListener('message', function(e) {
    var data = e.data;
    switch (data) {
        case 'start' :
            self.postMessage('WORKER STARTED: ' + data.msg);
            break;
        case 'stop' :
            self.postMessage('WORKER STOPPED: ' + data.msg + '. (buttons will no longer work)');
            self.close();
            break;
        case 'play' :
            self.playSound();
            break;
        case 'load' :
            self.loadAssets('sound1.wav');
            break;
        default:
            self.postMessage('Unknow command: ' + data);
    };
}, false);



