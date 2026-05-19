// Components Imports 
import {Button} from "./components/Button.tsx" ;
import {Card} from "./components/Card.tsx" ;


function App() {
  return(
    <>
      <div>
      <Button
        variant="primary"
        size = "lg"
        text = "Submit"
        onclick={()=>{
          console.log("Hello world Button clicked")
        }}
      />
      </div>
      <div>
        <Card
          title="Productivity Tip"
          text="The best way to learn is to build in public. Share your progress, get feedback, and help others along the way."
          date={new Date("2024-08-03")}
          tags={["productivity", "learning"]}
        />
      </div>
    </>
  )
}

export default App
