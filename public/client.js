// window.jsPDF = require('jspdf');	

	
	const ctx1 = document.getElementById('myChart1').getContext('2d');
	const ctx2 = document.getElementById('myChart2').getContext('2d');
	const ctx3 = document.getElementById('myChart3').getContext('2d');
	const ctx4 = document.getElementById('myChart4').getContext('2d');
	const ctx5 = document.getElementById('myChart5').getContext('2d');
	const ctx6 = document.getElementById('myChart6').getContext('2d');
	const ctx7 = document.getElementById('myChart7').getContext('2d');
	const ctx8 = document.getElementById('myChart8').getContext('2d');
	const ctx9 = document.getElementById('myChart9').getContext('2d');
	const ctx10 = document.getElementById('myChart10').getContext('2d');
	const ctx11 = document.getElementById('myChart11').getContext('2d');
	const ctx12 = document.getElementById('myChart12').getContext('2d');


const del_tab = document.getElementById("Delhi");
const mum_tab = document.getElementById("Mumbai");
const ben_tab = document.getElementById("Bengaluru");
const del_tab_ss = document.getElementById("Delhi_ss");
const mum_tab_ss = document.getElementById("Mumbai_ss");
const ben_tab_ss = document.getElementById("Bengaluru_ss");



// console.log(window.location.hostname);
const URL = window.location.hostname === ('127.0.0.1' || 'localhost') ? 'http://localhost:3000' : 'https://dstsupermodel.herokuapp.com';
const delhi=[];
const mumbai=[];
const bengaluru=[];
const delData=[];
const mumData=[];
const benData=[];
const date_db=[];


initialise();
			
	
// async function get_json(){

// 	url="https://api.covid19india.org/raw_data1.json";
// 	const data = await fetch(url);
// 	const json = await data.json();
// 	// let date = Date.parse(json.raw_data[0].dateannounced);
// 	const date = await Date.parse(json.raw_data[0].dateannounced);
// 	// const date = await new Date();
// 	// Date.setMonth(3);
// 	// Date.setYear(2020);

// 	// date_db.push(date);
// 	// console.log(json.raw_data[0].dateannounced);
// 	console.log(date.getMonth);
// }

async function initialise(){
const data = await fetch(URL+'/')
const json = await data.json();

// console.log("inside initialise");
// console.log(json);

delhi.push(json.delhi);
mumbai.push(json.mumbai);
bengaluru.push(json.bengaluru);
delData.push(json.delData);
mumData.push(json.mumData);
benData.push(json.benData);

await on_delhi();

// console.log(delhi[0]);
// console.log(delhi[0].Ic);
// console.log(json);
}

