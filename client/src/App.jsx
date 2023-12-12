import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  let demoRoute = async (e) => {
    e.preventDefault();
    const parseCookie = cookie.parse(document.cookie);
    console.log(parseCookie);
  
    const result = await fetch('api', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-CSRFToken": parseCookie.csrftoken // protects againts CSRF Attacks
      },
      credentials: "include",
      body: JSON.stringify({
        title: title, // values that come from react and are in the input form when adding data
        content: content
      })
    });
  } 
  
  let demoGetAllData = async () => {
      const results = await fetch("route-to-get-all-data")
  }

  useEffect(() => {
      demoGetAllData();
  }, []);


  return (
    <>
      <form action={demoRoute}>
        <input type="text" value={title} />

      </form>

      <nav>
        <button onClick={saldkfj}></button>
      </nav>
    </>
  )
}

export default App;
