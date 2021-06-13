const form=document.getElementById('searchForm');
const search=document.getElementById('searchBar');
const main=document.getElementById('movieShowcase');
const error=document.getElementById('error');

const API_URL='https://yts.mx/api/v2/list_movies.json?page=2'
const search_url='https://yts.mx/api/v2/list_movies.json?query_term="'

get_movies(API_URL)

async function get_movies(url){
    const response=await fetch(url);
    const result=await response.json()
        show_movies(result.data); 
}

function show_movies(data){
    main.innerHTML='';
    data.movies.forEach((movie)=>{
        const{large_cover_image,description_full,title,rating,torrents}=movie;
            const movieEl=document.createElement('div');
            movieEl.classList.add('poster-1')
                movieEl.innerHTML=`
                <img src="${large_cover_image} " alt="${title}" srcset="" class="">
                <div id="posterInfo" class="block mt-2 bg-white scrollP">
                <div class="flex justify-between mt-4">
                    <div >
                        <h1 class="text-black text-2xl ml-4" id="movieInfo" >${title}</h1>
                    </div>
                    <div>
                    <span id="movieRating" class="bg-blue-400 rounded p-1 mr-8">${rating}</span>
                    </div>
                </div>
                <div class="flex items-center justify-center my-4">
                    <ul class="">
                    ${torrents.map(torrent =>`
                        <li class="mb-2 bg-red-200 px-3 py-1 text-center rounded-lg">Download :<a class="bg-green-500 px-3 py-0.5 mx-24 mt-1  rounded-lg flex flex-row justify-center items-center mb-2" href="${torrent.url}">${torrent.quality}</a></li>
                        <li class="mb-4">Type: ${torrent.type} | Size: ${torrent.size} | Seeds: ${torrent.seeds} | Peers: ${torrent.peers}</li>
                    <hr>
                    `).join("")                        
                    }
                    </ul>
                </div>
                <p class=" text-black   mt-2 mx-4 pb-4">${description_full}</p>
                </div>
                `
     main.appendChild(movieEl);
    })
}

form.addEventListener('submit',(e) =>{
    e.preventDefault();

    const searchValue=search.value;
    if(searchValue && searchValue!==''){
        get_movies(search_url+searchValue)

        search.value=''
    }
    else{
      window.location.reload();
    }
})

