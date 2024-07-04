import './App.css';
import "mafs/core.css";
import { Mafs, Coordinates, MovablePoint, Plot, Theme, useMovablePoint } from "mafs"
import { useEffect, useState } from 'react';
import getU, {getMejorAjuste} from './GetU';
import { ColorPointt, DispPuntos, PolinomioComponent,Muestrass } from './Ccomponents';
import { CodeBlock, dracula, rainbow, shadesOfPurple, solarizedDark, tomorrow, tomorrowNightBlue } from 'react-code-blocks';
import { codigoOriginal, codigoPrincipal } from './Codigo';


const themeee = shadesOfPurple

themeee.backgroundColor = '#264653'



function openFullscreen() {
  if (document.body.requestFullscreen) {
    document.body.requestFullscreen();
  } else if (document.body.webkitRequestFullscreen) { /* Safari */
  document.body.webkitRequestFullscreen();
  } else if (document.body.msRequestFullscreen) { /* IE11 */
  document.body.msRequestFullscreen();
  }
}





function App() {
  const ejemploLibro = [{ x: 1, y: 4 }, { x: -2, y: 5 }, { x: 3, y: -1 }, { x: 4, y: 1 }]
  const ejemploTiroHorizontal = [{x:0,y:-0.01},{x:0.033,y:-0.018},{x:0.067,y:-0.035},{x:0.1,y:-0.068},{x:0.133,y:-0.109},{x:0.167,y:-0.156},{x:0.2,y:-0.217},{x:0.233,y:-0.282},{x:0.267,y:-0.358},{x:0.3,y:-0.433},{x:0.333,y:-0.527},{x:0.367,y:-0.626},{x:0.4,y:-0.734}];
  const [pointss, setPointt] = useState([])
  const [autoAJ, setAutoAJ] = useState(true)
  const [degg, setDegg] = useState(1)
  const [polinomio, setPolinomio] = useState([0, 1])





  async function fetchPuntos(stock){
    document.getElementById("loadd").style.display = 'flex';

    if(!window.localStorage.getItem("apiLimit")){
      window.localStorage.setItem("apiLimit",0)
    }

    if(window.localStorage.getItem("apiLimit") != '5'){
      window.localStorage.setItem("apiLimit", parseInt(window.localStorage.getItem("apiLimit")) + 1)
    }

    var x = {}

    if(!window.localStorage.getItem(stock) || window.localStorage.getItem('apiLimit') == '5'){
      window.localStorage.setItem("apiLimit",0)
    x = await fetch('https://api.stockdata.org/v1/data/eod?symbols='+stock+'&api_token=JCQNtDtdfzYlsiCSfMfui4gMRdR1YlBQTG3Q1QHn')
    x = await x.json()
    window.localStorage.setItem(stock, JSON.stringify(x))}else{
       x = JSON.parse(window.localStorage.getItem(stock))
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    console.log('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+stock+'&apikey=VA13FSHPPEKQSO4S')
    console.log(x)
    document.getElementById("loadd").style.display = 'none';document.getElementById("modd").style.display = 'none';document.getElementById("moddbg").style.display = 'none'
    let datosNuevos = []
    let indice = -1*x.data.length
    let center = x.data[0]['low']
    let datosOrdenados = x.data
    datosOrdenados.reverse()
    document.getElementById('titlee').innerText = "Acciones de " + stock + " (Ultimos " + datosOrdenados.length + " dias)"
    for(let el of datosOrdenados){
      datosNuevos.push({x:indice, y:Math.floor((el.close-center)*100)/100})
      setPointt(datosNuevos.concat([]))
      indice+=1
    await new Promise(resolve => setTimeout(resolve, 100));
    }
    uRemove(datosNuevos)

  }




  const RLE = [{
    n:'Ejemplo Tiro Horizontal',
    clck: async ()=>{uRemove(ejemploTiroHorizontal);
      document.getElementById('titlee').innerText = "Ejemplo Tiro Horizontal"
      document.getElementById("loadd").style.display = 'flex';
      await new Promise(resolve => setTimeout(resolve, (Math.random()*3000)+2000));
    document.getElementById("loadd").style.display = 'none';
      document.getElementById("modd").style.display = 'none';document.getElementById("moddbg").style.display = 'none'
    let ej = []
      for(let i of ejemploTiroHorizontal){
        ej.push(i);
        setPointt(ej.concat([]));
        console.log(pointss)
        await new Promise(resolve => setTimeout(resolve, 100));
      };
      uRemove(ej)
      uUpdateDeg(2)
      await new Promise(resolve => setTimeout(resolve, 100));
      setDegg(2)
      uUpdateDeg(2)
      setPolinomio(getU(ej, 2))
    }
    },{
    n:'Ejemplo aplicaciones',
    clck: async ()=>{uRemove(ejemploLibro);
      document.getElementById('titlee').innerText = "Ejemplo del libro"
      document.getElementById("loadd").style.display = 'flex';
      await new Promise(resolve => setTimeout(resolve, (Math.random()*3000)+2000));
    document.getElementById("loadd").style.display = 'none';
      document.getElementById("modd").style.display = 'none';document.getElementById("moddbg").style.display = 'none'
    let ej = []
      for(let i of ejemploLibro){
        ej.push(i);
        setPointt(ej.concat([]));
        console.log(pointss)
        await new Promise(resolve => setTimeout(resolve, 777));
      };
      uRemove(ej)
    }
    },{
    n:'Acciones de Tesla (Ultimos ~150 dias)',
    clck: ()=>fetchPuntos('TSLA')
  },
  {
    n:'Acciones de Nike (Ultimos ~150 dias)',
    clck: ()=>fetchPuntos('NKE')
  },
  {
    n:'Acciones de Nvidia (Ultimos ~150 dias)',
    clck: ()=>fetchPuntos('NVDA')
  }, 
  {
    n:'Acciones de Apple (Ultimos ~150 dias)',
    clck: ()=>fetchPuntos('AAPL')
  },
  {
    n:'Acciones de Rivian (Ultimos ~150 dias)',
    clck: ()=>fetchPuntos('RIVN')
  }, 
  {
    n:'Acciones de Wells Fargo (Ultimos ~150 dias)',
    clck: ()=>fetchPuntos('WFC')
  },
  {
    n: 'Acciones de Amazon (Últimos ~150 días)',
    clck: () => fetchPuntos('AMZN')
  },
  {
    n: 'Acciones de Microsoft (Últimos ~150 días)',
    clck: () => fetchPuntos('MSFT')
  },
  {
    n: 'Acciones de Google (Últimos ~150 días)',
    clck: () => fetchPuntos('GOOGL')
  },
  {
    n: 'Acciones de Meta (Últimos ~150 días)',
    clck: () => fetchPuntos('META')
  },
  {
    n: 'Acciones de JPMorgan Chase (Últimos ~150 días)',
    clck: () => fetchPuntos('JPM')
  },
  {
    n: 'Acciones de Boeing (Últimos ~150 días)',
    clck: () => fetchPuntos('BA')
  }]



  const pointerr = useMovablePoint([
    0, 0
  ])



  function FdeX(x) {
    let res = 0
    for (let deg = 0; deg < polinomio.length; deg++) {
      res += polinomio[deg] * Math.pow(x, deg)
    }
    return res
  }


  async function u(concatedd) {
    if (pointss.length == 0) {
      console.log(concatedd)
      setPolinomio([(concatedd["x"] * -1) + concatedd["y"], 1])
      return
    }
    if (concatedd == null) {
      setPolinomio([1, 0])
      return
    }

    try {

    if(autoAJ){setDegg(getMejorAjuste(pointss.concat(concatedd)))}
    let ress = getU(pointss.concat(concatedd), autoAJ?getMejorAjuste(pointss.concat(concatedd)):degg)
      setPolinomio(ress)
    
    } catch {

    }
  }





  async function uRemove(pointss) {
    if (pointss.length == 1) {
      setPolinomio([(pointss[0]["x"] * -1) + pointss[0]["y"], 1])
      return
    }
    if (pointss.length == 0) {
      setPolinomio([0, 1])
      return
    }
    try {
      if(autoAJ){setDegg(getMejorAjuste(pointss))}
      let ress = getU(pointss, autoAJ?getMejorAjuste(pointss):degg)
      setPolinomio(ress)
    
    } catch { }
  }




  async function uUpdateDeg(deg) {
    if (pointss.length == 1) {
      setPolinomio([(pointss[0]["x"] * -1) + pointss[0]["y"], 1])
      return
    }
    try {
      let ress = getU(pointss, deg)
      setPolinomio(ress)
    } catch {

    }

  }







  useEffect(() => {
  

    setTimeout(() => {


      document.getElementById('readdy').innerText = 'Continuar'
      document.getElementById('scrr').addEventListener('click', ()=>{
        if(!window.localStorage.instructions){
          alert("Presiona dos veces la grafica para verla en pantalla completa")
          alert("Ingresa manualmente los puntos, mueve el punto amarillo, o utiliza nuestros datos en tiempo real")
          window.localStorage.instructions = true;
        }
        openFullscreen()
        document.getElementById("scrr").classList.add('animate-[ping_3s]')
        document.getElementById("scrr").classList.add('pointer-events-none')
        document.getElementById('scrr').removeEventListener('click', ()=>{})
  
        setTimeout(() => {
          document.getElementById("scrr").classList.remove('flex')
          document.getElementById("scrr").classList.add('hidden')
  
  
        }, 3000)
      })



}, 5000)
  








}, [])


  return (
    <div className="h-screen overflow-scroll select-none font-[Alegreya] selection:bg-white selection:text-[#469d89] flex md:justify-center md:py-0 md:pt-16 py-16 flex-col md:flex-row w-screen bg-[#469d89]">
     <div className='fixed flex-col text-white justify-start overflow-y-scroll pt-16 hidden w-screen h-screen fixed top-0 left-0 bg-stone-950/80 z-50' id="explicaciooon">
   <p onClick={()=>{document.getElementById("explicaciooon").style.display = 'none'}} className='fixed p-2 cursor-pointer top-[3%] right-[3%] font-["Space_mono"] font-thin text-3xl text-red-400 animate-[spin_0.7s_infinite] hover:animate-none'>X</p>
   <div className='h-auto w-full flex flex-col'>
   <p className='text-white text-6xl text-center self-center mb-12'>Minimos Cuadrados</p>

     <iframe className='md:w-1/2 h-96 self-center' src="https://es.wikipedia.org/wiki/M%C3%ADnimos_cuadrados" title="W3Schools Free Online Web Tutorials">
</iframe>
<p className='text-white text-6xl self-center mb-6 mt-12'>Diapositivas</p>
<iframe loading="lazy" className='md:w-1/2 self-center h-96 my-12'  src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGJ7gssL6w&#x2F;0llu31wp3Phx9JR5iyCkgw&#x2F;view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">  </iframe>
<p className='text-white text-6xl self-center mb-12 mt-12'>Codigo principal <br/><p className='text-3xl self-center text-center'>(con libreria precompilada)</p></p>
<div className='h-[45rem] select-text selection:bg-[#1d3557] selection:text-current py-12 font-["Space_mono"] overflow-y-scroll w-2/3 self-center'>
<CodeBlock
      text={codigoPrincipal()}
      language={"javascript"}
      theme={themeee}
    /></div>
<p className='text-white text-6xl self-center mb-12 mt-16'>Codigo original:</p>
<div className='h-[45rem] select-text selection:bg-[#1d3557] selection:text-current py-12 font-["Space_mono"] overflow-y-scroll w-2/3 self-center'>
<CodeBlock
      text={codigoOriginal()}
      language={"python"}
      theme={themeee}
    /></div>
<p className='text-white text-6xl self-center mb-12 mt-32'>Codigo completo:</p>
<a href='https://github.com/alekthehacker/MinimosCuadrados.js' target='_blank' className='px-6 bg-slate-700 h-16 text-orange-500 mb-32 md:text-2xl flex flex-col font-["Space_mono"] rounded-2xl justify-center text-center self-center'>https://github.com/alekthehacker/MinimosCuadrados.js</a>
<p className='text-4xl text-center mt-12'>Creditos:</p>
<a href='https://www.linkedin.com/in/hector-gonzalez-22a842288/' target='_blank' className='animate-bounce text-3xl my-12 font-bold text-emerald-500 underline text-center'>Hector Gonzalez <span><a href='https://github.com/alekthehacker' className='animate-[pulse_0.5s_infinite]' target='_blank'>(Alek)</a></span><br/></a>
<p className='text-2xl mb-16 text-center'>
Bryan Barreno - 23000944<br/>
Carla Sosa - 23001554<br/>
Javier Navarro - 23000376<br/>
Jorge Rosales - 23000367<br/>
Jonthan Serrano - 23000471<br/>
Rodrigo Ponce - 23000642<br/>
</p></div>
     </div>
     <img onClick={()=>{document.getElementById("explicaciooon").style.display = 'flex'}} className='fixed h-[7%] z-30 object-cover bottom-[1%] left-[1%] animate-bounce opacity-10 hover:opacity-100 ' src='https://upload.wikimedia.org/wikipedia/commons/1/18/Coat_of_arms_of_Southern_Rhodesia_%281924%E2%80%931980%29.svg'/>
      <div id="moddbg" onClick={(e)=>{document.getElementById("modd").style.display = 'none';e.currentTarget.style.display = 'none'}} className='fixed hidden z-30 w-screen h-screen bg-stone-950/40 top-0 left-0'>
      </div>
      <div id="loadd" className='hidden h-screen top-0 flex-col justify-center w-screen fixed bg-[#264653]/95 z-40'>
      <div className='text-[#f4a261] self-center animate-[spin_1s_alternate-reverse_infinite] flex flex-row justify-center'>
      <svg className='self-center' xmlns="http://www.w3.org/2000/svg" width="96" height="96" fill="#f4a261" class="bi bi-cursor" viewBox="0 0 16 16">
  <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52z"/>
</svg>
</div>
      <p className='text-center font-["Space_mono"] text-5xl mt-12 animate-bounce text-[#2a9d8f]'>Obteniendo datos...</p>
      </div>
      <div id="modd" className='z-30 flex-col justify-center hidden h-1/2 w-5/6 md:w-1/3 m-0 fixed top-1/4 self-center bg-[#264653]  rounded-3xl'>
      <p className='h-1/4 self-center flex text-stone-50 flex-col justify-center text-5xl text-center'><p className='text-center'>Muestras de datos reales</p></p>
        <div className='h-3/4 overflow-scroll grid grid-cols-2 md:grid-cols-3'>
          {RLE.map(Muestrass)} 
        </div>
      </div> 

      <div id='scrr' className='z-30 left-0 fixed top-0 w-screen justify-center h-screen bg-gradient-to-br from-[#2a9d8f] via-stone-950 to-stone-950  flex flex-col'>
        <p className='text-white text-5xl md:text-7xl animate-[ping_1s_reverse] font-medium text-center self-center'>Aproximacion por <br />Minimos Cuadrados</p>
        <p className='text-fuchsia-500 selection:bg-fuchsia-500 selection:text-black text-3xl md:text-4xl font-["Montserrat"] mt-16 animate-[ping_3s_reverse] font-light self-center'><span className='animate-[pulse_1s_infinite]'>Desarrollado por Alek!</span></p>
        <p id="readdy" className='text-emerald-500 selection:bg-fuchsia-500 selection:text-black text-3xl md:text-4xl font-["Montserrat"] mt-12 font-light self-center'><span className='animate-[pulse_0.5s_infinite]'><br/></span></p>

      </div>
      <div id='polinomioo' className='fixed self-center hidden md:flex bottom-[5%] max-w-[50%] hover:grid hover:grid-cols-5 hover:max-w-[90%] overflow-x-scroll z-20 flex flex-row px-8 bg-indigo-500 p-4 rounded-3xl'>

        { 
              polinomio.map((co, deg) => {
                return <PolinomioComponent co={Math.floor(co * 10000) / 10000} deg={deg} />
              })
            }

          </div>
      <div className='md:h-11/12 md:mr-7 md:overflow-x-scroll h-5/6 md:mb-0 mb-[-5rem] md:justify-center self-center flex flex-col w-5/6 md:w-1/2'>

        <p id='titlee' contentEditable   className='text-white  md:flex z-5 md:fixed self-center top-[12%] text-5xl text-center'>Minimos Cuadrados</p>

        <div
        onDoubleClick={(e)=>{

          if(e.currentTarget.style.position == ''){
            e.currentTarget.style.height = '90%'
            e.currentTarget.style.width = '90%'
          }else{
            e.currentTarget.style.height = '75%'
            e.currentTarget.style.width = '100%'
          }

          e.currentTarget.style.position =  e.currentTarget.style.position == ''?'fixed':''
        }}
        className='shadow-2xl left-[5%] top-[5%] z-0 shadow-fuchsia-500/5 rounded-2xl h-3/4 md:h-3/4 flex flex-col overflow-hidden w-full self-center'>
          <Mafs height={window.innerHeight} zoom={{ min: 0.01, max: 25 }}>
            <Plot.OfX color={Theme.pink} y={FdeX} />
            <Coordinates.Cartesian yAxis={
              {
                labels: (n) => (Math.abs(n)<100? n : (n%10==0?n:"")),
              }
            } 
            
            xAxis={
              {
                labels: (n) => (Math.abs(n)<100? n : (n%10==0?n:"")),
              }}
            
            />
            <MovablePoint point={[pointerr.x, pointerr.y]} onMove={(v) => {
              pointerr.setPoint(v)//[Math.floor(v[0]*10)/10, Math.floor(v[1]*10)/10]
              document.getElementById("inpp").innerText = (Math.floor(v[0] * 100) / 100).toString() + "," + (Math.floor(v[1] * 100) / 100).toString()
            }}
              color={Theme.yellow}
            />
            {pointss.map(ColorPointt)}
          </Mafs>
        </div>
        <div className='md:hidden flex md:mt-4 md:pb-4 flex-col w-auto overflow-x-scroll h-36 md:h-20 md:justify-center '>
          <p className='text-[#16425b] md:h-auto md:mt-12 h-1/4 text-center md:w-auto w-5/6 flex md:justify-center self-start flex-row mt-4 md:mt-12 text-3xl md:text-4xl'>{'F(x)'}:
            {
              polinomio.map((co, deg) => {
                return <PolinomioComponent co={Math.floor(co * 1000) / 1000} deg={deg} />
              })
            }

          </p></div>
          </div>
      <div className='md:h-11/12 md:ml-7 h-5/6 justify-center self-center flex flex-col-reverse md:flex-col w-5/6 md:w-1/3'>
        <div className='w-full shadow-2xl pt-12 shadow-[#264653]/15 flex flex-col h-3/4 bg-[#264653] rounded-2xl self-center'>
          <p className='text-center text-[#e9c46a] font-thin text-5xl'>Puntos</p>
          <p className='text-center text-stone-100/90 font-thin font-["Space_Mono"] text-3xl md:text-4xl my-8 select-none'>(<span className='outline-none' id="inpp" onInput={
            (event) => {
              var target = event.target;
              var text = target.innerText;
              var filteredText = text.replace(/[^0-9.,-]/g, ''); // Only allow digits, commas, and points

              if (filteredText !== text) {
                target.innerText = filteredText;
              }
            }
          } onKeyDown={(event) => {
            var allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
            if (!allowedKeys.includes(event.key) && !/[0-9.,-]/.test(event.key)) {
              event.preventDefault();
            }
            if (event.key == "Enter") {
              try {
                setPointt(pointss.concat([
                  {
                    x: parseFloat(document.getElementById("inpp").innerText.split(",")[0]),
                    y: parseFloat(document.getElementById("inpp").innerText.split(",")[1])
                  }
                ]))
                u({
                  x: parseFloat(document.getElementById("inpp").innerText.split(",")[0]),
                  y: parseFloat(document.getElementById("inpp").innerText.split(",")[1])
                })
              } catch {
                return
              }
            }
          }}
            contentEditable>1,0</span>)<span className='outline-none cursor-pointer ml-2 md:ml-24'
              onClick={
                () => {
                  try {
                    setPointt(pointss.concat([
                      {
                        x: parseFloat(document.getElementById("inpp").innerText.split(",")[0]),
                        y: parseFloat(document.getElementById("inpp").innerText.split(",")[1])
                      }
                    ]))
                    u({
                      x: parseFloat(document.getElementById("inpp").innerText.split(",")[0]),
                      y: parseFloat(document.getElementById("inpp").innerText.split(",")[1])
                    })
                  } catch {
                    return
                  }
                }
              }>+</span></p>


<p className='text-center text-3xl mb-4 text-white justify-center space-x-12 flex flex-row'><p className='self-center text-center'>Ajuste automatico</p><input defaultChecked={true} onClick={(e)=>{if(e.currentTarget.checked){let mj = getMejorAjuste(pointss);setDegg(mj);uUpdateDeg(mj)};setAutoAJ(e.currentTarget.checked)}} type='checkbox' className='accent-[#e76f51] bg-red-500 h-6 w-6 self-center'/></p>
{autoAJ?<p className=' flex text-stone-50 text-3xl self-center text-center'>
            Grado: {degg}
          </p>:<div className='flex flex-row justify-center'>

<p className=' flex text-stone-50 text-5xl self-center text-center'>
            Grado: {degg}
          </p><p onClick={() => {
            setDegg(degg + 1)
            uUpdateDeg(degg + 1)
          }} className='ml-8 text-stone-50 text-5xl cursor-pointer mt-0'>+</p><p onClick={() => {
            if (degg == 1) {
              return
            }
            setDegg(degg - 1)
            uUpdateDeg(degg - 1)
          }} className='ml-4 text-stone-50 text-5xl cursor-pointer mt-0'>-</p>
</div>
}


          <div className='grid h-72  font-["Space_Mono"] md:h-3/4 overflow-scroll grid-cols-3'>
            {pointss.length > 0 ? [<div onClick={(e)=>{
              setPointt([]);setPolinomio([0,1]);document.getElementById('titlee').innerText ="Minimos Cuadrados"}} className='shadow-xl shadow-stone-700/15 hover:-translate-x-1 hover:shadow-none hover:translate-y-1 hover:bg-indigo-500 hover:text-white w-5/6 place-self-center my-5 rounded-lg self-center h-16 flex flex-col justify-center bg-[#e9c46a]'>
              <p className='self-center text-center'>Eliminar Puntos</p>
            </div>].concat(pointss.map((props) => {
              return <DispPuntos x={props.x} y={props.y} clickk={() => {
                setPointt(pointss.filter((el) => {
                  return (el.x != props.x || el.y != props.y)
                }))
                uRemove(pointss.filter((el) => {
                  return (el.x != props.x || el.y != props.y)
                }))
              }} />
            })) : (<div onClick={(e)=>{document.getElementById("modd").style.display = 'flex';document.getElementById("moddbg").style.display = 'flex'}} className='shadow-xl shadow-stone-700/15 hover:-translate-x-1 hover:shadow-none hover:translate-y-1 hover:bg-indigo-500 hover:text-white w-5/6 place-self-center my-5 rounded-lg self-center h-16 flex flex-col justify-center bg-[#e9c46a]'>
              <p className='self-center text-center'>Importar datos</p>
            </div>)

            }
          </div>
        </div>
        
        <p className=' flex text-[#16425b] text-3xl mr-6 self-center text-center'>
          </p>

      </div>
    </div>
  );
}

export default App;
