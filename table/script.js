const spinner=document.getElementById('spinner');
 const table=document.getElementById('data-table');
 const tableBody=document.getElementById('table-body');
 const pagination=document.getElementById('pagination');
 const prevBtn=document.getElementById('prev-btn');
 const nextBtn=document.getElementById('next-btn');
 const pageNumber=document.getElementById('page-number');
let data =[];
let sortedData=[];
let currentPage=1;
const rowsPerPage=10;
let sortDriection={};

//fetch data from API
async function fetchData(){
    spinner.style.display='flex';
  try{
    await new Promise(resolve=> setTimeout(resolve,1000)); 
const response=await fetch('https://randomuser.me/api/?results=50');
const json=await response.json();
data=json.results;
sortedData=[...data];
displayTable(data);
updataButtons();

  } catch(error){
    console.error('Error fetching data:',error);
  } finally{
    spinner.style.display='none';
    table.style.display='table';
    pagination.style.display='block'; 
  }
}


//display table data
function displayTable(dataToDisplay){
    tableBody.innerText='';
     const start=(currentPage -1) * rowsPerPage
     const end=start+rowsPerPage
     
     const paginatedItems=dataToDisplay.slice(start,end);


paginatedItems.forEach(user =>{
    const row=
        ` <tr>
                    <td data-lable="Name">${user.name.first} ${user.name.last}</td>
                    <td data-lable="Email">${user.email}</td>
                    <td data-lable="Username">${user.login.username}</td>
                    <td data-lable="Country">${user.location.country}</td>
            </tr>`;
            tableBody.insertAdjacentHTML('beforeend',row);
});
}

//sort table by column index
function sortTable(columnIndex){
    clearSortIcon();
    if (!sortDriection[columnIndex]){
        sortDriection[columnIndex]='asc';
    }
  sortedData=[...data].sort((a,b)=>{
    let valA,valB;
    switch(columnIndex){
        case 0:
            valA=`${a.name.first} ${a.name.last}`;
            valB=`${b.name.first} ${b.name.last}`;
            break
            case 1:
                valA=a.email;
                valB=b.email;
                 break
            case 2:
                valA=a.login.username;
                valB=b.login.username;
                 break
            case 3:
                valA=a.location.country;
                valB=b.location.country;
                
    }
    if (sortDriection[columnIndex]==='desc'){
        return valB.localecompare(valA);
    } else{
        return valA.localecompare(valB);
    }
      });
  sortDriection[columnIndex]=sortDriection[columnIndex]==='asc'?'dese':'asc';
updateSortIcon(columnIndex,sortDriection[columnIndex]);
  
  displayTable(sortedData);
    
}
//clear sort icon all column
function clearSortIcon(){
    for(i=0;i<4;i++){
        const icon=document.getElementById(`icon-${i}`);
        icon.className='fas fa-sort';
    }
}
//update the sort icon based
function updateSortIcon(columnIndex,direction){
    const icon=document.getElementById(`icon- ${columnIndex}`);
    icon.className=direction==='asc'? 'fas fa-sort-down':'fas fa-sort-up';
}

//previous
function prevPage(){
if (currentPage >1){
    currentPage--;
    displayTable(sortedData);
    updataButtons();
}
}

//next page
function nextPage(){
    if (currentPage * rowsPerPage < sortedData.length);
    currentPage++;
    displayTable(sortedData);
     updataButtons();
}

//Update button
function updataButtons(){
    pageNumber.innerText =currentPage;
    prevBtn.disabled=currentPage===1;
       nextBtn.disabled=currentPage*rowsPerPage>=sortedData.length;
}

//startup
fetchData();



























//dark mode functionality--------------------------------//
const themeToggle=document.getElementById('theme-toggle');
const body=document.body;
//check if dark mode is prefered or previously chosen
const isDarkMode=localStorage.getItem('dark-mode')==='true';
//set initial mode
if (isDarkMode){
    body.classList.add('dark-mode');
    themeToggle.innerText='Light Mode';
}
//togggle dark mode or update text
themeToggle.addEventListener('click',()=>{
      body.style.transition='background-color 0.3s,color 0.3s';
  if (body.classList.contains('dark-mode')){
    body.classList.remove('dark-mode');
    themeToggle.innertext='Dark Mode';
    localStorage.setItem('dark-mode','false');
  } else{
    body.classList.add('dark-mode');
    themeToggle.innertext='Light Mode';
    localStorage.setItem('dark-mode','true');
  }
});
