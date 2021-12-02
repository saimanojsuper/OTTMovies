var ottData;
onCountryChange = (args) => {
    // const ottData =  apiPromise({url : 'http://localhost:3045/data/countries.json'});
     ottData.then((data)=> {
        ottAvailable(data);
        if(args){
            if(args.home){
                return
            }
        }
        onChangeValue();
     });
}

defaultValue = () => {
    onChangeValue({'default':true});
}
loadInitialData = () => {
    onChangeValue();
}
const ottAvailable= (data) =>
{

  const country =document.getElementById('country');
  const ottplatform =document.getElementById('platform');
  let selectedCountry = country.value.toLowerCase();

  let ottsAvailable =Object.keys(data).reduce((acc,item)=> {
      
      const isPresent= data[item].filter((value)=>{
             return value===selectedCountry
      })
 
      if(isPresent.length > 0)
        return [...acc,item]
      else
        return [...acc]
  },[])

  let element =ottsAvailable.reduce((acc,item)=> {
      return  acc+`<option value=${item}>${item}</option>`;
  },'')

  element ? ottplatform.value='' : ottplatform.value=ottsAvailable[0];
  ottplatform.innerHTML =element;
};

apiPromise = async(args)=> {
    const response = await fetch(args.url,{
        // mode: 'no-cors',
        // headers : args.headers
    });
    const data = await response.json();
    return data;
};

function dropdown(data,id){
    const dataElement =document.getElementById(id);
    let element;
    if(!data.length){
        element= data ? Object.keys(data).reduce((acc,item)=> {
        return acc+`<option value=${item}>${data[item]}</option>`;
        },'') : console.log('empty');
    }else{
        element= data.map((item)=>{
            if(item.code !== 'IN'){
            return `<option value=${item.code}>${item.name}</option>`;
            }else{
                return `<option value=${item.code} selected>${item.name}</option>`;
            }
        })
    }
    dataElement.innerHTML=element;
}

window.onload = ()=>{

    const countryData = apiPromise({url : 'http://localhost:3045/data/country-codes-to-names.json'});
    ottData =  apiPromise({url : 'http://localhost:3045/data/countries.json'});

    countryData.then((data)=> {dropdown(data,'country')});

    Promise.all(
        [countryData,ottData]
    ).then(
        (data) => {
            console.log(data);
            ottAvailable(data[1]);
            loadInitialData();
        }
    )
};



// var data;

// function dropdown(data,id){
//     const genre =document.getElementById(id);
//     let element= data ? Object.keys(data).reduce((acc,item)=> {
//        return acc+`<option value=${item}>${data[item]}</option>`;
//     },'') : console.log('empty');
//     genre.innerHTML=element;
// }
// function loadData(url,data,id) {

// const apiPromise = async()=> {
//     const response = await fetch(url);
//     const genreData = await response.json();
//     data = genreData;
// }
//  apiPromise().then(()=>(dropdown(data,id)));

//     // fetch('http://localhost:3045/genre.json')
//     // .then(data => data.json())
//     // .then(data => console.log(data));

// }


// window.onload = loadData();