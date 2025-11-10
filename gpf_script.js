async function getProfile() {
    // document.getElementById("username")=>gets the input box from the HTML page.
  const username = document.getElementById("username").value.trim();//.value()=>retrieves whatever the user typed.
  // //.trim()=>removes spaces from the start/end of the text.
  const profileDiv = document.getElementById("profile");
  const reposDiv = document.getElementById("repos");
  const loader = document.getElementById("loader");

  profileDiv.innerHTML = ""; // clear old results
  reposDiv.innerHTML = "";
  loader.classList.remove("hidden");

  if (!username) { //Checks if the input is empty
    loader.classList.add("hidden");
    profileDiv.innerHTML = "<p>Please enter a username.</p>";
    return;
  }

  try {
    // Fetch user profile
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    loader.classList.add("hidden");

    if (response.status === 404) {
      profileDiv.innerHTML = "<p>User not found 😢</p>";
      return;
    }

    profileDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="Profile Picture" style="width:100px; border-radius:50%; margin-bottom:10px;">
      <h2>${data.name || "No name available"}</h2>
      <p>${data.bio || "No bio available"}</p>
      <p>Followers: ${data.followers} | Following: ${data.following}</p>
      <p>Public Repos: ${data.public_repos}</p>
      <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
    `;

    // Fetch user's repositories
    const repoResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
    const repos = await repoResponse.json();

    if (repos.length > 0) {
      reposDiv.innerHTML = "<h3>Latest Repositories:</h3>";
      repos.forEach(repo => {
        reposDiv.innerHTML += `
          <div class="repo">
            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            <p>⭐ ${repo.stargazers_count} | ${repo.forks_count}</p>
          </div>
        `;
      });
    } else {
      reposDiv.innerHTML = "<p>No repositories found.</p>";
    }

  } catch (error) {
    console.error("Error fetching profile:", error);
    loader.classList.add("hidden");
    profileDiv.innerHTML = "<p>Something went wrong. Try again later.</p>";
  }
}