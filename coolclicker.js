version = 0.6;

var coolData = {
	cools: 0,
	cps: 0,
	version: version
};

var resetData = {
	cools: 0,
	cps: 0,
	version: version
};

inter=0;

var workers = {
	//first = price, second = cps
	"clicker": [1500,1],
	"swagger": [3000,5],
	"Rudy": [2000, 3],
	"rapper": [15000,15],
	"sunglasses of eternal coolness": [5000000, 1000000]
};

loaded = false;
//Saving and Loading!

function checkForData(){
	if(typeof(Storage) !== "undefined") {
		console.log("You have storage!");
	} else {
		alert("Sorry, your browser doesn't support storage! Offline mode on:");
		loaded = true;
	}
	
	if(!localStorage["coolclicker"]){
		localStorage["coolclicker"] = JSON.stringify(coolData);
		loaded=true;
	}else{
		loadData();
	}
}

function loadData(){
	coolData = JSON.parse(localStorage["coolclicker"]);
	loaded=true;
}

checkForData();

function saveData(){
	localStorage["coolclicker"]=JSON.stringify(coolData);
}
//END Saving and Loading!

function getCools(){
	return coolData["cools"];
}

function addCools(num){
	coolData["cools"]=getCools()+num;
}

function subCools(num){
	coolData["cools"]=getCools()-num;
}

function getCPS(){
	return coolData["cps"];
}

function setCPS(num){
	coolData["cps"]=num;
}

function addCPS(num){
	setCPS(getCPS()+num);
}

function clickGlasses(touching){
	addCools(1);
	if (!touching) {
				clk = true;
	}
	if (touch && !touching) {
				event.preventDefault();
				addCools(1);
			} else if (!clk) {
				addCools(getCPS()/20);
			}
	updateCools();
}



function buy(str){
	if(getCools() >= workers[str][0]){
		subCools(workers[str][0]);
		addCPS(workers[str][1]);
		document.getElementById("recentbuy").innerHTML = "+1 " + str + ".";
		$("#recentbuy").fadeIn();
		setTimeout( $("#recentbuy").fadeOut(), 500 );
	}else{
		alert("You're not cool enough to buy that " + str + "!");
	}
}

function reset(){
	coolData = resetData;
	saveData();
	alert('Data reset!');
	var debug = $.UIkit.modal("#debug");
	debug.hide();
}

function updateCools(){
	document.getElementById("cools").innerHTML = Math.round( getCools() );
	console.log("updated cools");
}

function updateCPS(){
	document.getElementById("cps").innerHTML = getCPS();
	console.log("updated cps");
}

function enableDebug(){
	document.getElementById("debugbutton").disabled=false;
}

function migrate(ver){
	if(ver==1){
		alert("Upgraded from old version. Resetting data.");
		reset();
	}
	if(ver==0.4){
		alert("Update: Added a + (whatever you bought) in the shop when you buy things.");
		coolData.version=0.5;
		saveData();
	}
	if(ver==0.5){
		alert("Update: You can no longer simply \"use the debug menu\". Resetting data.");
		reset();
	}
}

function theInterval(){
	inter++;
	console.log("interval "+inter);
	if(loaded){
		if(inter>1){
			if(inter==2){
				document.getElementById("version1").innerHTML = version;
				document.getElementById("version2").innerHTML = version;
				if(coolData.version<version || coolData.version==1){
					migrate(coolData.version);
				}
				if(coolData.version==1){
						alert("Upgraded from old version. Data reset!");
						reset();
					}
				if(coolData.version==0.4){
					alert("Update: Added a + (whatever you bought) in the shop when you buy things.");
					coolData.version=0.5;
					saveData();
				}
			}
			addCools(getCPS()/20);
			updateCPS();
			updateCools();
		}
	}
}

function openShop(){
	var modal = $.UIkit.modal("#shop");
	modal.show();
}

setInterval(theInterval, 50);

setInterval(saveData, 5000);