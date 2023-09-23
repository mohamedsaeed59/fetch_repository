let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function(){
    getRepos();
}

function getRepos(){
    if(theInput.value == ''){
        reposData.innerHTML = "Value cannot be empty";   
    }else{
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => response.json())
        .then((repos) => { 
            reposData.innerHTML = "";   
            repos.forEach(repo => {
                let mainDiv = document.createElement('div');
                let repoName = document.createTextNode(repo.name);
                mainDiv.appendChild(repoName);
                // add the link
                let theUrl = document.createElement('a');
                let TheUrlText = document.createTextNode('Visit');
                theUrl.appendChild(TheUrlText);
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
                theUrl.setAttribute('target', '_blank');
                mainDiv.append(theUrl);
                // star
                let starsSpan = document.createElement("span");
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
                starsSpan.appendChild(starsText);
                mainDiv.appendChild(starsSpan);
                mainDiv.className = 'repo-box';
                reposData.appendChild(mainDiv);
            });
        });
    }
}
     