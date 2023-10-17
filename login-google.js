
function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential)
    console.log(data)
  }

  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "577546200784-8tkurur58ei2pburqmum18np7s2o6f6c.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large", type: "standard", shape:"pill", text:"signin_with", size:"large", logo_alignment:"left"}
    );
    google.accounts.id.prompt();
  }