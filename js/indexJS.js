let apiKey = "7cbc7b4";

let input = document.querySelector("input");
let allMovies;
function getMovies(){
    let trimmedValue = input.value.trim();
    fetch(`http://www.omdbapi.com/?s=${trimmedValue}*&apikey=${apiKey}&`)
        .then( (res) => { return res.json()} )
        .then( (data) => {

            if(data.Search == undefined)
            {
                document.getElementById("error").style.display = "block";
                document.querySelector(".listOfFilms").style.display = "none"; 
            }

            else{
                allMovies = data.Search;
                displayTenMovies();
                document.getElementById("error").style.display = "none";
            }

        } )
        .catch( (error) => { document.getElementById("error").innerHTML = error } );

}
 


input.addEventListener("input", function() {
    
    if( input.value.length >= 3 )
        getMovies();
    else
        document.querySelector(".listOfFilms").style.display = "none"; 

    
});


function displayTenMovies(){


    let numOfDisplayedMovies = 10;

    if(allMovies.length < numOfDisplayedMovies)
        numOfDisplayedMovies = allMovies.length;

    document.querySelector(".listOfFilms").style.display = "block"; 
    let html = "";
    let x;
    for( let i=0; i<numOfDisplayedMovies; i++ ){
        x = allMovies[i].imdbID;
        html += `<li onclick=displayMovie("`+x+`") > ` + allMovies[i].Title + ` </li>`;
    }

    document.querySelector("#listItems").innerHTML = html;
}

let selctedMovie;
function displayMovie(id){
    input.value = "";
    document.querySelector(".listOfFilms").style.display = "none"; 

    fetch(`http://www.omdbapi.com/?i=${id}&apikey=${apiKey}&`)
    .then( (resp) => { return resp.json(); } )
    .then( (data) => {

        selctedMovie = data;
        console.log(selctedMovie);
        document.getElementById("moviePart").style.display = "block";   
        let html = `
            <h1>`+selctedMovie.Title+`</h1>
            <img src=`+selctedMovie.Poster+` alt="Poster" class="img-fluid" />  
            <p>All Acotrs: `+selctedMovie.Actors+` </p>
            <p>Genre: `+selctedMovie.Genre+` </p>
            <p>Plot: `+selctedMovie.Plot+` </p>
            <p>Released: `+selctedMovie.Released+` </p>


            <a class="btn btn-primary mb-2" href="https://www.imdb.com/title/${id}/" target="blank">Go to IMDB</a>
        `;

        document.getElementById("moviePart").innerHTML = html;
    } )
    .catch( (error) => { console.log(error); 
        document.getElementById("error").innerHTML = error
    } );

}