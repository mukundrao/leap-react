import { Link,NavLink } from "react-router"
export function NotFoundPage(props){
    return(
        <>
        <h1>Page Not Found</h1>
        <NavLink to={"/"}>Home</NavLink>
        </>
    )
        
    
}