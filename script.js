/*DEFINED VALUES*/
let input = document.createElement("input");
let allEpisodes;
let total = 0;

let searchShow = document.createElement("select");
let placeholderShowOption = document.createElement("option");
let showOptionHeader = document.createElement("optgroup");

let dropdown = document.createElement("select");
let placeholderOption = document.createElement("option");

let header = document.createElement("div");
let searchedEpisodes = document.createElement("p");

let footer = document.createElement("footer");
let footerP = document.createElement("p");
let link = document.createElement("a");

const selectShow = getAllShows();





/*HEADER CONTENT*/
document.body.appendChild(header);

header.setAttribute("id", "header");


/*SEARCH SHOW*/
searchShow.setAttribute("id", "searchShow");
showOptionHeader.setAttribute("label", "Select Show")
placeholderShowOption.textContent = "Show Nothing";


searchShow.appendChild(showOptionHeader);
header.appendChild(searchShow);


/*CREATE INPUT*/
input.setAttribute("id", "input");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Search...");
input.setAttribute("onkeyup", "myFunction()");

header.appendChild(input);


/*CREATE DROPDOWN*/
dropdown.setAttribute("id", "dropdown");
placeholderOption.textContent = "Show All";

searchShow.appendChild(placeholderShowOption);
header.appendChild(dropdown);
dropdown.appendChild(placeholderOption);

/*DISPLAY SEARCHED RESULTS AMOUNT*/
searchedEpisodes.setAttribute("id", "searchedEpisodes");

header.appendChild(searchedEpisodes);



/*CREATE FOOTER*/
link.setAttribute("href", "https://www.tvmaze.com/")

footer.appendChild(footerP);
footer.appendChild(link);
document.body.appendChild(footer)

footerP.textContent = "This data was originally from";
link.textContent = "TVMaze";
















/*CREATE SHOWS DROPDOWN*/
selectShow.forEach(element =>
{
  let showOption = document.createElement("option");
  showOption.setAttribute("id", element.id);
  showOption.setAttribute("value", element.name)

  searchShow.appendChild(showOption);

  showOption.textContent = element.name;
});


/*SHOW DROPDOWN*/
document.getElementById("searchShow").addEventListener("change", (event) =>
{
  document.getElementById("root").innerHTML = "";
  document.getElementById("dropdown").innerHTML = "";

  placeholderShowOption = document.createElement("option");
  searchShow.appendChild(placeholderShowOption);
  placeholderOption.textContent = "Show All";
  dropdown.appendChild(placeholderOption);
  total = 0;
  
  let dropdownOption = document.getElementById("searchShow");
  let showId;

  if(event.target.value != "Show Nothing")
  {
    showId = dropdownOption[dropdownOption.selectedIndex].id;

    /*FETECHES DATA*/
    fetch("https://api.tvmaze.com/shows/" + showId + "/episodes")
    .then((response) =>
    {
      if (response.status >= 200 && response.status <= 299)
      {
          return response.json();
      }

      else
      {
          throw new Error(`Encountered something unexpected: ${response.status} ${response.statusText}`);
      }
    })

    .then((data) => 
    {
      allEpisodes = data;

      /*CREATE EPISODES*/
      allEpisodes.forEach(element =>
      {
        let root = document.getElementById("root");
        let li = document.createElement("li");
        let header = document.createElement("h1");
        let img = document.createElement("img")
        let p = document.createElement("p");
        let episodeCode;
      
        let episodeOption = document.createElement("option");
      
        li.appendChild(header);
        li.appendChild(img);
        li.appendChild(p);
        root.appendChild(li);
        document.body.appendChild(root);
        dropdown.appendChild(episodeOption);
      
        
        episodeCode = element.season < 10 ? "S0" + element.season : "S" + element.season;
        element.number < 10 ? episodeCode += "E0" + element.number : episodeCode += "E" + element.number;
      
        header.textContent = element.name + " - " +  episodeCode;
        episodeOption.textContent = episodeCode + " - " + element.name;
      
        img.src = element.image.medium;
      
        p.innerHTML = element.summary;
      
        total++;
      
        searchedEpisodes.textContent = "Displaying " + total + "/" + total + " episodes.";
      });

      /*CREATE FOOTER*/
      link.setAttribute("href", "https://www.tvmaze.com/")

      footer.appendChild(footerP);
      footer.appendChild(link);
      document.body.appendChild(footer)

      footerP.textContent = "This data was originally from";
      link.textContent = "TVMaze";
    });
  }

  else
  {
    searchedEpisodes.textContent = "Displaying " + 0 + "/" + 0 + " episodes.";
  }
});
















/*DROPDOWN*/
document.getElementById("dropdown").addEventListener("change", (event) =>
{
  let currentDisplay = total;
  let ul = document.getElementById("root");
  let li = ul.getElementsByTagName("li");

  let dropdownOption = document.getElementById("dropdown");
  let selected = dropdownOption.options[dropdownOption.selectedIndex].text;

  function split(str, i)
  {
    const result = [str.slice(0, i), str.slice(i)];
  
    return result;
  }

  const [selected1, second] = split(selected, 6);
  const [selected2, selected3] = split(second, 3);

  let selectedReorder = selected3 + selected2 + selected1;

  for (i = 0; i < li.length; i++)
  {
    p = li[i].getElementsByTagName("p")[0];
    h1 = li[i].getElementsByTagName("h1")[0];
    if(event.target.value == "Show All")
    {
      li[i].style.display = "";
      currentDisplay = total;
    }
    else if (h1.innerHTML == selectedReorder)
    {
      li[i].style.display = "";
      currentDisplay = 1;
    }
    else
    {
      li[i].style.display = "none";
    }
  }
  
  searchedEpisodes.textContent = "Displaying " + currentDisplay + "/" + total + " episodes.";
});


/*HIDE/SHOW FUNCTION*/
function myFunction()
{
  let currentDisplay = 0;
  let input = document.getElementById("input");
  let filter = input.value.toUpperCase();
  let ul = document.getElementById("root");
  let li = ul.getElementsByTagName("li");


  for (i = 0; i < li.length; i++)
  {
    p = li[i].getElementsByTagName("p")[0];
    h1 = li[i].getElementsByTagName("h1")[0];
    if (p.innerHTML.toUpperCase().indexOf(filter) > -1 || h1.innerHTML.toUpperCase().indexOf(filter) > -1)
    {
      li[i].style.display = "";
      currentDisplay++;
    }
    else
    {
      li[i].style.display = "none";
    }
  }
  
  searchedEpisodes.textContent = "Displaying " + currentDisplay + "/" + total + " episodes.";
}











/*SORT OPTIONS*/
function sortList()
{
  var cl = document.getElementById('searchShow');
  var clTexts = new Array();
 
  for(i = 1; i < cl.length; i++){
     clTexts[i-1] =
         cl.options[i].text.toUpperCase() + "," +
         cl.options[i].text + "," +
         cl.options[i].value + "," +
         cl.options[i].selected;
  }
 
  clTexts.sort();
 
  for(i = 1; i < cl.length; i++){
     var parts = clTexts[i-1].split(',');
 
     cl.options[i].text = parts[1];
     cl.options[i].value = parts[1];
     if(parts[2] == "true"){
         cl.options[i].selected = true;
     }else{
        cl.options[i].selected = false;
     }
  }
}

sortList();