async function On_Plot(){

	// console.log("Inside OnPLot");
	var form;
	var x = (document.getElementsByClassName("small-screen"));
    if(window.getComputedStyle(x[0],null).display !== "none"){
	form = document.getElementById("form_ss");
	// console.log("form_ss is on");
	}
	else{
	form = document.getElementById("form");		
	}
	
	const formData = new FormData(form);
	const parameters = {'Beta0' : formData.get('Beta0'),
						'Beta1':formData.get('Beta1'),
						'Beta2':formData.get('Beta2'),
						'Gamma1':formData.get('Gamma1'),
						'Gamma2':formData.get('Gamma2'),
						'Delta':formData.get('Delta'),
						'Gamma_D':formData.get('Gamma_D'),
						'phi':formData.get('Phi'),
						'A0' : formData.get('A0'),
						'I0' : formData.get('I0'),
						'S0' : formData.get('S0'),
						'R0' : formData.get('R0'),
						'N' : formData.get('N'),
					};
	// console.log("parameters done");
	// console.log(parameters);	
	// console.log(del_tab_ss.checked);

	if(del_tab.checked == true || del_tab_ss.checked == true){
		// console.log("inside dell tab");
		// console.log("del_tab.checked",del_tab.checked);
		// console.log("del_tab.checked_ss",del_tab_ss.checked);


	const response = await fetch(URL+'/delhi',{
		method: 'POST',
		body: JSON.stringify(parameters),
		headers:{
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	delData.pop();
	delData.push(json.delData);
	on_delhi();
	}
	if(mum_tab.checked == true || mum_tab_ss.checked == true){
	const response = await fetch(URL+'/mumbai',{
		method: 'POST',
		body: JSON.stringify(parameters),
		headers:{
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	mumData.pop();
	mumData.push(json.mumData);
	on_mumbai();
	}
	if(ben_tab.checked == true || ben_tab_ss.checked == true){
	const response = await fetch(URL+'/bengaluru',{
		method: 'POST',
		body: JSON.stringify(parameters),
		headers:{
			'content-type': 'application/json'
		}
	});
	const json = await response.json();
	benData.pop();
	benData.push(json.benData);
	on_bengaluru(); 
	}			
}

async function parse_date(data){

	const deldata=[];	
	for(let i=0 ; i<date_string.length ; i++){
		let p = date_string[i].split("-");
		// console.log(p[2], p[1], p[0]);
		date.push(new Date(p[0],p[1]-1,p[2]));
	}
	return date;
} 

async function on_delhi(){


	var N = 1.8e7;
	var I0 = 1/N;
	var A0 = 1/N;
	var S0 = 1-(A0+I0);

	var x = (document.getElementsByClassName("small-screen"));
    if(window.getComputedStyle(x[0],null).display !== "none"){

    document.getElementById("Beta0_ss").defaultValue = "0.26";
    document.getElementById("Beta1_ss").defaultValue = "0.14";
    document.getElementById("Beta2_ss").defaultValue = "0.09";
    document.getElementById("Gamma1_ss").defaultValue = "0.039";
    document.getElementById("Gamma2_ss").defaultValue = "0.1";
    document.getElementById("Delta_ss").defaultValue = "0.01";
    document.getElementById("Gamma_D_ss").defaultValue = "0.004";
    document.getElementById("N_ss").defaultValue = N;
    document.getElementById("I0_ss").defaultValue = I0.toPrecision(5);
	document.getElementById("A0_ss").defaultValue = A0.toPrecision(5);
    document.getElementById("S0_ss").defaultValue = S0.toPrecision(5);
    document.getElementById("R0_ss").defaultValue = "0.0";
    document.getElementById("Phi_ss").defaultValue = "1.0";

    document.getElementById("Delhi_ss").checked = true;
    // document.getElementById("Delhi_chart").checked = true;


    // console.log(document.getElementById("Delhi_chart").checked);
    // console.log(document.getElementById("Delhi_ss").checked);
    // console.log(del_tab_ss.checked);

    await draw_delhi();

    }

    else{	

	document.getElementById("Beta0").defaultValue = "0.26";
    document.getElementById("Beta1").defaultValue = "0.14";
    document.getElementById("Beta2").defaultValue = "0.09";
    document.getElementById("Gamma1").defaultValue = "0.039";
    document.getElementById("Gamma2").defaultValue = "0.1";
    document.getElementById("Delta").defaultValue = "0.01";
    document.getElementById("Gamma_D").defaultValue = "0.004";
    document.getElementById("N").defaultValue = N;
    document.getElementById("I0").defaultValue = I0.toPrecision(5);
	document.getElementById("A0").defaultValue = A0.toPrecision(5);
    document.getElementById("S0").defaultValue = S0.toPrecision(5);
    document.getElementById("R0").defaultValue = "0.0";
    document.getElementById("Phi").defaultValue = "1.0";

    document.getElementById("Delhi").checked = true;
    await draw_delhi();

    }
   
}

async function on_bengaluru(){
    
    var N = 1.23e7;
	var I0 = 1/N;
	var A0 = 1/N;
	var S0 = 1-(A0+I0);

	var x = (document.getElementsByClassName("small-screen"));

	if(window.getComputedStyle(x[0],null).display !== "none"){

	document.getElementById("Beta0_ss").defaultValue = "0.05";
    document.getElementById("Beta1_ss").defaultValue = "0.18";
    document.getElementById("Beta2_ss").defaultValue = "0.05";
    document.getElementById("Gamma1_ss").defaultValue = "0.034";
    document.getElementById("Gamma2_ss").defaultValue = "0.034";
    document.getElementById("Delta_ss").defaultValue = "0.0006";
    document.getElementById("Gamma_D_ss").defaultValue = "0.002";
    document.getElementById("Phi_ss").defaultValue = "1.0";
    document.getElementById("N_ss").defaultValue = N;
    document.getElementById("I0_ss").defaultValue = I0.toPrecision(5);
	document.getElementById("A0_ss").defaultValue = A0.toPrecision(5);
    document.getElementById("S0_ss").defaultValue = S0.toPrecision(5);
    document.getElementById("R0_ss").defaultValue = "0.0";    
    
    // document.getElementById("Bengaluru_ss").checked = true;
    await draw_bengaluru();
    }
    else{

    document.getElementById("Beta0").defaultValue = "0.05";
    document.getElementById("Beta1").defaultValue = "0.18";
    document.getElementById("Beta2").defaultValue = "0.05";
    document.getElementById("Gamma1").defaultValue = "0.034";
    document.getElementById("Gamma2").defaultValue = "0.034";
    document.getElementById("Delta").defaultValue = "0.0006";
    document.getElementById("Gamma_D").defaultValue = "0.002";
    document.getElementById("Phi").defaultValue = "1.0";
    document.getElementById("N").defaultValue = N;
    document.getElementById("I0").defaultValue = I0.toPrecision(5);
	document.getElementById("A0").defaultValue = A0.toPrecision(5);
    document.getElementById("S0").defaultValue = S0.toPrecision(5);
    document.getElementById("R0").defaultValue = "0.0";    

    // console.log(document.getElementById("Phi").defaultValue);

    document.getElementById("Bengaluru").checked = true;
    await draw_bengaluru();

    }      

}

async function on_mumbai(){

	var N = 1.24e7;
	var I0 = 1/N;
	var A0 = 1/N;
	var S0 = 1-(A0+I0);

	var x = (document.getElementsByClassName("small-screen"));

	if(window.getComputedStyle(x[0],null).display !== "none"){
	document.getElementById("Beta0_ss").defaultValue = "0.3";
    document.getElementById("Beta1_ss").defaultValue = "0.12";
    document.getElementById("Beta2_ss").defaultValue = "0.09";
    document.getElementById("Gamma1_ss").defaultValue = "0.029";
    document.getElementById("Gamma2_ss").defaultValue = "0.07";
    document.getElementById("Delta_ss").defaultValue = "0.0035";
    document.getElementById("Gamma_D_ss").defaultValue = "0.003";
    document.getElementById("Phi_ss").defaultValue = "1.0";
    document.getElementById("N_ss").defaultValue = N;
    document.getElementById("I0_ss").defaultValue = I0.toPrecision(5);
	document.getElementById("A0_ss").defaultValue = A0.toPrecision(5);
    document.getElementById("S0_ss").defaultValue = S0.toPrecision(5);
    document.getElementById("R0_ss").defaultValue = "0.0";

    // document.getElementById("Mumbai_ss").checked = true;
    await draw_mumbai();
	}

	else{

	document.getElementById("Beta0").defaultValue = "0.3";
    document.getElementById("Beta1").defaultValue = "0.12";
    document.getElementById("Beta2").defaultValue = "0.09";
    document.getElementById("Gamma1").defaultValue = "0.029";
    document.getElementById("Gamma2").defaultValue = "0.07";
    document.getElementById("Delta").defaultValue = "0.0035";
    document.getElementById("Gamma_D").defaultValue = "0.003";
    document.getElementById("Phi").defaultValue = "1.0";
    document.getElementById("N").defaultValue = N;
    document.getElementById("I0").defaultValue = I0.toPrecision(5);
	document.getElementById("A0").defaultValue = A0.toPrecision(5);
    document.getElementById("S0").defaultValue = S0.toPrecision(5);
    document.getElementById("R0").defaultValue = "0.0";    

    document.getElementById("Mumbai").checked = true;
    await draw_mumbai();

    }

}


async function draw_delhi(){

await draw1([delhi[0].Ac,delData[0].I]);
await draw2([delhi[0].Idot,delData[0].deltaA]);
await draw3([delhi[0].Ic,delData[0].Ic]);
await draw4([delhi[0].Ddot,delData[0].gammaDI]);
await draw5([delhi[0].Dc,delData[0].D]);
await draw6([delData[0].D,delData[0].AplusI,delData[0].AplusI_c,delData[0].Ic]);
}

async function draw_mumbai(){

await draw1([mumbai[0].Ac,mumData[0].I]);
await draw2([mumbai[0].Idot,mumData[0].deltaA]);
await draw3([mumbai[0].Ic,mumData[0].Ic]);
await draw4([mumbai[0].Ddot,mumData[0].gammaDI]);
await draw5([mumbai[0].Dc,mumData[0].D]);
await draw6([mumData[0].D,mumData[0].AplusI,mumData[0].AplusI_c,mumData[0].Ic]);
}

async function draw_bengaluru(){

await draw1([bengaluru[0].Ac,benData[0].I]);
await draw2([bengaluru[0].Idot,benData[0].deltaA]);
await draw3([bengaluru[0].Ic,benData[0].Ic]);
await draw4([bengaluru[0].Ddot,benData[0].gammaDI]);
await draw5([bengaluru[0].Dc,benData[0].D]);
await draw6([benData[0].D,benData[0].AplusI,benData[0].AplusI_c,benData[0].Ic]);
}

document.getElementById("save1").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart1").toDataURL("image/jpg");
	 var a =  document.getElementById("save1");
	 a.href = url_base64jp;
});

document.getElementById("save2").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart2").toDataURL("image/jpg");
	 var a =  document.getElementById("save2");
	 a.href = url_base64jp;
});

document.getElementById("save3").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart3").toDataURL("image/jpg");
	 var a =  document.getElementById("save3");
	 a.href = url_base64jp;
});

