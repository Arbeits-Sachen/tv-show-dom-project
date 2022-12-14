/*DEFINED VALUES*/
let input = document.createElement("input");
let allEpisodes;
let total = 0;

let searchShow = document.createElement("select");
let placeholderShowOption = document.createElement("option");
let showOptionHeader = document.createElement("optgroup");

let dropdown = document.createElement("select");
let placeholderOption = document.createElement("option");

let header = document.createElement("header");
let searchedEpisodes = document.createElement("p");

let main = document.createElement("main");

let footer = document.createElement("footer");
let footerP = document.createElement("p");
let link = document.createElement("a");

let showListing = true;


const selectShow = getAllShows();



/*HEADER CONTENT*/
document.body.appendChild(header);

header.setAttribute("id", "header");


/*SEARCH SHOW*/
searchShow.setAttribute("id", "searchShow");
showOptionHeader.setAttribute("label", "Select Show")
placeholderShowOption.textContent = "Shows Listing";


searchShow.appendChild(showOptionHeader);
header.appendChild(searchShow);


/*CREATE INPUT*/
input.setAttribute("id", "input");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Search...");
input.setAttribute("onkeyup", "showHide()");

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
















createShowListing()


/*CREATE SHOWS DROPDOWN*/
selectShow.forEach(element =>
{
  let showOption = document.createElement("option");
  showOption.setAttribute("id", element.id);
  showOption.setAttribute("value", element.name)

  searchShow.appendChild(showOption);
  console.log(showOption)
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

  let extraDelete = document.getElementById("searchShow");
  
  if (extraDelete.length > 0)
  {
    extraDelete.remove(extraDelete.length - 1);
  }

  if(event.target.value == "Shows Listing")
  {
    createShowListing();
  }

  else if(event.target.value != "Shows Listing")
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
      /*CREATE EPISODES*/
      data.forEach(element =>
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

      document.body.appendChild(footer)
    });
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

    else if(h1.innerHTML == selected)
    {
      li[i].style.display = "";
      currentDisplay = 1;
    }

    else if(h1.innerHTML == selectedReorder)
    {
      li[i].style.display = "";
      currentDisplay = 1;
    }

    else
    {
      li[i].style.display = "none";
    }
  }

  if(event.target.value != "Shows Listing")
  {
    searchedEpisodes.textContent = "Displaying " + currentDisplay + "/" + total + ".";
  }
});




























/*HIDE/SHOW FUNCTION*/
function showHide()
{
  let currentDisplay = 0;
  let input = document.getElementById("input");
  let filter = input.value.toUpperCase();
  let ul = document.getElementById("root");
  let li = ul.getElementsByTagName("li");
  let dropdownOption = document.getElementById("dropdown");

  let selected = dropdownOption.options[dropdownOption.selectedIndex].text;

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
  
  if(selected == "Shows Listing")
  {
    searchedEpisodes.textContent = "Displaying " + currentDisplay + "/" + total + " episodes.";
    showListing = true;
  }

  else
  {
    searchedEpisodes.textContent = "found " + currentDisplay + " shows.";
    showListing = false;
  }
}














/*SORT OPTIONS*/
function sortList(select, startAt)
{
  let texts = [];

  for(let i = startAt; i < select.length; i++)
  {
      texts[i] =
      [
          select.options[i].text.toUpperCase(),
          select.options[i].text,
          select.options[i].value,
          select.options[i].id
      ].join('|');
  }

  texts.sort();

  texts.forEach(function(text, index)
  {
      let parts = text.split('|');

      select.options[startAt + index].text = parts[1];
      select.options[startAt + index].value = parts[2];
      select.options[startAt + index].id = parts[3];
  });
}

sortList(searchShow, 1);

















function createShowListing()
{
  selectShow.forEach(element =>
  {
    let root = document.getElementById("root");
    let li = document.createElement("li");
    let header = document.createElement("h1");
    let img = document.createElement("img");
    let p = document.createElement("p");

    li.setAttribute("id", "showL-li");
    header.setAttribute("id", "showL-h1");
    img.setAttribute("id", "showL-img");
    p.setAttribute("id", "showL-p");

    li.appendChild(header);
    li.appendChild(img);
    li.appendChild(p);
    root.appendChild(li);
    document.body.appendChild(root);
  
    

    let episodeOption = document.createElement("option");
    dropdown.appendChild(episodeOption);
    episodeOption.textContent = element.name;





  
    header.textContent = element.name;
  
    img.src = element.image.medium;
  
    p.innerHTML =
    "Rating: " + element.rating.average + "<br>" +
    "Genres: " + element.genres + "<br>" +
    "Status: " + element.status + "<br>" +
    "Runtime: " + element.runtime + "<br>" +
    element.summary;

    total++;
  
    searchedEpisodes.textContent = "found " + total + " shows.";
  });

  document.body.appendChild(footer)
}
