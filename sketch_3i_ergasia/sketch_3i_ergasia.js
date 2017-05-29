function getLyrics(){

var trackSearch = document.getElementById("trackSearch").value; //to pedio  tis html pairnei auto pou exei pliktrologisei o xristis kai to apothikeuei stin metavliti trackSearch
document.getElementById("lyrics").textContent = ""; //to pedio adeiazei
  $.ajax({
    type: "GET",
    data: {
        apikey:"2e3e3ef15df36409d9f2f6eb5ea55c1b", //to apikey tou logariasmou pou dimiourgisa sto musixmatch api
        q_track: trackSearch, //orizetai o titlos tou tragoudiou
        s_track_rating: 'desc', //fthinousa anazitisi, ta pio gnwsta tragoudia emfanizontai prwta
        format:"jsonp", //i morfi pou epistrefei tin apadisi o server
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/track.search", //i leitourgia tou api pou xrisimopoiei
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) { //an i apadisi einai epituxis
        getLyricsNow(data.message.body.track_list[0].track.track_id); //anazita to ID tou tragoudiou kai epeita to apostelei stin getLyricsNow

    },
    error: function(jqXHR, textStatus, errorThrown) { //se periptwsi pou uparksei kapoio sfalma kai i apadisi dn einai epituxis
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 };


 function getLyricsNow(trackId){
  
  $.ajax({
    type: "GET",
    data: {
        apikey:"2e3e3ef15df36409d9f2f6eb5ea55c1b", //to apikey tou logariasmou pou dimiourgisa sto musixmatch api
        track_id: trackId, //to onoma tou tragoudiou
        format:"jsonp", //i morfi pou epistrefei tin apadisi o server
        callback:"jsonp_callback"
    },
    url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get", //i leitourgia tou api pou xrisimopoiei
    dataType: "jsonp",
    jsonpCallback: 'jsonp_callback',
    contentType: 'application/json',
    success: function(data) { //an i apadisi einai epituxis
      var lyricsBody = data.message.body.lyrics.lyrics_body.split(/\s+/).slice(0,100).join(" ")+ "..."; //morfopoiisi sta lyrics
       
        var j = document.createElement("p") //dimiourgia stoixiou paragrafou gia tin html
        j.textContent = lyricsBody //topothetei ta logia sti paragrafo
        document.getElementById("lyrics").appendChild(j) //topothetei ti paragrafo stin istoselida
    },
    error: function(jqXHR, textStatus, errorThrown) { //se periptwsi pou uparksei kapoio sfalma kai i apadisi dn einai epituxis
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
    }    
  });
 };