document.getElementById("save4").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart4").toDataURL("image/jpg");
	 var a =  document.getElementById("save4");
	 a.href = url_base64jp;
});

document.getElementById("save5").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart5").toDataURL("image/jpg");
	 var a =  document.getElementById("save5");
	 a.href = url_base64jp;
});

document.getElementById("save6").addEventListener('click', function(){
	 var url_base64jp = document.getElementById("myChart6").toDataURL("image/jpg");
	 var a =  document.getElementById("save6");
	 a.href = url_base64jp;
});

function on_real_data(){

	let csvContent = "data:text/csv;charset=utf-8,";
	csvContent += 'Date'+','+'City'+','+'Active Infections'+','+'Daily Infections'+','+'Total Infections'+','+'Daily Deaths'+','+'Total Deaths'+'\n';
	for(let i=0 ; i<104 ; i++){
		// var date = delhi[0].Ic[i].x.getFullYear()+'-'+delhi[0].Ic[i].x.getMonth()+'-'+delhi[0].Ic[i].x.getDate();
		var date = new Date(delhi[0].Ic[i].x);
		var date_string = date.getFullYear()+'-'+parseInt(date.getMonth()+1)+'-'+date.getDate();
		var row = date_string+','+'Delhi'+','+delhi[0].Ac[i].y+','+delhi[0].Idot[i].y+','+delhi[0].Ic[i].y+','+delhi[0].Ddot[i].y+','+delhi[0].Dc[i].y+'\n';
		row += date_string+','+'Mumbai'+','+mumbai[0].Ac[i].y+','+mumbai[0].Idot[i].y+','+mumbai[0].Ic[i].y+','+mumbai[0].Ddot[i].y+','+mumbai[0].Dc[i].y+'\n';
		row += date_string+','+'Bengaluru'+','+bengaluru[0].Ac[i].y+','+bengaluru[0].Idot[i].y+','+bengaluru[0].Ic[i].y+','+bengaluru[0].Ddot[i].y+','+bengaluru[0].Dc[i].y+'\n';
		csvContent += row;
	}
	// console.log();
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "real_data.csv");
	document.body.appendChild(link);

	link.click();
}

