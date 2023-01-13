(function () {
    let receiverID;
    const socket = io();

    function generateID() {
        return `${Math.trunc(Math.random() * 999)}-${Math.trunc(Math.random() * 999)}-${Math.trunc(Math.random() * 999)}`
    }

    document.querySelector('#sender-start-con-btn').addEventListener('click', function() {
        let joinID = generateID();
        document.querySelector('#join-id').innerHTML = `
            <b>Room ID</b>
            <span>${joinID}</span>
        `;
        socket.emit('sender-join', {
            uid: joinID
        });
    });
    socket.on('init', function(uid){
        receiverID = uid;
        document.querySelector('.join-screen').classList.remove('active');
        document.querySelector('.fs-screen').classList.add('active');
    });

    document.querySelector('#file-input').addEventListener('change', function (e) {
        let file = e.target.files[0];
        if(!file) {
            return;
        }
        let reader = new FileReader();
        reader.onload = function (e) {
            let buffer = new Uint8Array(reader.result);
            console.log(buffer);
        }
        reader.readAsArrayBuffer(file);
    });
})();