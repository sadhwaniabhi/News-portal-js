
const cards = document.querySelector(".cards");
const category = document.querySelector(".category");
const categorySpans  = document.querySelectorAll(".category span");
const baseUrl = "https://newsapi.org/v2";
const api = "&apiKey=e293bc4d57b5411da5cb4ab83ec315dd";

const backUpImage = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

async function getRequestedData(url){
    try{
        const response = await fetch(baseUrl + url + api);
        const finalData = await response.json();    
        return finalData;
    }catch(error){
        console.log(error);
    }
};


function urlRequest(url){
    getRequestedData(url).then(data => {
        data.articles.forEach(news => {
            const [date,time] = news.publishedAt.slice(0,-1).split("T");
            cards.innerHTML += `<div class="card">
                                    <div class="image">
                                        <img src="${ news.urlToImage ? news.urlToImage : backUpImage }" alt="Default Article Image">
                                    </div>
                                    <div class="information">
                                        <div>
                                            <p class="title">${news.title}</p>
                                            <p class="description">${news.description}</p>
                                            <p class="date">
                                                <span>${time}</span> 
                                                <span>${date}</span>
                                            </p>
                                        </div>
                                        <div class="other">
                                            <span class="source">${news.source.name}</span>
                                            <a class="url" href="${news.url}" target="_blank">
                                                Read Article
                                                <i class="bi bi-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>`; 
        });
    });
};

category.addEventListener("click", Event => {
    if(Event.target.tagName === "SPAN"){
        cards.innerHTML = "";
        urlRequest(Event.target.dataset.id);
        categorySpans.forEach(item => item.classList.remove("active"));
        Event.target.classList.add("active");    
    }
})

urlRequest("/top-headlines?country=us")

