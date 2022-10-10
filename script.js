/*DEFINED VALUES*/
let input = document.createElement("input");
const allEpisodes = getAllEpisodes();

let total = 0;

let dropdown = document.createElement("select");
let placeholderOption = document.createElement("option");

let header = document.createElement("div");
let searchedEpisodes = document.createElement("p");

let footer = document.createElement("footer");
let footerP = document.createElement("p");
let link = document.createElement("a");


/*HEADER CONTENT*/
document.body.appendChild(header);

header.setAttribute("id", "header");


/*CREATE INPUT*/
input.setAttribute("id", "input");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Show All");
input.setAttribute("onkeyup", "myFunction()");

header.appendChild(input);


/*CREATE DROPDOWN*/
dropdown.setAttribute("id", "dropdown");
dropdown.setAttribute("placeholder", "Search...");
placeholderOption.textContent = "Select...";

header.appendChild(dropdown);
dropdown.appendChild(placeholderOption);

/*DISPLAY SEARCHED RESULTS AMOUNT*/
searchedEpisodes.setAttribute("id", "searchedEpisodes");

header.appendChild(searchedEpisodes);

searchedEpisodes.textContent = "Displaying 73/73 episodes.";




/*CREATE EPISODES*/
allEpisodes.forEach(element =>
{
  let root = document.getElementById("root");
  let li = document.createElement("li");
  let header = document.createElement("h1");
  let img = document.createElement("img")
  let p = document.createElement("p");
  let episodeCode;

  let episodeDropdown = document.createElement("option");

  li.appendChild(header);
  li.appendChild(img);
  li.appendChild(p);
  root.appendChild(li);
  document.body.appendChild(root);
  dropdown.appendChild(episodeDropdown);

  
  element.season < 10 ? episodeCode = "S0" + element.season : episodeCode = "S" + element.season;
  element.number < 10 ? episodeCode += "E0" + element.number : episodeCode += "E" + element.number;

  header.textContent = element.name + " - " +  episodeCode;
  episodeDropdown.textContent = episodeCode + " - " + element.name;

  img.src = element.image.medium;

  p.textContent = element.summary;
  p.textContent = p.textContent.replace(/<p>|/g, "");
  p.textContent = p.textContent.split("</p>")[0];
  total++;
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
    if(event.target.value == "Select...")
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
  let currentDisplay = total;
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
      currentDisplay--;
    }
  }
  currentDisplay /= 2;
  
  searchedEpisodes.textContent = "Displaying " + currentDisplay + "/" + total + " episodes.";
}









/*CREATE FOOTER*/
link.setAttribute("href", "https://www.tvmaze.com/")

footer.appendChild(footerP);
footer.appendChild(link);
document.body.appendChild(footer)

footerP.textContent = "This data was originally from"
link.textContent = "TVMaze";






/*
//You can edit ALL of the code here
function setup() 
{
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) 
{
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
*/
