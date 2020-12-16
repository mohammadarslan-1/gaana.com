$(document.querySelectorAll('.song')).on('click', function(e){
    var dataSwitchID = $(this).attr('data-switch');
    console.log(dataSwitchID);

    ap.list.switch(dataSwitchID);
    ap.play();
    $(document.querySelectorAll('#aplayer')).addclass('showplayer');
});



const ap = new APlayer({
    container: document.getElementById('aplayer'),
    listFolded: true,
    audio: [{
        name: '2 Cheene',
        artist: 'Khan Bhaini',
        url: '../Music/2_Cheene.mp3',
        cover: 'Media/trending/8.jpg'
    },
    {
        name: 'LOCA',
        artist: 'YO YO Honey Singh',
        url: '../Music/Loca.mp3',
        cover: 'Media/trending/1.jpg'
    },
    {
        name: 'OLD SKOOL',
        artist: 'Prem Dhillon',
        url: '../Music/OLD_SKOOL.mp3',
        cover: 'Media/trending/17.jpg'
    },
    {
        name: 'Kalla Shona Nhi',
        artist: 'Neha Kakkar',
        url: '../Music/Kalla_Shona_Nhi.mp3',
        cover: 'Media/2.jpg'
    },
    {
        name: 'Jannat',
        artist: 'Ammy Virk',
        url: '../Music/Jannat.mp3',
        cover: 'Media/trending/11.jpg'
    },
    {
        name: 'Tum Na Ho',
        artist: 'M. Ajay Vaas, Prakriti Kakar, Arjun Kanungo',
        url: '../Music/Tum_Na_Ho.mp3',
        cover: 'Media/trending/9.jpg'
    }
    ]
});