import {Point} from "mafs"



function ColorPointt(props) {
    let vibrantColors = ["#56ab91", "#56ab91"]
  
    return (<Point color={vibrantColors[Math.floor(Math.random() * vibrantColors.length)]} x={props.x} y={props.y} />)
  }
  
  
  function DispPuntos(props) {
    return (<div onClick={props.clickk} className='shadow-xl shadow-stone-700/15 hover:-translate-x-1 hover:shadow-none hover:translate-y-1 hover:bg-rose-500 hover:text-white animate-[ping_0.7s_alternate-reverse] w-5/6 place-self-center my-5 rounded-lg self-center h-14 flex flex-row justify-center bg-[#e9c46a]'>
      <p className='self-center'>{"(" + props.x.toString() + "," + props.y.toString() + ")"}</p>
    </div>)
  }
  
  
  
  function PolinomioComponent(props){
    if(props.deg == 0){
      return <p className='ml-4 text-stone-50 text-center text-3xl md:text-4xl'>{props.co}</p>
    }
    return <p className='ml-2 text-stone-50 text-3xl justify-center text-center md:text-4xl flex flex-row'><span className='mr-2'>{props.co<0?"-":"+"}</span>{Math.abs(props.co)}x<span className='text-xl md:text-2xl text-[#e9c46a] font-bold animate-bounce self-start'>{props.deg>1?props.deg:""}</span></p>
  }




  function Muestrass(props){
    return <div onClick={props.clck} className="w-11/12 shadow-xl shadow-stone-700/15 hover:-translate-x-1 hover:shadow-none hover:translate-y-1 text-stone-50 place-self-center rounded-2xl font-['Space_Mono'] flex flex-col justify-center bg-[#e76f51] h-32 my-3">
        <p className="text-center">{props.n}</p>  
    </div>
  }




  export{
    ColorPointt, DispPuntos, PolinomioComponent, Muestrass
  }