// Components Imports 
import {Button} from "./components/button.tsx" ;


function App() {
  return(
    <div>
      <Button
        variant="secondary"
        size = "lg"
        text = "Submit"
        onclick={()=>{
          console.log("Hello world Button clicked")
        }}
      />
    </div>
  )
}

export default App