function on_predictions(){

	let csvContent = "data:text/csv;charset=utf-8,";
	csvContent += 'Date'+','+'City'+','+'Active Infections'+','+'Daily Infections'+','+'Total Infections'+','+'Daily Deaths'+','+'Total Deaths'+','+'Asymptomatic Infections'+'\n';
	for(let i=0 ; i<400 ; i++){
		// var date = delhi[0].Ic[i].x.getFullYear()+'-'+delhi[0].Ic[i].x.getMonth()+'-'+delhi[0].Ic[i].x.getDate();
		var date = new Date(delData[0].Ic[i].x);
		var date_string = date.getFullYear()+'-'+parseInt(date.getMonth()+1)+'-'+date.getDate();
		var row = date_string+','+'Delhi'+','+delData[0].I[i].y+','+delData[0].deltaA[i].y+','+delData[0].Ic[i].y+','+delData[0].gammaDI[i].y+','+delData[0].D[i].y+','+delData[0].AplusI_c[i].y+'\n';
		row += date_string+','+'Mumbai'+','+mumData[0].I[i].y+','+mumData[0].deltaA[i].y+','+mumData[0].Ic[i].y+','+mumData[0].gammaDI[i].y+','+mumData[0].D[i].y+','+mumData[0].AplusI_c[i].y+'\n';
		row += date_string+','+'Bengaluru'+','+benData[0].I[i].y+','+benData[0].deltaA[i].y+','+benData[0].Ic[i].y+','+benData[0].gammaDI[i].y+','+benData[0].D[i].y+','+benData[0].AplusI_c[i].y+'\n';
		csvContent += row;
	}
	// console.log();
	var encodedUri = encodeURI(csvContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "prediction.csv");
	document.body.appendChild(link); // Required for FF

	link.click();
}
