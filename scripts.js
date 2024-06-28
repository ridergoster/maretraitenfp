document.getElementById("pension").addEventListener("input", updateResults);

updateResults();

function updateResults() {
  const pension = parseFloat(document.getElementById("pension").value);
  
  if (!isNaN(pension)) {
    const pension = parseFloat(document.getElementById("pension").value);

    const csgRateGouv = getCSGRate1(pension);
    const csgRateNFP = getCSGRate2(pension);

    const csgGouv = Math.round(pension * csgRateGouv);
    const csgNFP = Math.round(pension * csgRateNFP);
    
    const difference = csgGouv - csgNFP;

    document.querySelector(".alert").style.color =
      difference < 0 ? "#EE2C17" : "#000";

    document.getElementById("win_lose").textContent =
      difference < 0 ? "perdue" : "économisé";

    console.log('dif', difference);

    document.getElementById("csgGouv").textContent = csgGouv.toFixed(0);
    document.getElementById("csgNFP").textContent = csgNFP.toFixed(0);
    document.getElementById("csgRateGouv").textContent = (csgRateGouv * 100).toFixed(2);
    document.getElementById("csgRateNFP").textContent = (csgRateNFP * 100).toFixed(2);
    document.getElementById("difference").textContent = difference.toFixed(0);
  } else {
    document.getElementById("csgGouv").textContent = "";
    document.getElementById("csgNFP").textContent = "";
    document.getElementById("difference").textContent = "";
  }
}

function getCSGRate1(pension) {
  pension = pension * 12;
  if (pension <= 12230) return 0;
  if (pension <= 15988) return 0.038;
  if (pension < 24813) return 0.066;
  return 0.083;
}

function getCSGRate2(pension) {
  pension = pension * 12;
  var impot = 0;
  //« 1° 0 % pour les revenus bruts annuels inférieurs à 4 907 € ;
  if (pension > 4907) {
    impot += 0;
      //« 2° 3,8 % pour les revenus bruts annuels compris entre 4 907 € et 13 324 € ;
      if (pension > 13324) {
        impot += ((13324 - 4907) * 0.038);
          //« 3° 5,5 % pour les revenus bruts annuels compris entre 13 324 € et 19 287 € ;
          if (pension > 19287) {
            impot += ((19287 - 13324) * 0.055);
              // « 4° 7,5 % pour les revenus bruts annuels compris entre 19 287 € et 29 817 € ;
              if (pension > 29817) {
                impot += ((29817 - 19287) * 0.075);
                // « 5° 9,2 % pour les revenus bruts annuels supérieurs à 29 817 € ;
                impot += (pension - 29817) * 0.092;
                // « 6° 11,2 % pour les revenus bruts annuels supérieurs à 59 817 € ; »
                if (pension > 59817) {
                    impot += (pension - 59817) * 0.112;
                }
                //« 7° 13,2 % pour les revenus bruts annuels supérieurs à 79 817 € ; »
                if (pension > 79817) {
                  impot += (pension - 79817) * 0.132;
                }
              }  else {
                impot += ((pension - 19287) * 0.075);
              }
          }  else {
            impot += ((pension - 13324) * 0.055);
          }
      }  else {
        impot += ((pension - 4907) * 0.038);
      }
  } 
  return impot/pension;
}

function mySubmitFunction(e) {
  e.preventDefault();
  return false;
}
