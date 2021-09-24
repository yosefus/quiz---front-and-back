
import { ImSun, ImStarFull } from "react-icons/im";
import { Page, Title } from '../../Theme/DarkLight'

function DarkLightMode(props) {
   function changeTheme() {
      props.theme === "light" ? props.setTheme("dark") : props.setTheme("light");
   }
   return (
      <Page>
         <div onClick={changeTheme}>
            <Title>
               {props.theme === "light" ? <ImSun /> : <ImStarFull />}
               click here
            </Title>

         </div>
      </Page>
   )
}

export default DarkLightMode
