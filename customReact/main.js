customComp(reactElem,maincontainer)
    const element = document.createElement(reactElem.type)
    element.innerHTML = reactElem.children;
    for(prop in element.props){
        element.setAttribute(prop,reactElem.props[prop])
    }
    maincontainer.appendChild(element)
const maincontainer = document.querySelector("#root")

const reactElem =  {
    type :a,
    props :{
        href :"https:/google.com",
        target:"_blank"
    },
    children:"click me to visit google"

}
 customComp(reactElem,maincontainer)