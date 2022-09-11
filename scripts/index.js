let movieSlideShow = [
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/691/1280691-h-713b5907ee42",
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/9947/1279947-h-d5d3ff34dad1",
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/4505/1274505-h-567f46379b37",
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/3190/1263190-h-0bfaeb08a06e",
    "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/24/1280024-h-aa8dc3cc21b6"
];


let image = document.getElementById("slideShowImg");

let count = 0;

slideShow();
function slideShow(){
    setInterval(function(){
        if(count == movieSlideShow.length){
            count = 0;
        }
        image.src = movieSlideShow[count];
        count++;
    } , 3000)
}



/* <i class="fa-solid fa-star"></i> */
let movieDataArray = fetch("https://omdbapi.com/?i=tt3896198&page=2&apikey=c81998f&s=movies;");
let sortingMethod;
movieDataArray.then(function(res){
    let data = res.json();
    data.then(function(result){
        sortingMethod = result.Search;
        showCards(result.Search)
    })
})


let movieDataArray1 = fetch("https://omdbapi.com/?i=tt3896198&page=4&apikey=c81998f&s=movies;");

movieDataArray1.then(function(res){
    let data = res.json();
    data.then(function(result){
        sortingMethod = result.Search;
        showCards1(result.Search)
    })
})





function showCards1(movieDataArray){
    movieDataArray.forEach(function(el){
        let div = document.createElement("div");

        let img = document.createElement("div");
        img.style.width = "90%";
        let image  = document.createElement("img");
        image.src = el.Poster;
        image.style.width = "100%"
        img.append(image);

        let name = document.createElement("h2");
        name.textContent = el.Title;

        let rating = document.createElement("span");
        rating.innerHTML = `<i class="fa-solid fa-star"></i> ${el.imdbID}`;

        let date = document.createElement("p");
        date.textContent = `Release:- ${el.Year}`;


        div.append(img , name , rating ,date);
        document.getElementById("movies").append(div);
    });
}


function showCards(movieDataArray){
    document.getElementById("movies").innerHTML = "";
    movieDataArray.forEach(function(el){
        let div = document.createElement("div");

        let img = document.createElement("div");
        img.style.width = "90%";
        let image  = document.createElement("img");
        image.src = el.Poster;
        image.style.width = "100%"
        img.append(image);

        let name = document.createElement("h2");
        name.textContent = el.Title;

        let rating = document.createElement("span");
        rating.innerHTML = `<i class="fa-solid fa-star"></i> ${el.imdbID}`;

        let date = document.createElement("p");
        date.textContent = `Release:- ${el.Year}`;


        div.append(img , name , rating ,date);
        document.getElementById("movies").append(div);
    });
}




document.getElementById("sort-lh").addEventListener("click" , sortBylh);

function sortBylh(){
    let arr  = sortingMethod.sort(function(a , b){
        return a.Year - b.Year;
    });
    showCards(arr);
}


document.getElementById("sort-hl").addEventListener("click" , sortByhl);

function sortByhl(){
    let arr  = sortingMethod.sort(function(a , b){
        return b.Year - a.Year;
    });
    showCards(arr);
}



document.getElementById("searchIcon").addEventListener("submit" , movies);
let localMovie = localStorage.getItem("localMovie");

function movies(){
    event.preventDefault();
    let searchValue = document.getElementById("searchBar").value;
    localStorage.setItem("localMovie" ,searchValue.toLowerCase() );
    window.location.href = "./movies.html";
}

function debounce(){    
    let querys = document.getElementById("searchBar").value;

    let queryResultUrl = fetch(`https://omdbapi.com/?i=tt3896198&page=4&apikey=c81998f&t=${querys}`);

    queryResultUrl.then(function(res){
        let data = res.json();
        data.then(function(result){
            console.log(result);
            appendSearchResult(result.Search);
        })
    })
}



function appendSearchResult(el){
    let container = document.getElementById("queryResult");
        container.innerHTML = "";
        if (!el) {
            return;
        }
        container.style.display = "block"
        // data.forEach(function(el){
            let image = document.createElement("div");
            let img = document.createElement("img");
            img.src = el.Poster;
            image.append(img);
            
            let name = document.createElement("h4");
            name.textContent = el.Title;

            let div = document.createElement("div");
            div.append(image , name);

            div.addEventListener("click",function(name){
                console.log(name);
                movies2(name)
            })
            container.append(div);
        // })

        function movies2(name){
            localStorage.setItem("localMovie" ,name);
            // window.location.href = "./movies.html";
        }
}