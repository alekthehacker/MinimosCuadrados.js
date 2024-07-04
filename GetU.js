import { Matrix, inverse } from 'ml-matrix';






//Dado un polinomio, retorna el valor de f(x)

function FdeX(x,pol) {
    let res = 0
    for (let deg = 0; deg < pol.length; deg++) {
      res +=  pol[deg]  * Math.pow(x, deg)
    }
    return res
  }



//Evalua cual grado para el polinomio hace que el error cuadratico sea minimo

const getMejorAjuste = (el) =>{
    let limit = 50
    var reff = 0
    var err = 0
    console.log(el)


    for(let i = 1; i<=limit;i++){
        try{
        let poll = getU(el, i)
        let errAux = 0
        for(let puntoo of el){
            errAux+=Math.pow(puntoo["y"] - FdeX(puntoo['x'], poll), 2)
        }
        if(isNaN(errAux)){
            break
        }
        console.log('Error con ' + i.toString() + ":" + errAux.toString())

        if(i==1){
            err = errAux
            reff = 1
        }else if(errAux<err){
            reff = i
            err = errAux
        }



    }catch{

    }   

    }


    return reff;


}




//Resuelve el problema de minimos cuadrados


const getU = (el, deg)=>{


    //Inicializa 2 arreglos auxiliaresL
var arrA = []
var arrY = []



    //Dado el grado del polinomio, inicializa la matriz Acon su dimension correspondiente



for(let pointt of el){
    arrY.push([pointt.y])
    let aROww = [1]
    for(let i = 1; i<=deg; i++){
        aROww.push(Math.pow(pointt.x, i))
    }
    arrA.push(aROww)
}


    //Inicializa 2 objetos de Matrix() para utilizar la libreria


var A = new Matrix(arrA)
var y = new Matrix(arrY)


//console.log(A)


//console.log(y)



var paso1 = inverse(A.transpose().mmul(A))

//console.log(paso1)

var paso2 = paso1.mmul(A.transpose())

//console.log(paso2)

var paso3 = paso2.mmul(y)

//console.log(paso3)


//Arrreglo auxiliar para extraer los coeficientes del polinomio

var coef = []



for(let coeff of paso3){
    coef.push(coeff[2])
}

//console.log(coef)

return coef


}


export default getU

export {getMejorAjuste}

