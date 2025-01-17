(function (window) {

    //add prototype to window
    window.storageManager = new StorageManager();

	//main prototype
	function StorageManager() {
        //prototype functions
        this.init = function(){
            //initiate object variables
            this.prefix = "br_"; //used for distinguishing local storage
            this.initFirebase();
            this.getDevMessage();
        };
        this.tick = function (delta) {  };
        this.trimLevel = function(expandedLevel){
            var mapRegex = /<map[^>]*>((.|[\n\r])*)<\/map>/im; //http://stackoverflow.com/a/3642850/2510368
            var tipRegex = /<tip[^>]*>((.|[\n\r])*)<\/tip>/im;
            this.levelString = mapRegex.exec(expandedLevel)[1].trim();
            this.tipString = tipRegex.exec(expandedLevel)[1].trim();
        };
        this.trimLocalLevel = function(key, hasFileOrigin){
            var rawLevelString = "";
            if (hasFileOrigin == true) rawLevelString = window.Game.assetManager.preload.getResult(key+"").toString();
            else rawLevelString = this.getFromLocalStorage(this.prefix+key); //get storage by key
            this.trimLevel(rawLevelString);
        };
        this.expandLevel = function(){
            return "<map>\r\n"+this.levelString+"\r\n</map>\r\n<tip>\r\n"+this.tipString+"\r\n</tip>";
        };
        this.saveToLocalStorage = function(index){
            if (index == null){	index = 1; while (localStorage.getItem(this.prefix + index) !== null){ index++; }}
            localStorage.setItem(this.prefix + index,this.expandLevel());
            return index;
        };
        this.setLevelString = function(levelString){ this.levelString = levelString; };
        this.getFromLocalStorage = function(key){ return localStorage.getItem(key); };
        this.getLocalStorageLength = function(){ return localStorage.length; };
        this.getLocalStorageKey = function(index) { return localStorage.key(index); };
        this.removeFromLocalStorage = function(key){ localStorage.removeItem(this.prefix + key); };
        this.clearLocalStorage = function() { localStorage.clear(); }
        this.initFirebase = function(){
            // Initialize Firebase Server 1
            /* var config = {
                apiKey: "AIzaSyDgloTjVeV6Nbw8ZdEQudVsDs67tpwJ3AE",
                authDomain: "boxel-8413f.firebaseapp.com",
                databaseURL: "https://boxel-8413f.firebaseio.com",
                projectId: "boxel-8413f",
                storageBucket: "boxel-8413f.appspot.com",
                messagingSenderId: "871320630613"
            }; */
            // Initialize Firebase Server 2
            /* var config = {
                apiKey: "AIzaSyBo77sWPIHP1iVAxb2djixVa7ckTZAT3J8",
                authDomain: "boxel-rebound.firebaseapp.com",
                databaseURL: "https://boxel-rebound.firebaseio.com",
                storageBucket: "boxel-rebound.appspot.com",
                messagingSenderId: "158486578224"
            }; */
            // Initialize Firebase Server 3
            var config = {
                apiKey: "AIzaSyB0mhUIxPYCfTqDKRsUO1Q7vHOKxcCVjEY",
                authDomain: "boxel-rebound-server-3.firebaseapp.com",
                databaseURL: "https://boxel-rebound-server-3.firebaseio.com",
                projectId: "boxel-rebound-server-3",
                storageBucket: "boxel-rebound-server-3.appspot.com",
                messagingSenderId: "88715880250"
            };
            firebase.initializeApp(config);
            this.db = firebase.database();
            //localStorage.removeItem("firebase:host:boxel-rebound.firebaseio.com");
        };
        this.getDevMessage = function(){
            var ref = this.db.ref('dev-message');
            ref.once("value").then(function(snapshot) {
                if (snapshot.val() !== null) this.devMessage = snapshot.val();
                document.getElementById('dev-message').innerHTML = this.devMessage;
                console.log(this.devMessage)
            }, function(err){
                this.devMessage = "Servers are experiencing higher levels of traffic.";
                document.getElementById('dev-message').innerHTML = this.devMessage;
                console.log(this.devMessage)
            });
        }
        this.saveLevelToFirebase = function(name, levelMap) {
            if (this.checkDailyLimit('upload')){
                this.clearFirebaseLocalStorage();
                window.Game.dialog.openDialogWindow("shareCode"); //prompt uploading window
                var ref = this.db.ref('levels/' + name);
                var compressedMap = LZString.compressToUTF16(levelMap);
                //console.log(compressedMap);
                ref.set({ levelMap: compressedMap },
                    function(error){
                        if (error) { //error uploading
                            window.Game.dialog.openDialogWindow("uploadError");
                        }
                        else { //successful upload
                            window.Game.dialog.createInputDialog(); //prevent null values
                            window.Game.dialog.input.value = "#"+name;
                            window.Game.dialog.openDialogWindow("uploadSuccess");
                            ga('send', 'event', 'game', 'uploaded');
                        }
                    }
                );
            }
            else window.Game.dialog.openDialogWindow("errorLimit"); //upload error
        };
        this.loadLevelFromFirebase = function(name){
            if (this.checkDailyLimit('download')){
                this.clearFirebaseLocalStorage();
                window.Game.dialog.openDialogWindow("downloading"); //prompt downloading window
                var ref = this.db.ref('levels/' + name);
                var levelMap = "";
                ref.once("value").then(function(snapshot) {
                    if (snapshot.val() !== null && name.length > 0){
                        levelMap = LZString.decompressFromUTF16(snapshot.val().levelMap);
                        //console.log(levelMap);
                        window.storageManager.trimLevel(levelMap);
                        window.Game.levelMap.createMapFromString(window.storageManager.levelString);
                        window.Game.levelMap.renderMap(); //render 2d array and cache it
                        window.Game.setView(2,3); //fake previous view to level editor
                        window.Game.levelEditor.updateUI(1);
                        window.Game.player.respawn();
                        window.Game.interface.build();
                        window.Game.pauseGame();
                        window.Game.dialog.openDialogWindow("downloadSuccess"); //download success
                        ga('send', 'event', 'game', 'downloaded');
                        //ref.remove(); //delete after it has been shared
                    }
                    else window.Game.dialog.openDialogWindow("error404"); //download error 404
                }, function(err){
                    window.Game.dialog.openDialogWindow("error500"); //download error 500
                });
            }
            else window.Game.dialog.openDialogWindow("errorLimit"); //download error
        };
        
        this.saveLevelToFile = function(){
            window.Game.levelEditor.saveCurrentLevel();
            var blob = new Blob([this.expandLevel()], { type: "text/plain;charset=utf-8;" });
            saveAs(blob, (Math.floor(Math.random()*16777215).toString(16)).toUpperCase() + ".txt");
            ga('send', 'event', 'game', 'uploaded - file');
        }
        this.loadLevelFromFile = function(){
            var input = document.createElement("input");
            input.setAttribute('type', 'file');
            input.setAttribute('id', 'theFile');
            input.addEventListener('change', handleFileSelect, false);
            function performClick() {
                var evt = document.createEvent("MouseEvents");
                evt.initEvent("click", true, false);
                input.dispatchEvent(evt);
            }
            function handleFileSelect(evt) {
                var files = evt.target.files;
                f = files[0];
                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {
                        levelMap = e.target.result;
                        //console.log(levelMap);
                        window.storageManager.trimLevel(levelMap);
                        window.Game.levelMap.createMapFromString(window.storageManager.levelString);
                        window.Game.levelMap.renderMap(); //render 2d array and cache it
                        window.Game.setView(2,3); //fake previous view to level editor
                        window.Game.levelEditor.updateUI(1);
                        window.Game.player.respawn();
                        window.Game.interface.build();
                        window.Game.pauseGame();
                        window.Game.dialog.openDialogWindow("downloadSuccess"); //download success
                        ga('send', 'event', 'game', 'downloaded - file');
                        //ref.remove(); //delete after it has been shared
                    };
                })(f);
                reader.readAsText(f);
            }
            performClick();
        }
        this.createMapCanvas = function(levelMap){
            var canvas = document.createElement("CANVAS");
            var ctx = canvas.getContext("2d");
            canvas.width = levelMap.getCols();
            canvas.height = levelMap.getRows();
            ctx.fillStyle = "#ffffff"; //draw background
            ctx.fillRect(0,0,canvas.width,canvas.height);

            //draw each tile
            var t = 0; //tile type (255 options possible)
            for (var row=0; row < levelMap.map.length; row++){
                for (var col=0; col < levelMap.map[row].length; col++){
                    t = parseInt(('0'+levelMap.map[row][col].type).slice(-2));
                    if (t > 0){
                        ctx.fillStyle = window.lb.rgbToHex("rgb("+t+", "+t+", "+t+");");
                        ctx.fillRect(col,row,1,1);
                    }
                }
            }
            return canvas;
        };
        this.exportMapToPNG = function(levelMap, fileName){
            var canvas = this.createMapCanvas(levelMap);

            fileName = fileName != null ? fileName : "boxel-level";
            var MIME_TYPE = "image/png"; //set type
            var imgURL = canvas.toDataURL(MIME_TYPE);

            var dlLink = document.createElement('a'); //temporary link
            dlLink.download = fileName; //temporary name
            dlLink.href = imgURL;
            dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

            document.body.appendChild(dlLink);
            dlLink.click();
            document.body.removeChild(dlLink);
        };
        this.clearFirebaseLocalStorage = function(){
            var i = localStorage.length;
            while(i--) {
                var key = localStorage.key(i);
                if(window.lb.occurrences(key,"firebase") > 0) {
                    localStorage.removeItem(key);
                }
            }
        };
        this.saveLevelScore = function(index, score){
            localStorage.setItem("level_" + index + "_score", score);
            return index;
        };
        this.getLevelScore = function(level){ 
            var key = localStorage.getItem("level_"+level+"_score");
            return key !== null ? key : "00:00"; 
        };
        this.storeVolume = function(volume){
            localStorage.setItem("volume", volume);
        };
        this.getVolume = function(){
            var volume = localStorage.getItem("volume");
            if (volume == null) localStorage.setItem("volume", 0); //set 0% volume if empty
            return volume;
        };
        this.toggleVolume = function(){
            var volume = localStorage.getItem("volume");
            localStorage.setItem("volume", volume != 0 ? 0 : 1);
            window.Game.syncLocalVolume();
        };
        this.getFullscreenValue = function(){
            var fullscreen = localStorage.getItem("fullscreen");
            if (fullscreen == null) localStorage.setItem("fullscreen", 0); //default 0 if empty
            return fullscreen;
        }
        this.toggleFullscreenValue = function(){
            var fullscreen = localStorage.getItem("fullscreen");
            localStorage.setItem("fullscreen", fullscreen != 0 ? 0 : 1);
        };
        this.getTotalScoreString = function(raw){
            var score = 0;
            var localScore = "";
            var i = 1;
            while (localScore != "00:00"){
                localScore = window.storageManager.getLevelScore(i);
                score += parseInt(localScore.replace(':',''));
                i++;
            }
            score += "";
            if (raw) score = score.splice(score.length - 2, 0, "."); //splice prototype from LunchBox.js;
            else score = Number(score).toLocaleString();
            return score
        };

        this.checkDailyLimit = function(limitType){
            var date = Date.now();
            var max_daily_uploads = 3;
            var max_daily_downloads = 3;
            var limit = false;
            var key = (limitType == 'upload') ? 'daily_uploads' : 'daily_downloads';

            //reset dates if purchased, null or a new 24 hours, reset start_date, daily_uploads, and daily downloads
            if (this.hasLicense() || 
                localStorage.getItem('start_date') == null || 
                localStorage.getItem('daily_uploads') == null ||
                localStorage.getItem('daily_downloads') == null ||
                date >= parseInt(localStorage.getItem('start_date')) + (1000 * 60 * 60 * 24)) {
                    localStorage.setItem('start_date', date);
                    localStorage.setItem('daily_uploads', max_daily_uploads);
                    localStorage.setItem('daily_downloads', max_daily_downloads);
            }
            
            //check if limitType is exceeded
            localStorage.setItem(key, localStorage.getItem(key) - 1);
            if (localStorage.getItem(key) >= 0) limit = true;
            return limit;
        };

        this.setLicense = function(license){
            localStorage.setItem('license', license);
        };

        this.hasLicense = function(){
            return localStorage.getItem('license') == 'boxel_rebound_pro';
        };

        this.setSkin = function(skin){
            localStorage.setItem('skin', skin);
        };

        this.getSkin = function(){
            var skin = localStorage.getItem('skin');
            if (skin == null) { skin = 0; this.setSkin(skin); }
            return parseInt(skin);
        };

        this.uploadLocalStorageToChromeStorage = function(clear){
            if (this.hasLicense()) {
                if (clear == true) chrome.storage.sync.clear(); //initially clear online storage
                for (var i=0; i < localStorage.length; i++){
                    var key = localStorage.key(i);
                    var value = localStorage.getItem(key);
                    var obj = {};
                    obj[key] = value;
                    chrome.storage.sync.set(obj);
                }
            }
        };

        this.downloadChromeStorageToLocalStorage = function(clear){
            if (this.hasLicense()) {
                chrome.storage.sync.get(null, function(items) {
                    if (clear == true) window.storageManager.clearLocalStorage();
                    var keys = Object.keys(items);
                    for (var i=0; i < keys.length; i++){
                        var key = keys[i];
                        var value = items[key];
                        localStorage.setItem(key, value);
                    }
                });
            }
        };

        this.checkChromeStorage = function(){
            if (this.hasLicense()) { //only for licensed users
                chrome.storage.sync.get(null, function(items) {
                    var length = Object.keys(items).length;
                    if (length > 0) { //if chrome storage exists
                        window.storageManager.downloadChromeStorageToLocalStorage();
                    }
                    else { //if chrome storage does not exist
                        window.storageManager.uploadLocalStorageToChromeStorage();
                    }
                });
            }
        };

        //initiate variables
        this.init();
	}
}(window));