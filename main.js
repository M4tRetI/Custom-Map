var content, isContentLoaded = false;

loadJSON();     // Load json and initialize the map

var loadMarkers = setInterval(function(){ 
    if (isContentLoaded) 
    {
        initializeMap(); 
        initializeSpotList();
        clearInterval(loadMarkers);
    }
}, 5);

// Load JSON file with contents
function loadJSON()
{
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET','content.json', true);
    xhttp.send();

    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            content = JSON.parse(this.responseText);
            isContentLoaded = true;
        }
        else if (this.readyState == 4 && this.status != 200) 
            alert("Error "+this.status+"  -  Ricaricare la pagina e riprovare, se questo errore si dovesse ripetere più volte, prova la cache del browser");
    }
}

function initializeMap()
{
    var markerIcon = L.icon({
        iconUrl: 'marker.png',
        iconsize: [53, 120],
        iconAnchor: [16, 37]
    });
    
    for (let i=0; i<content.articles.length; i++) L.marker(content.articles[i][2], {icon: markerIcon, title: content.articles[i][0]}).addTo(map);
}

function previewTextGenerator(raw_text)
{
    var generated_text = "";

    for (let i=0; i<250; i++)
        generated_text += (raw_text[i] === "§") ? ("<br>") : (raw_text[i]);

    generated_text += "... ";

    return generated_text;
}

function initializeSpotList()
{
    var article, title, text, authors, more, n_articles = content.articles.length, spotList = document.getElementById("spotList");

    setTimeout(function(){document.getElementById("loading").style.display = "block";}, 200);
    setTimeout(function(){
        document.getElementById("spotList").style.display = "block";
        document.getElementById("loading").style.display = "none";
    }, 480);

    for (let i=0; i<n_articles; i++)
    {
        // Authors text assembly
        let authors__text = "<br>Componenti gruppo:<i>";
        for (let j=0; j<content.articles[i][3].length; j++) authors__text += " &nbsp;"+content.articles[i][3][j];
        authors__text += "</i>";

        // Article config
        article = document.createElement("article");
        article.className = "spotList__article";
        article.id = content.articles[i][0];
        article.addEventListener("click", function(event){

            let caller_id = event.path[1].id;

            if (caller_id == "" || caller_id == undefined) caller_id = event.path[2].id;
            else if (caller_id == "spotList") caller_id = event.path[0].id;

            viewDescription(caller_id);
        });

        // Title of article config
        title = document.createElement("h1");
        title.className = "spotList__title";
        title.innerHTML = content.articles[i][0];
        article.appendChild(title);

        // Text of article config
        text = document.createElement("p");
        text.className = "spotList__text";
        text.innerHTML = previewTextGenerator(content.articles[i][1]);
        article.appendChild(text);
        
        // Authors of article config
        authors = document.createElement("span");
        authors.className = "spotList__authors";
        authors.innerHTML = authors__text;
        article.appendChild(authors);

        // More button of article config
        /*
        more = document.createElement("a");
        more.href = "#";
        more.className = "spotList__more";
        more.innerHTML = "Leggi tutto &nbsp; >";
        more.addEventListener("click", function(event){
            viewDescription(event.path[1].id);
        });
        article.appendChild(more);*/
    
        spotList.appendChild(article);
    }
}

function backToSpotList()
{
    screenPortion();
    map.flyTo({lat: 43.7198588,lng: 10.3979164-(screen.width*65/100)/210000}, 16); // Percentuale spostamento diviso costante che ho trovato io
    document.getElementById("description").style.display = "none";
    setTimeout(function(){document.getElementById("loading").style.display = "block";}, 200);
    setTimeout(function(){
        document.getElementById("spotList").style.display = "block";
        document.getElementById("loading").style.display = "none";
    }, 600);
}

function screenPortion(status = false)
{
    if (status) // Apri
    {
        document.getElementById("description_container").style.width = "70%";
        document.getElementsByTagName("header")[0].style.width = "30%";
        document.getElementsByTagName("header")[0].style.zIndex = "4";
        document.getElementById("menuDescription").style.opacity = 1;
        document.getElementById("toggle_description").style.left = "calc(70% + 55px)";
        document.getElementById("description").style.opacity = 1;
    }/*
    else if (status == undefined)
    {
        document.getElementById("description_container").style.width = "0";
        document.getElementsByTagName("header")[0].style.width = "100%";
        document.getElementById("menuDescription").style.opacity = 0;
        document.getElementById("toggle_description").style.left = "55px";
    }*/
    else       // Chiudi
    {
        document.getElementById("description_container").style.width = "35%";
        document.getElementsByTagName("header")[0].style.width = "65%";
        document.getElementsByTagName("header")[0].style.zIndex = "9";
        document.getElementById("menuDescription").style.opacity = 0;
        document.getElementById("description").style.opacity = 0;
        document.getElementById("toggle_description").style.left = "calc(35% + 55px)";
    }
}

