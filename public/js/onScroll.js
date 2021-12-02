var currentPageNumber = 1;

var timer;

const throtllingScroll = (time) => {
  
   let loader = document.getElementById('loader');
   loader.classList.add('loader');

   if(timer){
       return
   }
   timer = setTimeout(
      () => {
        loader.classList.remove('loader');
        console.log('pageNumberCurrent',currentPageNumber)
        currentPageNumber++;
        onChangeValue({'pageNumber': currentPageNumber});
        timer = undefined;
      },
       time
   )

}

window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    console.log('maxPage Access',window.maxPageNumber);
    
   // console.log('scrolltop',scrollTop,'clientHeight',clientHeight,'scrollHeight',scrollHeight)

    if (scrollTop + clientHeight >= scrollHeight - 200 && currentPageNumber<window.maxPageNumber) {

        // loadQuotes(currentPage, limit);
        throtllingScroll(500) ;
    }
}, {
    passive: true
});