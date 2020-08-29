const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv  = require('csv-parser');
const csvToJson = require('csvtojson');
const fetch = require('node-fetch');

const x =[];

const app = express();
app.use(cors());
app.use(express.json());

var server = app.listen(process.env.PORT || 3000,listen);

function listen() {
  var host = server.address().address;
  var port = server.address().port;
  // console.log('Example app listening at http://' + host + ':' + port);
}

// var path = require('path');
// console.log(path);
// app.use(express.static(path.join('public')));
// console.log(path.join('public'));
// app.use("/scripts", express.static(__dirname + '/scripts'));
// app.use(express.static('public'));

  
app.get('/', async (req, res) => {
	
	// console.log("inside /");
	const data = await loadCSV();
	const delhi = await split_data(data.delhi);
	const mumbai = await split_data(data.mumbai);
	const bengaluru=await split_data(data.bengaluru);

  var N_mum = 1.24e7;
  var I0_mum = 1/N_mum;
  var A0_mum = 1/N_mum;
  var S0_mum = 1-(A0_mum+I0_mum);

  var N_ben = 1.23e7;
  var I0_ben = 1/N_ben;
  var A0_ben = 1/N_ben;
  var S0_ben = 1-(A0_ben+I0_ben);

	const delhi_parameters = {Beta0:0.26,Beta1:0.14,Beta2:0.09,Gamma1:0.039,Gamma2:0.1,Delta:0.01,Gamma_D:0.004,phi:1.0,N:1.8e7,I0:parseFloat(1/(1.8e7)),A0:1/(1.8e7),S0:(1-(1/1.8e7+1/8e7)),R0:0.0};
  // console.log(delhi_parameters);
	const mumbai_parameters = {Beta0:0.3,Beta1:0.12,Beta2:0.09,Gamma1:0.029,Gamma2:0.07,Delta:0.0035,Gamma_D:0.003,phi:1.0,N:N_mum,I0:I0_mum,A0:A0_mum,S0:S0_mum,R0:0.0};

  const bengaluru_parameters = {Beta0:0.05,Beta1:0.18,Beta2:0.05,Gamma1:0.034,Gamma2:0.034,Delta:0.0006,Gamma_D:0.002,phi:1.0,N:N_ben,I0:I0_ben,A0:A0_ben,S0:S0_ben,R0:0.0};
  console.log(mumbai_parameters);


	delData = await numericalCalc(delhi_parameters);
	mumData = await numericalCalc(mumbai_parameters);
	benData = await numericalCalc(bengaluru_parameters);

    res.json({
    	'delData':delData,
    	'mumData':mumData,
    	'benData':benData,
    	'delhi':delhi,
    	'mumbai':mumbai,
    	'bengaluru':bengaluru,
    });
});

app.post('/delhi',async (req,res) => {
	delData = await numericalCalc(req.body);
	res.json({
		// message:'recieved data',
		'delData':delData,
	});
	
});	

app.post('/mumbai',async (req,res) => {
  console.log(req.body);
	mumData = await numericalCalc(req.body);
	res.json({
		'mumData':mumData,
	});
});	

app.post('/bengaluru',async (req,res) => {
	benData = await numericalCalc(req.body);
	res.json({
		'benData':benData,
	});
});	

async function loadCSV(){

	const delhi = [];
	const mumbai = [];
	const bengaluru =[];

	const csv = require('csvtojson');
	// const api_url = 'https://api.covid19india.org/csv/latest/districts.csv';

	const csvFilePath = 'districts.csv';
	const array = await csv().fromFile(csvFilePath);

	array.forEach((element) => {
		if(element.District == 'Delhi')
			delhi.push(element);
		if(element.District == 'Mumbai')
			mumbai.push(element);
		if(element.District == 'Bengaluru Urban')
			bengaluru.push(element);
	});

    return({'delhi':delhi,'mumbai':mumbai,'bengaluru':bengaluru});
}

async function split_data(data){

	const Idot=[];
	const Ddot=[];
	const Rdot=[];
	const Adot=[];

	const date = await parse_date(data);
	const Ic=[{x:date[0],y:parseInt(data[0].Confirmed)}];
	const Dc=[{x:date[0],y:parseInt(data[0].Deceased)}];
	const Rc=[{x:date[0],y:parseInt(data[0].Recovered)}];
	const Ac=[{x:date[0],y:Ic[0].y-Dc[0].y-Rc[0].y}];

	for(let i=1 ; i<data.length ; i++){
        const row = data[i];

        Ic.push({x:date[i],y:parseInt(row.Confirmed)});
        Dc.push({x:date[i],y:parseInt(row.Deceased)});
        Rc.push({x:date[i],y:parseInt(row.Recovered)});
        Ac.push({x:date[i],y:Ic[i].y-Dc[i].y-Rc[i].y});
        Idot.push({x:date[i],y:Ic[i].y-Ic[i-1].y});
        Ddot.push({x:date[i],y:Dc[i].y-Dc[i-1].y});
        Rdot.push({x:date[i],y:Rc[i].y-Rc[i-1].y});
        Adot.push({x:date[i],y:parseInt(Ic[i].y-Ic[i-1].y-(Rc[i].y-Rc[i-1].y)-(Dc[i].y-Dc[i-1].y))});
    }
    return({'Idot':Idot,'Ddot':Ddot,'Adot':Adot,'Ic':Ic,'Dc':Dc,'Ac':Ac,'Rc':Rc});    
}	

