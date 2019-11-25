
/*
Sensors		         Actuators
Clock		           Controlled fan
Humidity		       IR Grow
Moisture		       UV Grow
Co2	               5 pumps

Sequence #
*/


//Error param1..4 ikke defineret type af data + index i readData..


enum actuList {
  //% block="Heater"
  heater = "heater",
  //% block="fan"
  fan = "Fan"
}

enum pumpList {
  //% block="Air Circulation"
  airPump,
  //% block="Water circulation"
  waterPump,
  //% block="Airation"
  airationPump,
  //% block="External pump 1"
  fert1Pump,
  //% block="External pump 2"
  fert2Pump,
  //% block="External pump 1"
}

enum lightList {
    //% block="White light"
    whiteGrow,
    //% block="IR light"
    irGrow,
    //% block="UV light"
    uvGrow,
}


// groblocks graphics
//% weight=100 color=#0f9c11 icon="\f06c"
namespace groblocks {

function init(){
    basic.showString("OK")
    serial.redirect(
    SerialPin.P0,
    SerialPin.P1,
    BaudRate.BaudRate9600
    )

}

//ReceivedData:1|sequence|Humidity|Water_Level|CO2|Temp|Door|;


function readData(index: number): number {
  let readIn = serial.readString();
  let readOut = readIn.split("|");
  let readDisp = readOut[index];

  serial.writeString(readDisp);
  return parseInt(readDisp);
  }
//sasa
//Indexing for readData
//let seq = 1;
let hum = 2;
let water = 3;
//let co2 = 4;
let temp = 5;
let door = 6;
let clk = 7;

/*
function foo() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}
*/

function sendData(actuType: string, ...restArg: string[]){
  for (var i = 0; i < restArg.length; i++) {
    actuType += ", " + restArg[i];
  }
  return actuType
  serial.writeString(actuType);

}

//sasa


// #####################   SENSORS   #################################
//ReceivedData:1|sequence|Humidity|Water_Level|CO2|Temp|Door| clock


  /**
  * Luftfugtighedsmåler 0-100
  */
  //% block
  export function Luftfugtighedsmåler(): number {
    let x = readData(hum);
  return x ;
  }
  /**
  * Vandstandsmåler 0-100
  */
  //% block
  export function Vandstandsmåler(): number {
    let x = readData(water);
  return x ;
  }

  /**
  * CO2-Måler
  */
  //% block
  export function co2Sensor(): number {
    let coIn = serial.readString();
    let coOut = coIn.split('|');
    let coDisp = parseInt(coOut[4]);
    serial.writeString(coOut[4]);
  return coDisp;
  }

  /**
 * Temperatursensor
 */
 //% block
 export function tempSensor(): number {
   let x = readData(temp);
  return x ;
}

  /**
 * DoorSensor
 */
 //% block
  export function doorSensor(): number {
    let x = readData(door);
  return x;
}

  /**
  * Temperatursensor
  */
  //% block
  export function clockSensor(): number {
    let x = readData(clk);
  return x;
}

// ########################  Actuators  ############################

  /**
  * Mock-up Light block
  */
  //% blockId=mockUpLight block="%lightList, Brightness %brightness"
  export function groLys(lightType: lightList, lightBrigt: number){
    let lT = lightType.toString();
    let lB = lightBrigt.toString();
    let output = "Light" + lT + lB;

    serial.writeString(output);
  }



  /**
  * Mock-up actuator block
  */
  //% blockId=mockUpActuator block="Choose actuator %actuList| intensity %randNum"
  export function setActuator(mode:actuList, randNum: number){
    sendData(mode,randNum)
  }





  /**
  * Mock-up timer block
  /
  //% blockId=mockUpTimer block="fra klokken %fra| til klokken %til"
export function setClock(clockFra: number, clcokTil: number){

}






    /**
    * prints string on LEDS and on serial port
    * @param testString string
    */
    //% weight=99 blockGap=8
    //% blockId=testSerialPrint block="Test Serial print: %testString"
    export function testSerialPrint(testString: string) : void {
      basic.showString(testString);
      serial.writeString(testString);
    }


init();


}
