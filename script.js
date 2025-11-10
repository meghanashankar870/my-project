async function getProfile() {
    // document.getElementById("username")=>gets the input box from the HTML page.
  const username = document.getElementById("username").value.trim();//.value()=>retrieves whatever the user typed.
  // //.trim()=>removes spaces from the start/end of the text.
  const profileDiv = document.getElementById("profile");

  profileDiv.innerHTML = ""; // clear old results

  if (!username) { //Checks if the input is empty
    profileDiv.innerHTML = "<p>Please enter a username.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (response.status === 404) {
      profileDiv.innerHTML = "<p>User not found 😢</p>";
      return;
    }

    profileDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="Profile Picture">
      <h2>${data.name || "No name available"}</h2>
      <p>${data.bio || "No bio available"}</p>
      <p>Followers: ${data.followers} | Following: ${data.following}</p>
      <p>Public Repos: ${data.public_repos}</p>
      <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
    `;
  } catch (error) {
    console.error("Error fetching profile:", error);
    profileDiv.innerHTML = "<p>Something went wrong. Try again later.</p>";
  }
}