async function parse_date(date_string){

	const date=[];
	for(let i=0;i<date_string.length;i++){
		var p = date_string[i].Date.split("-");
    date.push(new Date(p[0],p[1]-1,p[2]));
	}
	return date;
}

async function numericalCalc(parameters){

    const t0 = 0, dt = 0.01, t = 400, t1 = 43, t2 = 117;
    const  N    = parseFloat(parameters.N)
    const  I0   = parseFloat(parameters.I0)                // 1 in a million infection
    const  A0   = parseFloat(parameters.A0)
    const  S0   = parseFloat(parameters.S0)
    const  R0   = parseFloat(parameters.R0);

    // console.log(parameters);

    const beta0 = parseFloat(parameters.Beta0);
    const beta1 = parseFloat(parameters.Beta1);
    const beta2 = parseFloat(parameters.Beta2);

    const gamma1  = parseFloat(parameters.Gamma1);
    const gamma2  = parseFloat(parameters.Gamma2);

    const delta  = parseFloat(parameters.Delta);

    const gamma_D= parseFloat(parameters.Gamma_D);

    const phi = parseFloat(parameters.phi);
    const delData = await eulerDelhi (t0, t1, t2, S0, A0, I0, R0, dt, t, beta0, beta1, beta2, gamma1, gamma2, gamma_D, delta, N, phi);
    return delData;
}

async function eulerDelhi(t0,t1,t2,S0,A0,I0,R0,dt,t,beta0,beta1,beta2,gamma1,gamma2,gamma_D,delta,N,phi)
{

    var S = S0;
    var I = I0;
    var A = A0;
    var R = R0;
    var D = 0 ;

    var Ic=I0;
    var AplusI_c = A0+I0;

    const NS=[], NA=[], NI=[],NR=[],IcN=[],DN=[],deltaAN=[],gamma_DIN=[],AplusI_cN=[],index=[],AplusIN=[];

  	for(let i= 0; i< (t/dt) ; i++)
  	{
          var time = i*dt;

         
          //PRE Lock -----------------------------------------

          if(time<=t1){

      	  S = S + dt*( -beta0*S*(A+I) ) ;
          A = A + dt*(  beta0*S*(A+I) - delta*A - gamma1*phi*A );
          I = I + dt*(   delta*A - gamma1*I );
          R = R + dt*(   gamma1*( phi*A + I));
          D = D + dt*( gamma_D*I);
          Ic= Ic+ dt*( delta*A)  ;
          AplusI_c = AplusI_c + dt*(beta0*S*(A+I)) ;


          }
         //-------------------------------------------------------

          if(time>t1 && time<=t2){

          S = S + dt*( -beta1*S*(A+I) ) ;
          A = A + dt*(  beta1*S*(A+I) - delta*A - gamma2*phi*A );
          I = I + dt*(   delta*A - gamma2*I );
          R = R + dt*(   gamma2*( phi*A + I));
          D = D + dt*( gamma_D*I);
          Ic= Ic+ dt*( delta*A)  ;
          AplusI_c = AplusI_c + dt*(beta1*S*(A+I)) ;

          }

          if(time>t2){

          S = S + dt*( -beta2*S*(A+I) ) ;
          A = A + dt*(  beta2*S*(A+I) - delta*A - gamma2*phi*A );
          I = I + dt*(   delta*A - gamma2*I );
          R = R + dt*(   gamma2*( phi*A + I));
          D = D + dt*( gamma_D*I);
          Ic= Ic+ dt*( delta*A)  ;
          AplusI_c = AplusI_c + dt*(beta2*S*(A+I)) ;

          }

          else{}

          if(i%100==0){

          	var date = new Date(2020,1,20);
          	date.setDate(date.getDate()+time);
          	// console.log(date);
          	
          	NS.push({x:date,y:N*S});
            NA.push({x:date,y:N*A});
            NI.push({x:date,y:N*I});
            NR.push({x:date,y:N*R});
            IcN.push({x:date,y:Ic*N});
            DN.push({x:date,y:D*N});
            deltaAN.push({x:date,y:delta*A*N});
            gamma_DIN.push({x:date,y:gamma_D*I*N});
            AplusI_cN.push({x:date,y:AplusI_c*N});
            // index.push(time);
            AplusIN.push({x:date,y:N*A+N*I});
          }

      }
      const delData = {'S':NS,'A':NA,'I':NI,'R':NR,'Ic':IcN,'D':DN,'deltaA':deltaAN,'gammaDI':gamma_DIN,'AplusI_c':AplusI_cN,'AplusI':AplusIN};
      // console.log(delData);
      return delData;
}