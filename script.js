const search = document.getElementById('search');

const suggestionListWrapper = document.getElementById('search-list-wrapper');


const suggestionList = document.getElementById('search-list');

const showSuggestion = (shouldShow) => {
    suggestionListWrapper.style.display = shouldShow ? 'block' : 'none';
    // Removes every suggestion 
    if (!shouldShow)
        while (suggestionList.firstElementChild) { suggestionList.removeChild(suggestionList.firstElementChild) }
}



// let timerCancel;


const fetchData = async (q) => {

    const res = await fetch(`http://openlibrary.org/search.json?title=${q}`);
    const data = await res.json();
    const books = data.docs.map(_data => {
        return _data.title;
    }).slice(0, 10);

    return books;
}

const displayResult = async (q) => {
    if(q.length){
        const books = await fetchData(q);
        showSuggestion(false);
        const list = document.createElement('li');
        list.textContent = `${books.length ? books.length : 'No'} results found`;
        list.className = "result-text"
        suggestionList.appendChild(list);
    
        for (let book of books) {
            const list = document.createElement('li');
            list.innerText = book;
            suggestionList.appendChild(list);
        }
        showSuggestion(true);
    
    }

    else {
        showSuggestion(false);
    }
    
}

const debounce = (fn, delay) => {
    let timer
    return function () {
        const self = this
        const args = self.value
        clearTimeout(timer);
        timer = setTimeout(() => {
                fn.call(self,args);
        }, delay)
    }
}

search.addEventListener('keyup', debounce(displayResult,500))


// search.addEventListener('keyup', async (e) => {
//     // let timer;
//     // if (timerCancel) {
//     //     clearTimeout(timerCancel);
//     // }
//     const q = e.target.value

//     if (q.length) {
//         // timer = setTimeout(() => {
//         //     displayResult(q);
//         // }, 500);

//         const showResult = debounce(displayResult,500);
//         showResult(q)
//     }
//     else {
//         showSuggestion(false);
//     }

//     // timerCancel = timer

// });



showSuggestion(false);
