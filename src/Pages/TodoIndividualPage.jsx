import { useLocation, useParams } from "react-router";
import TodoItem from "../Components/TodoItem";

export function TodoIndividualPage(props){
    const {id} = useParams();
    const location = useLocation();
    return(
    <>
    <TodoItem index={id}/>
    </>  
    )
}