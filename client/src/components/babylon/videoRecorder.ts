//import * as bln from 'babylonjs';
//import 'babylonjs-loaders';

let myMediaRecorder: MediaRecorder;

function startRecording(canvas: HTMLCanvasElement)
{
    // Optional frames per second argument.
    var stream = canvas.captureStream(30);
    var recordedChunks = [];

    if (window.MediaRecorder == undefined)
    {
        console.error('MediaRecorder not supported, boo');
    } else
    {
        var contentTypes = ["video/webm",
            "video/webm;codecs=vp8",
            "video/x-matroska;codecs=avc1",
            "audio/webm",
            "video/mp4;codecs=avc1",
            "video/invalid"];
        contentTypes.forEach(contentType =>
        {
            console.log(contentType + ' is '
                + (MediaRecorder.isTypeSupported(contentType) ?
                    'supported' : 'NOT supported '));
        });
    }

    console.log(stream);
    var options = { mimeType: "video/x-matroska;codecs=avc1" };
    myMediaRecorder = new MediaRecorder(stream, options);

    myMediaRecorder.ondataavailable = handleDataAvailable;
    myMediaRecorder.start();

    function handleDataAvailable(event)
    {
        console.log("data-available");
        if (event.data.size > 0)
        {
            recordedChunks.push(event.data);
            console.log(recordedChunks);
            download();
        } else
        {
            // ...
        }
    }
    function download()
    {
        var blob = new Blob(recordedChunks, {
            type: "video/x-matroska"
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        //a.style = "display: none";
        a.href = url;
        a.download = "test30.mkv";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // demo: to download after 9sec
    setTimeout(event =>
    {
        console.log("stopping");
        myMediaRecorder.stop();
    }, 15000);
}

export
{
    startRecording as startRecording,
    //loadModel as loadModel,
    //setCanvas as setCanvas
}