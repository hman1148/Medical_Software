// import { parseCookie } from "./parseCookie";

let makeRequest = async (uri, method="get", body = null) => {
  
  const getCsrfTokenFromCookie = () => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
            return value;
        }
    }
    return null;
};

const csrfToken = getCsrfTokenFromCookie();
    const options = {
            method: method,
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "X-CSRFToken": csrfToken // protects againts CSRF Attacks
            },
            credentials: "include"
          }

    if (method.toLowerCase() == "post") {
        options.body = JSON.stringify(body);
    }

    const result = await fetch(uri, options);
    const jsonBody = await result.json();
    return jsonBody;
}

export default makeRequest;