function loadDescription(index)
{
    var article_content = content.articles[index], article_description_content, new_text;

    // UI changes
    screenPortion(true);
    document.getElementById("description_container").scrollTo(0,0);
    document.getElementById("spotList").style.display = "none";
    setTimeout(function(){document.getElementById("loading").style.display = "block";}, 200);
    setTimeout(function(){
        document.getElementById("description").style.display = "block";
        document.getElementById("loading").style.display = "none";
    }, 900);

    // Content changes
    // Assembly description

    article_description_content = article_content[1].replace(/§/g, "<br>");

    new_text = article_description_content + `<br><br><br><br><br><br><font size="3rem">Coordinate luogo, <i><br>lat: ${article_content[2][0]}, <br>lng: ${article_content[2][1]}</i>` + "<br><br><b>Componenti gruppo:</b><i>";

    for (let i=0; i<article_content[3].length; i++)
        new_text += " &nbsp;"+article_content[3][i];

    new_text += "</i></font><br><br><br>"

    // Set section with generated text
    document.getElementById("description").getElementsByTagName("h1")[0].innerHTML = article_content[0];
    document.getElementById("description").getElementsByTagName("p")[0].innerHTML = new_text;
}

function viewDescription(article_id)
{
    var content_article_index = -1, articleCoords;

    for (let i=0; i<content.articles.length; i++)
        if (content.articles[i][0] == article_id) content_article_index = i;

    if (content_article_index > -1)
    {
        articleCoords = content.articles[content_article_index][2];

        toggleDescription(true);
        document.getElementById("description").style.display = "none";

        loadDescription(content_article_index);

        map.flyTo({lat: articleCoords[0],lng: articleCoords[1]-(screen.width*20/100)/105000},18);
    }

}

function showDescriptionOfMarker(ev)
{
    viewDescription(ev.originalEvent.target.title);
}



function showAuthor(event)
{
    document.getElementById("author").style.display = "block";
    console.log("Created by me");
    setTimeout(() => {document.getElementById("author").style.display = "none"}, 10000);
    event.preventDefault();
}

function toggleDescription(status)
{
    if (document.getElementById("description_container").offsetWidth == "0" || status)
    {
        document.getElementById("description_container").classList.remove("main_minimize");
        document.getElementById("toggle_description").classList.remove("toggle_description_minimize");
        document.getElementsByTagName("header")[0].classList.remove("header_minimize");
        document.getElementById("menuDescription").classList.remove("menuDescription_minimize");
        document.getElementById("description").style.opacity = 1;
        document.getElementById("spotList").style.opacity = 1;
    }
    else
    {
        document.getElementById("description_container").classList.add("main_minimize");
        document.getElementById("toggle_description").classList.add("toggle_description_minimize");
        document.getElementsByTagName("header")[0].classList.add("header_minimize");
        document.getElementById("menuDescription").classList.add("menuDescription_minimize");
        document.getElementById("description").style.opacity = 0;
        document.getElementById("spotList").style.opacity = 0;
    }    
}


function resetZoom(event)
{
    document.getElementById("description").style.zoom = 1;
        
    let all_articles = document.getElementsByClassName("spotList__article");

    for (let i=0; i<all_articles.length; i++) all_articles[i].style.zoom = 1;

    try
    {
        event.preventDefault();
    }catch(event){}
}

function deZoom(event)
{    
    let all_articles = document.getElementsByClassName("spotList__article"), old_zoom = parseFloat(document.getElementById("description").style.zoom);

    document.getElementById("description").style.zoom = old_zoom - 0.05;

    for (let i=0; i<all_articles.length; i++) all_articles[i].style.zoom = old_zoom - 0.05;
    
    try
    {
        event.preventDefault();
    }catch(event){}
}

function zoomIn(event)
{ 
    let all_articles = document.getElementsByClassName("spotList__article"), old_zoom = parseFloat(document.getElementById("description").style.zoom);

    document.getElementById("description").style.zoom = old_zoom + 0.05;

    for (let i=0; i<all_articles.length; i++) all_articles[i].style.zoom = old_zoom + 0.05;
    
    try
    {
        event.preventDefault();
    }catch(event){}
}

window.addEventListener("keydown", function(event){
    if (event.key == "-" && event.ctrlKey) deZoom(event);
    else if (event.key == "+" && event.ctrlKey) zoomIn(event);
    else if (event.key == " " && event.ctrlKey) resetZoom(event);
});

window.addEventListener("mousewheel",function(event){
    if (event.ctrlKey && event.deltaY < 0) zoomIn(event);
    else if (event.ctrlKey && event.deltaY > 0) deZoom(event);
});

/* SISTEMARE LO ZOOM | OK*/
/* SISTEMARE LA POSIZIONE ESATTA DEI MARKER | OK*/
/* METTERE POSSIBILIA' DI MINIMIZE E MAXIMIZE DESCRIPTION  | OK*/
/* SISTEMARLO PER MOBILE */
/* RENDERE ASPETTO PIU' DECENTE */