const searchForm = document.querySelector('form');
const search = document.querySelector('input');


searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(search !== null && search.value === '' || search.value === null) return alert('Please Enter A Location');
        localStorage.setItem('address', search.value);
        
        window.location.href=`/?address`;   
})