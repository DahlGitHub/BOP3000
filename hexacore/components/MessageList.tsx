import { getDatabase, ref, onValue} from "firebase/database";
import { Container } from '@nextui-org/react';

const database = getDatabase();


export default () =>{

    return(
        <Container className="
            h-72 
            border-solid 
            border-2
            border-black
        ">
             <p>hei</p>
        </Container>
       
    )
}