
var bookMark=document.getElementById('name');
var link=document.getElementById('url');
var btn=document.querySelector('button');
var btnVisit=document.getElementsByClassName('btn-visit');
var btnDelete=document.getElementsByClassName('btn-delete');
var btnUpdate=document.getElementsByClassName('btn-update');
var searchInput=document.getElementById('search');

var linkArray;

var updatedIndex = 0;
if(localStorage.getItem('Links')==null)
{
    linkArray=[];
}
else
{
    linkArray=JSON.parse(localStorage.getItem('Links'));
    dispalyLinks(linkArray);
}
function addLink()
{
    if(validateUrl(link.value)==true)
    {
        var links=
        {
            name:bookMark.value,
            url:link.value
        }
    }
    else 
    {
        document.getElementById('label-invlaid').innerHTML='Invalid URL'
    }
    
    ////////////////////////////////////////////

    if(btn.innerHTML=='Update')
    {
        //var index= document.getElementById('update-index').innerHTML;
        linkArray.splice(updatedIndex,1,links);
    }
    else
    {
        linkArray.push(links);
    }
    localStorage.setItem('Links',JSON.stringify(linkArray));
    dispalyLinks(linkArray);
    clear();
}
btn.addEventListener('click',function(){
    addLink();
})

function dispalyLinks(arrayDisplay)
{
    var demo=``;
    for(var i=0;i<arrayDisplay.length;i++)
    {
        demo+=
        `<tr class="d-flex align-items-center justify-content-around">
           <td class="fw-bold text-black td-size td-width">${arrayDisplay[i].name}</td>
           <td>
           <button class="btn btn-primary btn-visit" onclick="visitLink(${i})">Visit</button> 
           <button class="btn btn-danger btn-delete mx-3" onclick="deleteLink(${i})">Delete</button>
           <button class="btn btn-info btn-update mx-2" onclick="updateLink(${i})">Update</button>
           </td> 
           <td></td>
           
       </tr>`
    }
    document.getElementById('table-row').innerHTML=demo;
}

function deleteLink(index)
{
    linkArray.splice(index,1);
    localStorage.setItem('Links',JSON.stringify(linkArray));
    dispalyLinks(linkArray);
}

function visitLink(index)
{
    var visitedUrl=linkArray[index].url;
    window.open(visitedUrl , '_blank')
}
function validateUrl(testUrl)
{
    var regex=/^(http|https)/;
    return regex.test(testUrl);
}
function clear()
{
    bookMark.value="";
    link.value="";
    document.getElementById('label-invlaid').innerHTML="";
}
function search(term)
{
    var outputSearch=[];
    for(var i=0;i<linkArray.length;i++)
    {
        if(linkArray[i].name.includes(term)==true)
        {
            outputSearch.push(linkArray[i]);
        }
    }
    dispalyLinks(outputSearch);
}
searchInput.addEventListener('keyup',function(){
    search(this.value);
})

function updateLink(index_update)
{

    updatedIndex = index_update;
    bookMark.value=linkArray[index_update].name;
    link.value=linkArray[index_update].url;
    btn.innerHTML="Update";
   // document.getElementById('update-index').innerHTML=index_update;
}





