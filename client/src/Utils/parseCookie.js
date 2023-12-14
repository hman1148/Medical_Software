let parseCookie = async () => {

    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
    return cookieValue || '';
}

export {parseCookie};