var maxPageNumber;

const onChangeValue = (args) => {

    const country =document.getElementById('country');
    const type =document.getElementById('type');
    const platform =document.getElementById('platform');
    const movieName = document.getElementById('movieName');

    if(args){
        if(args.default){ 
            // countrySelected = 'in';
            // platformSelected ='apple';
            country.selectedIndex =101;
            onCountryChange({'home':true});
        }
        }

    let countrySelected = country.value.toLowerCase();
    const typeSelected = type.value;
    let platformSelected = platform.value;
    const movieSearchingFor = movieName.value;
    
    

    const pageNumber=  args ? args.pageNumber : 1;

    currentPageNumber= pageNumber === 1 ? 1 : currentPageNumber;

    //http://localhost:3045/sampleSearch.json
    //https://streaming-availability.p.rapidapi.com/search/basic?country=${countrySelected}&
    //service=${platformSelected}&type=${typeSelected}&keyword=${movieSearchingFor}&genre=18&page=10&language=en

    //https://streaming-availability.p.rapidapi.com/search/basic?country=${countrySelected}&service=${platformSelected}&type=${typeSelected}&keyword=${movieSearchingFor}&page=${pageNumber}
    apiPromise({
                   url : `http://localhost:3045/data/sampleSearch.json`,
                   headers : {
                    'x-rapidapi-key': 'a7c3a798c3msh68c354421cdf531p1217fejsn6d92e3cd8308',
                    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
                   }
               })
    .then(data => {
        parseDataForCards(data)
    }).catch((err) => {
        console.log(err);
        alert('Selected country doesn\'t have any ott service available , Please select valid country');
    })

    console.log(country.value.toLowerCase(),type.value,platform.value,movieName.value)
}

const parseDataForCards = (data) =>{

    let cardContainer = document.getElementById('cardsContainer');
    const cardContainerInnerhtml = cardContainer.innerHTML;
    maxPageNumber = data.total_pages;
    console.log('maxPageNumber',maxPageNumber);

    let elements =data.results.reduce((acc,item)=>{

        const defaultImage = "https://image.tmdb.org/t/p/w300/pYziM5SEmptPW0LdNhWvjzR2zD1.jpg";
        const { title:movieName ,year,imdbRating,backdropURLs } = item;
        const imdbRatingTen =imdbRating > 10 ? imdbRating/10:imdbRating;
        const image = backdropURLs[300] ? backdropURLs[300] : defaultImage ;
        //console.log(movieName,year,imdbRatingTen,image);
       
        return acc+`<div class="card">
              <div class="card-img">
                <img src="${image}" alt="Image">
              </div>
              <div class="card-title-container">
                  <div class="card-title">Movie Name </div>
                  <div class="card-title-name">${movieName}</div>
              </div>
              <div class="card-genre-container">
                <div class="card-genre">Year</div>
                <div class="card-genre-name">${year}</div>
              </div>
              <div class="card-rating-container">
                <div class="card-rating">Imdb Rating</div>
                <div class="card-rating-number">${imdbRating}</div>
              </div>
            </div>`;
            

    },'');

    data.results.length < 1 ? elements = "<h1>No movie Available Based on your selection</h1>" : null;

    //console.log(elements);

    cardContainer.innerHTML = currentPageNumber === 1 ? elements :cardContainerInnerhtml+elements;
    // cardContainerInnerhtml+elements;

    // const { title:movieName ,year,imdbRating,backdropURLs } = data;
    // const image = backdropURLs[300];
    // console.log(data)
    
}

const s = () => {

}
const k = (data) => {
   s(key);
}
