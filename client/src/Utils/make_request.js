let makeRequest = async (uri, method="get", body = null) => {

    const options = {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "X-CSRFToken": parseCookie.csrftoken // protects againts CSRF Attacks
            },
            credentials: "include"
          }

    if (options == "post") {
        options.body = JSON.stringify(body);
    }

    const result = await fetch(uri, options);
    const jsonBody = await result.json();
    return jsonBody;
    
}
export default makeRequest;



